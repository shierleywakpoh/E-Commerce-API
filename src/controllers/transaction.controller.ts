import { Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const key = process.env.STRIPE_SECRET_KEY || "";
const stripe = new Stripe(key);

export interface AuthRequest extends Request {
  user?: any;
}

export class TransactionController {
  transactionService: TransactionService;

  constructor() {
    this.transactionService = new TransactionService();
  }

  async create(req: AuthRequest, res: Response) {
    const { cartItems, cusname, cuscontact, cusaddress, price } = req.body;
    if (!cartItems || !cusname || !cuscontact || !cusaddress || !price) {
      return res.status(400).json({
        message:
          "CartItems, cusname, cuscontact, cusaddress, and price are required",
      });
    }
    if (cusname.trim().length === 0) {
      return res.status(400).json({ message: "Cusname is required" });
    } else if (cuscontact.trim().length === 0) {
      return res.status(400).json({ message: "Cuscontact is required" });
    } else if (cusaddress.trim().length === 0) {
      return res.status(400).json({ message: "Cusaddress is required" });
    }
    const id = req.user.id;

    try {
      const transactions = await this.transactionService.create(
        cartItems,
        price,
        cusname,
        cuscontact,
        cusaddress,
        id
      );
      return res.status(201).json({
        url: transactions,
        message: "sucessfully",
      });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  async getDataById(req: AuthRequest, res: Response) {
    const id = req.user.id;

    try {
      const result = await this.transactionService.getDataById(id);
      res.status(201).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  async verify(req: AuthRequest, res: Response) {
    const { session_id } = req.query;
    try {
      const session = await stripe.checkout.sessions.retrieve(
        session_id as string
      );

      if (session.payment_status === "paid") {
        const userId = req.user.id;
        await this.transactionService.deleteCart(userId);
        return res.status(200).json({
          message: "Payment verified and cart cleared!",
          orderId: session.metadata?.order_id, // Jika kamu simpan metadata
        });
      } else {
        return res.status(400).json({ message: "Payment not completed yet." });
      }
    } catch (error: any) {
      return res.status(500).json({ message: "Verification failed", error });
    }
  }
}
