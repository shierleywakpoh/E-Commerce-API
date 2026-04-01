import { Request, Response } from "express";
import { CustomerService } from "../services/customer.service";

export class CustomerController {
  customerService: CustomerService;
  constructor() {
    //this.insertCustomer = this.insertCustomer.bind(this);
    this.customerService = new CustomerService();
  }

  async insertCustomer(req: Request, res: Response) {
    const { email, password, name } = req.body;
    const role = "customer";
    const key = process.env.JWT_SECRET || "tokenEcommerce";

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Email, name, and password are required" });
    }
    if (email.trim().length === 0) {
      return res.status(400).json({ message: "Email is required" });
    } else if (password.trim().length === 0) {
      return res.status(400).json({ message: "Password is required" });
    } else if (name.trim().length === 0) {
      return res.status(400).json({ message: "name is required" });
    }
    try {
      const result = await this.customerService.customerRegister(
        email as string,
        password as string,
        name as string,
        role,
        key
      );
      return res
        .status(201)
        .json({ message: "Register succesfully", token: result });
    } catch (error: any) {
      if (error.message == "Email exist") {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  async loginCustomer(req: Request, res: Response) {
    const { email, password } = req.body;
    const key = process.env.JWT_SECRET || "tokenEcommerce";

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email, name, and password are required" });
    }
    if (email.trim().length === 0) {
      return res.status(400).json({ message: "Email is required" });
    } else if (password.trim().length === 0) {
      return res.status(400).json({ message: "Password is required" });
    }

    try {
      const result = await this.customerService.customerLogin(
        email as string,
        password as string,
        key
      );
      return res
        .status(200)
        .json({ message: "Login succesfully", token: result });
    } catch (error: any) {
      if (error.message == "Email doesn't exist") {
        return res.status(401).json({ message: error.message });
      }
      if (error.message == "Invalid password") {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
}
