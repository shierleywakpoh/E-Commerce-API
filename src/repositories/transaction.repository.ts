import { pool } from "../config/db";
import { Errorr } from "../utils/error.util";
import { cartItems, transaction } from "../models/transaction.models";

export class TransactionRepository {
  error: Errorr;
  constructor() {
    this.error = new Errorr();
  }
  async create(
    cartItems: cartItems[],
    price: number,
    cusname: string,
    cuscontact: number,
    cusaddress: string,
    id: string
  ): Promise<void> {
    try {
      const sql =
        "INSERT INTO transactions(cartItems,price,cusname,cuscontact,cusaddress,user_id) VALUES ($1,$2,$3,$4,$5,$6)";

      await pool.query(sql, [
        cartItems,
        price,
        cusname,
        cuscontact,
        cusaddress,
        id,
      ]);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async getDataById(id: string): Promise<transaction[]> {
    const sql =
      "SELECT status,cartitems,price FROM transactions WHERE user_id = $1";
    try {
      const result = await pool.query(sql, [id]);
      if (result.rowCount == 0) {
        throw new Error("Order not found");
      }
      return result.rows;
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async deleteCart(id: string): Promise<void> {
    const sql = "DELETE FROM carts WHERE user_id = $1";
    try {
      await pool.query(sql, [id]);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
}
