import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { waitForDB, initDB } from "./db.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}));

app.use(express.json());

async function startServer() {
    try {
        await waitForDB();
        initDB();

        app.get("/", (req, res) => {
            res.send("Server is running and DB is connected!");
        });

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () =>
            console.log(`Server running on port ${PORT}`)
        );

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

startServer();
