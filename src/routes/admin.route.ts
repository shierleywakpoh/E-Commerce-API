import express from "express";
import { AdminController } from "../controllers/admin.controller";

const Arouter = express.Router();
const adminController = new AdminController();

//Arouter.post("/", adminController.insertAdmin.bind(adminController));
Arouter.post("/Login", adminController.loginAdmin.bind(adminController));

export default Arouter;
