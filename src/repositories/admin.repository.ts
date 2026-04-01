import { pool } from "../config/db";
import { Errorr } from "../utils/error.util";
import { adminLogin } from "../models/admin.models";

export class AdminRepository {
  error: Errorr;
  constructor() {
    this.error = new Errorr();
  }
  async selectLogin(email: string): Promise<adminLogin> {
    try {
      const admin = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      if (admin.rowCount == 0 || admin.rows[0].role == "customer") {
        throw new Error("Email doesn't exist");
      }
      if (admin === null) {
        throw new Error("Something Error");
      }
      const result = {
        password: admin.rows[0].password,
        role: admin.rows[0].role,
        id: admin.rows[0].id,
      };
      return result;
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
}
