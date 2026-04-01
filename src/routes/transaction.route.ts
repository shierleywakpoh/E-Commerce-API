import express from "express";
import { TransactionController } from "../controllers/transaction.controller";
import { Middlewares } from "../middlewares/auth.middleware";

const router = express.Router();
const transaction = new TransactionController();
const auth = new Middlewares();

router.post(
  "/",
  auth.authCustomer.bind(auth),
  auth.roleCustomer.bind(auth),
  transaction.create.bind(transaction)
);
router.get(
  "/",
  auth.authCustomer.bind(auth),
  auth.roleCustomer.bind(auth),
  transaction.getDataById.bind(transaction)
);
router.get(
  "/verify-payment",
  auth.authCustomer.bind(auth),
  auth.roleCustomer.bind(auth),
  transaction.verify.bind(transaction)
);

export default router;
