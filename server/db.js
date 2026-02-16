import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs/promises";
import bcrypt from "bcrypt";

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

export async function initDB() {
    pool = mysql.createPool({
        ...dbConfig,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        multipleStatements: true,
    });

    console.log("MySQL pool created");

    try {
        const [tables] = await pool.query(
            "SELECT COUNT(*) as cnt FROM information_schema.tables WHERE table_schema = ? AND table_name = 'users'",
            [dbConfig.database]
        );

        if (tables[0].cnt === 0) {
            const schemaPath = new URL('./db/schema.sql', import.meta.url);
            const schemaSql = await fs.readFile(schemaPath, 'utf8');
            await pool.query(schemaSql);
            console.log('Database schema imported');
        }

        const [usersCount] = await pool.query('SELECT COUNT(*) as cnt FROM users');
        if (usersCount[0].cnt === 0) {
            const adminHash = await bcrypt.hash('password', 10);
            const userHash = await bcrypt.hash('password', 10);

            await pool.query(
                'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
                ['Admin', 'admin@example.com', adminHash, 'admin']
            );

            await pool.query(
                'INSERT INTO users (name, email, password_hash, role) VALUES ? ',
                [[
                    ['User One', 'user1@example.com', userHash, 'user'],
                    ['User Two', 'user2@example.com', userHash, 'user']
                ]]
            );

            console.log('Seeded default users: admin and sample users');
        }
    } catch (err) {
        console.error('Error during DB initialization/seed:', err);
    }
}

export function getDB() {
    if (!pool) {
        throw new Error("DB not initialized. Call initDB() first.");
    }
    return pool;
}
