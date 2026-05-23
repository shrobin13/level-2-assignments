import { Pool } from "pg";
import properties from "../config/properties";

export const pool = new Pool({
  connectionString: properties.connectionString,
});

export const initDb = async () => {
  try {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY, 

            name VARCHAR(100),
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(256) NOT NULL,  

            role VARCHAR(100) DEFAULT 'CONTRIBUTOR',

            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS issues(
            id SERIAL PRIMARY KEY,

            title VARCHAR(150) NOT NULL,
            description TEXT NOT NULL,

            type VARCHAR(50) NOT NULL,
            status VARCHAR(100) DEFAULT 'open',

            reporter_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
    `);

    console.log("DB is connected");
  } catch (error: any) {
    console.log(`Error occured: ${error?.message}`);
  }
};
