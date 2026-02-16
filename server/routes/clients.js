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

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            const db = getDB();
            const { id } = req.params;
            const { name, email, role } = req.body;

            const [result] = await db.query(
                "UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?",
                [name, email, role, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Client not found" });
            }

            const [rows] = await db.query(
                "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
                [id]
            );

            res.json(rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {
            const db = getDB();
            const { id } = req.params;

            const [result] = await db.query(
                "DELETE FROM users WHERE id = ?",
                [id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Client not found" });
            }

            res.json({ success: true });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error" });
        }
    }
);

export default router;
