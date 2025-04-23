import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "root",
	password: process.env.DB_PASSWORD || "",
	database: process.env.DB_NAME || "school-management",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

async function initializeDatabase(): Promise<void> {
	try {
		const connection = await pool.getConnection();

		console.log("Database initialized successfully");
		connection.release();
	} catch (error) {
		console.error("Error initializing database:", error);
		throw error;
	}
}

initializeDatabase();

export default pool;
