import { TransactionRepository } from "../repositories/transaction.repository";
import { Errorr } from "../utils/error.util";
import { cartItems, transaction } from "../models/transaction.models";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const key = process.env.STRIPE_SECRET_KEY || "";

const stripe = new Stripe(key);

export class TransactionService {
  transactionRepository: TransactionRepository;
  error: Errorr;
  constructor() {
    this.transactionRepository = new TransactionRepository();
    this.error = new Errorr();
  }
  async create(
    cartItems: cartItems[],
    price: number,
    cusname: string,
    cuscontact: number,
    cusaddress: string,
    id: string
  ): Promise<string | null> {
    try {
      await this.transactionRepository.create(
        cartItems,
        price,
        cusname,
        cuscontact,
        cusaddress,
        id
      );

      const carts = cartItems.map((value: any) => {
        return {
          price_data: {
            currency: "idr",
            product_data: {
              name: value.name,
            },
            unit_amount: value.price * 100,
          },
          quantity: value.quantity,
        };
      });

      const session = await stripe.checkout.sessions.create({
        line_items: carts,
        mode: "payment",
        success_url: `http://localhost:4000/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: "http://localhost:4000/cancel",
      });

      return session.url;
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async getDataById(id: string): Promise<transaction[]> {
    try {
      return await this.transactionRepository.getDataById(id);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async deleteCart(id: string) :Promise<void>{
    try {
      
      await this.transactionRepository.deleteCart(id);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
}
