import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const key =
  process.env.STRIPE_SECRET_KEY ||
  "sk_test_51T8F8wC72tumuLPGYsA94dsyAB8Ul6dlxe7ne81LlMUDv7sW2ase27G3YQuCSdKHIbmct69eCt4zldL1zmnuUzbj009rpbP8Hm";

const stripe = new Stripe(key);

export const abc = async (req: Request, res: Response) => {
  const { amount } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "idr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.json({
    clientSecret: paymentIntent.client_secret,
  });
};
