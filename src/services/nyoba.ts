import { pool } from "../config/db";
import { CartRepository } from "../repositories/cart.repository";
import { Errorr } from "../utils/error.util";

export class Nyoba {
  cartRepository: CartRepository;
  error: Errorr;
  constructor() {
    this.cartRepository = new CartRepository();
    this.error = new Errorr();
  }
  async getById(id: string) {
    try {
      const result = await this.cartRepository.findCart(id);
      if (result.rowCount == 0) {
        console.log("abc");
        throw new Error("User does not have cart");
      }

      return result;
    } catch (error: any) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Something error");
    }
  }
}
