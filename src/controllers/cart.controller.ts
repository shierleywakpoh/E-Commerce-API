import { CartService } from "../services/cart.service";

import { Request, Response } from "express";
export interface AuthRequest extends Request {
  user?: any;
}

export class CartController {
  cartService: CartService;
  constructor() {
    this.cartService = new CartService();
  }
  async create(req: AuthRequest, res: Response) {
    const id = req.user.id;
    const { idProduct, quantity } = req.body;

    if (!idProduct || !quantity) {
      return res
        .status(400)
        .json({ message: "idProduct, and quantity are required" });
    }

    try {
      await this.cartService.create(id, idProduct, quantity);
      return res.status(201).json({ message: "Added item is successfully" });
    } catch (error: any) {
      if (error.message == "Out of stock") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  async getByID(req: AuthRequest, res: Response) {
    const id = req.user.id;

    try {
      const result = await this.cartService.getById(id);
      return res.status(201).json(result);
    } catch (error: any) {
      if (error.message == "User does not have cart") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  async update(req: Request, res: Response) {
    const id = req.params.id as string;
    const { quantity, productId, quantityId, stock } = req.body;

    if (!quantity || !productId || !quantityId || !stock) {
      return res
        .status(400)
        .json({ message: "Quantity, productId, quantityId, stock" });
    }

    try {
      await this.cartService.update(
        Number(id),
        quantity,
        productId,
        quantityId,
        stock
      );
      return res.status(201).json({ message: "Changed cart is successfully" });
    } catch (error: any) {
      if (error.message == "Out of stock") {
        return res.status(404).json({ message: error.message });
      }
      return res.status(500).json({ message: error.message });
    }
  }
  async delete(req: Request, res: Response) {
    const id = req.params.id as string;
    const { quantity, stock, productId } = req.body;
    if (!quantity || !productId || !stock) {
      return res.status(400).json({ message: "Quantity, productId, stock" });
    }
    try {
      await this.cartService.delete(Number(id), quantity, stock, productId);
      return res.status(201).json({ message: "Deleted cart is sucessfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
