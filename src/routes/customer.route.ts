import express from "express";
import { CustomerController } from "../controllers/customer.controller";

const router = express.Router();
const customerController = new CustomerController();

router.post("/", customerController.insertCustomer.bind(customerController));
router.post(
  "/Login",
  customerController.loginCustomer.bind(customerController)
);

export default router;
