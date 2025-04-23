import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'school-management',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Initialize database and create tables if they don't exist
async function initializeDatabase(): Promise<void> {
    try {
        const connection = await pool.getConnection();

    //     // Create the schools table if it doesn't exist
    //     await connection.query(`
    //   CREATE TABLE IF NOT EXISTS schools (
    //     id INT AUTO_INCREMENT PRIMARY KEY,
    //     name VARCHAR(255) NOT NULL,
    //     address VARCHAR(255) NOT NULL,
    //     latitude FLOAT NOT NULL,
    //     longitude FLOAT NOT NULL,
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    //     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    //   )
    // `);

        console.log("Database initialized successfully");
        connection.release();
    } catch (error) {
        console.error("Error initializing database:", error);
        throw error;
    }
}

// Call the initialization function
initializeDatabase();

export default pool;