import express from "express";
import { getDB } from "../db.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            const db = getDB();

            const [rows] = await db.query(
                "SELECT id, name, email, role, created_at FROM users"
            );

            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }
);

export default router;
