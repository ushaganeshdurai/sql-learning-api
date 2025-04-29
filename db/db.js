import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
  try {
    console.log("🔗 Connecting to the database...");

    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER ,
      password: process.env.DB_PASSWORD,
    });

    await db.execute(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'sql_learning_db'}`);
    
    console.log('💾 Database created or already exists.');

    await db.changeUser({ database: process.env.DB_NAME || 'sql_learning_db' });

    console.log('🚀 Connected to the database!');
    return db;

  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
    process.exit(1); 
  }
}
