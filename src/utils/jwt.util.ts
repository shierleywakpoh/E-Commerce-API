import jwt from "jsonwebtoken";

export class Jwt {
  async generateToken(role: string, key: string, id: string): Promise<string> {
    const payload = { role: role, id: id };
    const token = await jwt.sign(payload, key, { expiresIn: "45m" });
    return token;
  }
}
