import { pool } from "../config/db";
import { Errorr } from "../utils/error.util";
import { carts } from "../models/cart.models";

export class CartRepository {
  error: Errorr;

  constructor() {
    this.error = new Errorr();
  }

  async findEmail(id: string): Promise<number> {
    try {
      const sql = "SELECT * FROM carts WHERE user_id = $1";
      const email = await pool.query(sql, [id]);

      if (email == null) {
        throw new Error("something error");
      }

      if (email.rowCount == 0) {
        const sql = "INSERT INTO carts(user_id) VALUES ($1) RETURNING id";
        const idCart = await pool.query(sql, [id]);

        return idCart.rows[0].id;
      }
      return email.rows[0].id;
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }

  async createCartItems(
    CartId: number,
    productId: number,
    quantity: number
  ): Promise<void> {
    console.log("abc");
    const sql = ` INSERT INTO cartItems (cart_id, product_id, quantity)
    VALUES ($1, $2, $3)
    ON CONFLICT (cart_id, product_id) 
    DO UPDATE SET 
      quantity = cartItems.quantity + EXCLUDED.quantity
    RETURNING *
    `;
    try {
      await pool.query(sql, [CartId, productId, quantity]);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }

  async getCart(id: string): Promise<carts[]> {
    const sql =
      "SELECT carts.user_id, cartItems.id,products.name,products.price,products.imageurl,products.id As product_id,products.stock,cartItems.quantity FROM cartItems JOIN carts ON cartItems.cart_id = carts.id JOIN products ON cartItems.product_id = products.id WHERE carts.user_id =$1";
    try {
      const result = await pool.query(sql, [id]);
      
      if (result.rowCount == 0) {
        throw new Error("User does not have cart");
      }

      return result.rows;
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async updateCart(id: number, quantity: number): Promise<void> {
    const sql = "UPDATE cartItems SET  quantity = $1 WHERE id = $2";
    try {
      const result = await pool.query(sql, [quantity, id]);
      if (result.rowCount === 0) {
        throw new Error("something error");
      }
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async deleteCart(id: number): Promise<void> {
    const sql = "DELETE FROM cartItems WHERE id =$1";
    try {
      const result = await pool.query(sql, [id]);
      if (result.rowCount === 0) {
        throw new Error("something error");
      }
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
}
