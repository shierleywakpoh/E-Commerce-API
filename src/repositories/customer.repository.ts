import { pool } from "../config/db";
import { customerLogin, customerRegister } from "../models/customer.models";
import { Errorr } from "../utils/error.util";

export class CustomerRepository {
  error: Errorr;
  constructor() {
    this.error = new Errorr();
  }

  async findByEmail(email: string): Promise<void> {
    try {
      const result = await pool.query(
        "SELECT email FROM users WHERE email = $1",
        [email]
      );

      if (result.rowCount === null) {
        throw new Error("Something error");
      }

      if (result.rowCount > 0) {
        throw new Error("Email exist");
      }
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async insertCustomer(
    email: string,
    password: string,
    name: string,
    role: string
  ): Promise<void> {
    try {
      const sql =
        "INSERT INTO users (name,password,email,role) VALUES ($1,$2,$3,$4)";

      const result = await pool.query(sql, [name, password, email, role]);
      if (result.rowCount == 0) {
        throw new Error("customer can't add to database");
      }
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async selectLogin(email: string): Promise<customerLogin> {
    try {
      const user = await pool.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);

      if (user.rowCount == 0 || user.rows[0].role == "admin") {
        throw new Error("Email doesn't exist");
      }
      if (user === null) {
        throw new Error("Something Error");
      }
      const result = {
        password: user.rows[0].password,
        role: user.rows[0].role,
        id: user.rows[0].id,
      };

      return result;
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
}
