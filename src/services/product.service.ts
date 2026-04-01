import { ProductRepository } from "../repositories/product.repository";
import { Errorr } from "../utils/error.util";
import { products } from "../models/product.models";

export class ProductService {
  productRepository: ProductRepository;
  error: Errorr;
  constructor() {
    this.productRepository = new ProductRepository();
    this.error = new Errorr();
  }
  async create(
    name: string,
    description: string,
    stock: number,
    price: number,
    imageUrl: string
  ): Promise<void> {
    try {
      await this.productRepository.create(
        name,
        description,
        stock,
        price,
        imageUrl
      );
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async getAll(): Promise<products[]> {
    try {
      return await this.productRepository.getAll();
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async getById(id: number): Promise<products> {
    try {
      return await this.productRepository.getById(id);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async updateById(
    id: string,

    stock: number,
    price: number
  ): Promise<void> {
    try {
      console.log("service", id, stock, price);
      await this.productRepository.updateById(id, stock, price);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async deleteById(id: string): Promise<void> {
    try {
      console.log("id1", id);
      await this.productRepository.deleteById(id);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  async search(search: string): Promise<products[]> {
    try {
      return await this.productRepository.search(search);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
}
