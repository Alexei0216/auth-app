import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { waitForDB, initDB } from "./db.js";
import authRoutes from "./routes/auth.js";
import clientsRoutes from "./routes/clients.js";

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5174",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientsRoutes);

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
