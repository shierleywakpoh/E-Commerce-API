import express from "express";
import { CartController } from "../controllers/cart.controller";
import { Middlewares } from "../middlewares/auth.middleware";

const router = express.Router();
const cartController = new CartController();
const auth = new Middlewares();

router.post(
  "/",
  auth.authCustomer.bind(auth),
  auth.roleCustomer.bind(auth),
  cartController.create.bind(cartController)
);
router.get(
  "/",
  auth.authCustomer.bind(auth),
  auth.roleCustomer.bind(auth),
  cartController.getByID.bind(cartController)
);
router.put(
  "/:id",
  auth.authCustomer.bind(auth),
  auth.roleCustomer.bind(auth),
  cartController.update.bind(cartController)
);
router.delete(
  "/:id",
  auth.authCustomer.bind(auth),
  auth.roleCustomer.bind(auth),
  cartController.delete.bind(cartController)
);

export default router;
