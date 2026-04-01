import bcrypt from "bcrypt";
import { CustomerRepository } from "../repositories/customer.repository";
import { Errorr } from "../utils/error.util";

export class Bycrpt {
  customerRepository: CustomerRepository;
  error: Errorr;

  constructor() {
    this.customerRepository = new CustomerRepository();
    this.error = new Errorr();
  }

  async GeneratePass(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10);
      const passHash = await bcrypt.hash(password, salt);
      /**
       const insertCustomer = await this.customerRepository.insertCustomer(
         email,
         passHash,
         name,
         role
       );
       * 
       if (insertCustomer.rowCount == 0) {
         throw new Error("customer can't added to database");
       }
       */
      return passHash;
    } catch (error: any) {
      throw error.GenerateError(error);
    }
  }
  async ComparePass(passInput: string, passData: string): Promise<void> {
    const comparePassword = await bcrypt.compare(passInput, passData);
    if (!comparePassword) {
      throw new Error("Invalid password");
    }
  }
}
