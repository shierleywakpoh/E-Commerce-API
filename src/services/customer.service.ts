import { CustomerRepository } from "../repositories/customer.repository";
import { login } from "../models/customer.models";

import { Jwt } from "../utils/jwt.util";
import { Bycrpt } from "../utils/bcrypt.util";
import { Errorr } from "../utils/error.util";
require("dotenv").config();

export class CustomerService {
  customerRepository: CustomerRepository;
  jwt: Jwt;
  bycript: Bycrpt;
  error: Errorr;

  constructor() {
    this.customerRepository = new CustomerRepository();
    this.jwt = new Jwt();
    this.bycript = new Bycrpt();
    this.error = new Errorr();
  }
  async customerRegister(
    email: string,
    password: string,
    name: string,
    role: string,
    key: string
  ): Promise<string> {
    try {
      await this.customerRepository.findByEmail(email);

      const passHash = await this.bycript.GeneratePass(password);
      await this.customerRepository.insertCustomer(email, passHash, name, role);
      const result = await this.customerRepository.selectLogin(email);

      return this.jwt.generateToken(result.role, key, result.id);
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
  /**
   * 
   
   */

  async customerLogin(
    email: string,
    password: string,
    key: string
  ): Promise<string | null> {
    try {
      const findEmail = await this.customerRepository.selectLogin(email);

      if (findEmail == null) {
        throw new Error("email null");
      }

      await this.bycript.ComparePass(password, findEmail.password);
      const token = await this.jwt.generateToken(
        findEmail.role,
        key,
        findEmail.id
      );

      return token;
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
}
