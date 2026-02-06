import express from "express";

const router = express.Router();

router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "Email and password are required" });
    }

    return res.status(200).json({
        user: {
            id: 1,
            email,
            role: "user",
        },
    });
});

export default router;
