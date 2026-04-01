import { pool } from "../config/db";
import { Errorr } from "../utils/error.util";
import { products } from "../models/product.models";

export class ProductRepository {
  error: Errorr;

  constructor() {
    this.error = new Errorr();
  }
  async create(
    name: string,
    description: string,
    stock: number,
    price: number,
    imageUrl: string
  ): Promise<void> {
    try {
      const sql =
        "INSERT INTO products(name, description, stock,price,imageUrl) VALUES($1,$2,$3,$4,$5)";
      await pool.query(sql, [name, description, stock, price, imageUrl]);
    } catch (error: any) {
      throw new Error("Something error");
    }
  }
  async getAll(): Promise<products[]> {
    try {
      const sql = "SELECT * FROM products";
      //console.log("products", (await pool.query(sql)).rowCount);
      //console.log("products", (await pool.query(sql)).rows);
      if ((await pool.query(sql)).rowCount == 0) {
        throw new Error("Product not available");
      }

      return (await pool.query(sql)).rows;
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async getById(id: number): Promise<products> {
    try {
      const sql = "SELECT * FROM products WHERE id = $1";

      return (await pool.query(sql, [id])).rows[0];
    } catch (error: any) {
      throw new Error("Something error");
    }
  }
  async updateById(
    id: string,

    stock: number,
    price: number
  ): Promise<void> {
    try {
      console.log("repo", id, stock, price);
      const sql =
        "UPDATE products SET stock = $2, price = $3, updateAt = CURRENT_TIMESTAMP WHERE id = $1";
      await pool.query(sql, [id, stock, price]);
    } catch (error: any) {
      throw new Error("Something error");
    }
  }
  async deleteById(id: string): Promise<void> {
    try {
      console.log("id2", id);
      const sql = "DELETE FROM products WHERE id = $1";
      const result = await pool.query(sql, [id]);
      console.log("result", result);
      if (result.rowCount === 0) {
        throw new Error("something error");
      }
      //return (await pool.query(sql, [id])).rowCount;
    } catch (error: any) {
      throw new Error("Something error");
    }
  }
  async updateStock(stock: number, id: number): Promise<void> {
    console.log("totalStock1", stock);
    console.log("iddd", id);
    try {
      const sql =
        "UPDATE products SET stock = $2, updateAt = CURRENT_TIMESTAMP WHERE id = $1";
      await pool.query(sql, [id, stock]);
    } catch (error: any) {
      throw new Error("Something error");
    }
  }
  async search(search: string): Promise<products[]> {
    const sql =
      "SELECT * FROM products WHERE name ILIKE $1 OR description ILIKE $2";
    try {
      const result = await pool.query(sql, [`%${search}%`, `%${search}%`]);
      if (result.rowCount == 0) {
        throw new Error("Product not found");
      }
      return result.rows;
    } catch (error: any) {
      return this.error.GenerateError(error);
    }

    //console.log("result", result);
  }
}
