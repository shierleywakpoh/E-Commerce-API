import { Request, Response } from "express";
import { ProductService } from "../services/product.service";

export class Product {
  productService: ProductService;
  constructor() {
    this.productService = new ProductService();
  }
  async create(req: Request, res: Response) {
    try {
      const value = req.body;
      if (!value.name || !value.description || !value.stock || !value.price) {
        return res.status(400).json({
          message: "Name, description, stock, and price are required",
        });
      }
      if (value.name.trim().length === 0) {
        return res.status(400).json({ message: "Name is required" });
      } else if (value.description.trim().length === 0) {
        return res.status(400).json({ message: "Description is required" });
      } else if (value.stock.trim().length === 0) {
        return res.status(400).json({ message: "Stock is required" });
      } else if (value.price.trim().length === 0) {
        return res.status(400).json({ message: "Price is required" });
      }

      if (req.file) {
        value.imageUrl = req.file.path.replace(/\\/g, "/");
      } else {
        throw new Error("file is required");
      }
      await this.productService.create(
        value.name,
        value.description,
        value.stock,
        value.price,
        value.imageUrl
      );
      return res.status(201).json({ message: "Added product is sucessfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  async getAll(req: Request, res: Response) {
    try {
      const result = await this.productService.getAll();
      res.status(201).json(result);
    } catch (error: any) {
      console.log("error", error.message);
      res.status(400).json({ message: error.message });
    }
  }
  async getById(req: Request, res: Response) {
    try {
      const value = Number(req.params.id as string);
      const result = await this.productService.getById(value);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
  async updateById(req: Request, res: Response) {
    const id = req.params.id as string;

    const { stock, price } = req.body;
    if (!price) {
      return res.status(400).json({ message: "Price is required" });
    }

    try {
      await this.productService.updateById(
        id,

        stock,
        price
      );

      return res.status(201).json({ message: "Changed item is successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  async deleteById(req: Request, res: Response) {
    const id = req.params.id as string;

    try {
      await this.productService.deleteById(id);

      return res
        .status(201)
        .json({ message: "Deleted product is successfully" });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
  async search(req: Request, res: Response) {
    const { search } = req.params;
    try {
      const result = await this.productService.search(search as string);
      res.json({ result });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}
