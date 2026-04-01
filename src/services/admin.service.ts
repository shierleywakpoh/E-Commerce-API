import { AdminRepository } from "../repositories/admin.repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Jwt } from "../utils/jwt.util";
import { Bycrpt } from "../utils/bcrypt.util";
import { Errorr } from "../utils/error.util";
require("dotenv").config();

export class AdminService {
  adminRepository: AdminRepository;
  jwt: Jwt;
  bycript: Bycrpt;
  error: Errorr;

  constructor() {
    this.adminRepository = new AdminRepository();
    this.jwt = new Jwt();
    this.bycript = new Bycrpt();
    this.error = new Errorr();
  }
  /**
   *
   *
   */

  // async adminRegister(email: string,password: string,name: string,role: string,key: string) {
  // try {
  //    const findAdmin = await this.adminRepository.findByEmail(email);
  //    if (findAdmin == null) {
  //      throw new Error("use = null");
  //    } else if (findAdmin > 0) {
  //      throw new Error("Email exist");
  //  }
  //await this.bycript.GeneratePass(password, email, name, role);
  //   await this.bycript.GeneratePass(password);
  /**
       * 
      const id = (await this.customerRepository.selectLogin(email)).rows;
      if (id[0] == 0) {
        throw new Error("can't find id");
 //     }
      return this.jwt.generateToken(role, key, id[0].id);
       */
  //  } catch (error: any) {
  //  return this.error.GenerateError(error);
  // }
  // }

  async adminLogin(
    email: string,
    password: string,
    key: string
  ): Promise<string | null> {
    try {
      console.log("ini service");
      const findEmail = await this.adminRepository.selectLogin(email);

      console.log("findemail", findEmail);
      await this.bycript.ComparePass(password, findEmail.password);

      const token = await this.jwt.generateToken(
        findEmail.role,
        key,
        findEmail.id
      );
      console.log("token", token);
      return token;
    } catch (error: any) {
      return this.error.GenerateError(error);
    }
  }
}
