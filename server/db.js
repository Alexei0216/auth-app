import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
};

let pool;

export async function waitForDB(retries = 10, delay = 3000) {
    for (let i = 0; i < retries; i++) {
        try {
            const conn = await mysql.createConnection(dbConfig);
            await conn.end();
            console.log("MySQL is ready!");
            return;
        } catch (err) {
            console.log(`DB not ready, retrying in ${delay / 1000}s...`);
            await new Promise(res => setTimeout(res, delay));
        }
    }
    throw new Error("MySQL not available");
}

export function initDB() {
    pool = mysql.createPool({
        ...dbConfig,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });

    console.log("MySQL pool created");
}

export function getDB() {
    if (!pool) {
        throw new Error("DB not initialized. Call initDB() first.");
    }
    return pool;
}
