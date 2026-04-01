import express from "express";
import { Middlewares } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/upload.middlewares";
import { Product } from "../controllers/product.controller";

const router = express.Router();
const auth = new Middlewares();
const product = new Product();

router.post(
  "/",
  auth.authAdmin.bind(auth),
  auth.roleAdmin.bind(auth),
  upload.single("image"),
  product.create.bind(product)
);
router.get("/", product.getAll.bind(product));
router.get("/search/:search", product.search.bind(product));
router.get(
  "/:id",

  product.getById.bind(product)
);
router.put(
  "/:id",
  auth.authAdmin.bind(auth),
  auth.roleAdmin.bind(auth),

  product.updateById.bind(product)
);
router.delete(
  "/:id",
  auth.authAdmin.bind(auth),
  auth.roleAdmin.bind(auth),
  product.deleteById.bind(product)
);

export default router;
