import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDB } from "../db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/tokens.js";

const router = express.Router();

const cookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
};

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const db = getDB();

        const [existing] = await db.query(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            return res.status(409).json({ message: "Email already exists" });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const [result] = await db.query(
            "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
            [name, email, passwordHash, "user"]
        );

        const user = {
            id: result.insertId,
            name,
            email,
            role: "user",
        };

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        await db.query(
            `INSERT INTO refresh_tokens (user_id, token, expires_at)
       VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
            [user.id, refreshToken]
        );

        res.cookie("accessToken", accessToken, cookieOptions);
        res.cookie("refreshToken", refreshToken, cookieOptions);

        return res.status(201).json({ user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    try {
        const db = getDB();

        const [rows] = await db.query(
            "SELECT id, name, email, password_hash, role FROM users WHERE email = ?",
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const accessToken = generateAccessToken(safeUser);
        const refreshToken = generateRefreshToken(safeUser);

        await db.query(
            `INSERT INTO refresh_tokens (user_id, token, expires_at)
       VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 7 DAY))`,
            [safeUser.id, refreshToken]
        );

        res.cookie("accessToken", accessToken, cookieOptions);
        res.cookie("refreshToken", refreshToken, cookieOptions);

        return res.json({ user: safeUser });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.post("/refresh", async (req, res) => {
    const token = req.cookies?.refreshToken;

    if (!token) {
        return res.status(401).json({ message: "No refresh token" });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_REFRESH_SECRET
        );

        const db = getDB();

        const [rows] = await db.query(
            "SELECT * FROM refresh_tokens WHERE token = ?",
            [token]
        );

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const [users] = await db.query(
            "SELECT id, role FROM users WHERE id = ?",
            [decoded.id]
        );

        const user = users[0];

        const newAccessToken = generateAccessToken(user);

        res.cookie("accessToken", newAccessToken, cookieOptions);

        res.json({ ok: true });

    } catch (err) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }
});

router.get("/me", authMiddleware, async (req, res) => {
    const db = getDB();

    const [rows] = await db.query(
        "SELECT id, name, email, role FROM users WHERE id = ?",
        [req.user.id]
    );

    if (rows.length === 0) {
        return res.status(401).json({ message: "User not found" });
    }

    res.json({ user: rows[0] });
});

router.post("/logout", async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    if (refreshToken) {
        const db = getDB();
        await db.query(
            "DELETE FROM refresh_tokens WHERE token = ?",
            [refreshToken]
        );
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ message: "Logged out" });
});

export default router;
