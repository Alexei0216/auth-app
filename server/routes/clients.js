import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
    res.json([
        { id: 1, name: "John", email: "john@mail.com", role: "user" }
    ]);
});

export default router;
