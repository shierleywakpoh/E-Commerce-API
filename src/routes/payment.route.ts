import { abc } from "../controllers/payment.controller";
import express from "express";

const router = express.Router()
router.post("/",abc)
export default router