import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export class Middlewares {
  private readonly tokenKeyAdmin: string;
  private readonly tokenKey: string;
  constructor() {
    this.tokenKeyAdmin = process.env.JWT_ADMIN || "tokenAdmin";
    this.tokenKey = process.env.JWT_SECRET || "tokenEcommerce";
  }

  async authCustomer(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");
    //const tokenKey = process.env.JWT_SECRET || "tokenEcommerce";

    if (scheme !== "Bearer" || !token)
      return res
        .status(401)
        .json({ message: "Missing or invalid Authorization header" });
    try {
      const decoded = jwt.verify(token, this.tokenKey);
      req.user = decoded;
      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Access token expired" });
      }
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
  async authAdmin(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization || "";
    const [scheme, token] = authHeader.split(" ");
    //const tokenKey = process.env.JWT_ADMIN || "tokenAdmin";

    if (scheme !== "Bearer" || !token)
      return res
        .status(401)
        .json({ message: "Missing or invalid Authorization header" });
    try {
      const decoded = jwt.verify(token, this.tokenKeyAdmin);
      req.user = decoded;
      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Access token expired" });
      }
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  async roleCustomer(req: AuthRequest, res: Response, next: NextFunction) {
    if (req.user.role !== "customer") {
      return res.status(403).json({ message: "Forbidden" });
    }
    //return res.status(201).json({ message: "bisaa" });
    next();
  }
  async roleAdmin(req: AuthRequest, res: Response, next: NextFunction) {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    //return res.status(201).json({ message: "bisaa" });
    next();
  }
}
