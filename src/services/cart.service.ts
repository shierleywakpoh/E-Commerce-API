import { pool } from "../config/db";
import { CartRepository } from "../repositories/cart.repository";
import { Errorr } from "../utils/error.util";
import { carts } from "../models/cart.models";
import { ProductRepository } from "../repositories/product.repository";

export class CartService {
  cartRepository: CartRepository;
  error: Errorr;
  productRepository: ProductRepository;
  constructor() {
    this.cartRepository = new CartRepository();
    this.error = new Errorr();
    this.productRepository = new ProductRepository();
  }
  async create(id: string, productId: number, quantity: number): Promise<void> {
    try {
      const findId = await this.cartRepository.findEmail(id);
      const product = await this.productRepository.getById(productId);
      const decStock = product.stock - quantity;
      if (decStock < -1) {
        throw new Error("Out of stock");
      }
      await this.cartRepository.createCartItems(findId, productId, quantity);

      await this.productRepository.updateStock(decStock, productId);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async getById(id: string): Promise<carts[]> {
    try {
      const resultGet = await this.cartRepository.getCart(id);

      /**
       * 
      const totalPrice = resultGet.rows.reduce((total, index) => {
        return total + index.price * index.quantity;
      }, 0);
      resultGet.rows.push(totalPrice);
       */

      return resultGet;
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async update(
    id: number,
    quantity: number,
    productId: number,
    quantityId: number,
    stock: number
  ): Promise<void> {
    try {
      const dquantity = quantity - quantityId;
     
      if (dquantity >= 0) {
        stock = stock - dquantity;
        if (stock < 0) {
          throw new Error("Out of stock");
        }
        await this.productRepository.updateStock(stock, productId);
        await this.cartRepository.updateCart(id, quantity);
      } else if (dquantity < 0) {
        const stock1 = stock - dquantity;
        const finalProduct = quantityId + dquantity;
        if (finalProduct == 0) {
          const totalStock = stock + quantityId;
          await this.productRepository.updateStock(totalStock, productId);
          await this.cartRepository.deleteCart(id);
        } else {
          await this.cartRepository.updateCart(id, finalProduct);
          await this.productRepository.updateStock(stock1, productId);
        }
      }
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async delete(
    id: number,
    quantity: number,
    stock: number,
    productId: number
  ): Promise<void> {
    try {
      const totalStock = quantity + stock;
      await this.productRepository.updateStock(totalStock, productId);
      await this.cartRepository.deleteCart(id);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
}
