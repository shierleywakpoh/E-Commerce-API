import { Request, Response } from "express";
import { AdminService } from "../services/admin.service";

export class AdminController {
  adminService: AdminService;
  constructor() {
    this.adminService = new AdminService();
  }
  /**
   * 
   *
  async insertAdmin(req: Request, res: Response) {
    const { email, password, name } = req.body;
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
      const key = process.env.JWT_ADMIN || "tokenAdmin";
      const role = "admin";
      const regisAdmin = await this.adminService.adminRegister(
        email as string,
        password as string,
        name as string,
        role,
        key
      );
      res
        .status(200)
        .json({ message: "Register succesfully", token: regisAdmin });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
   */
  async loginAdmin(req: Request, res: Response) {
    const key = process.env.JWT_ADMIN || "tokenAdmin";
    const { email, password } = req.body;
    console.log("email", email);
    console.log("password", password);
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    if (email.trim().length === 0) {
      return res.status(400).json({ message: "Email is required" });
    } else if (password.trim().length === 0) {
      return res.status(400).json({ message: "Password is required" });
    }
    try {
      const result = await this.adminService.adminLogin(
        email as string,
        password as string,
        key
      );
      console.log("result", result);
      res.status(201).json({ message: "Login succesfully", token: result });
    } catch (error: any) {
      if (error.message == "Email doesn't exist") {
        return res.status(401).json({ message: error.message });
      }
      if (error.message == "Invalid password") {
        return res.status(401).json({ message: error.message });
      }
      res.status(500).json({ message: error.message });
    }
  }
}
