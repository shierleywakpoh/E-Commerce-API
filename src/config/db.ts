import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

/**
 * 
export async function verifyConnection(): Promise<void> {
  try {
    const client = await pool.connect();
    console.log("connected to postgreesql database");
    client.release();
  } catch (error) {
    console.error("error connecting to the datase ", error);
  }
}
 */
