export class Errorr {
  GenerateError(error: any): any {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("something wrong");
  }
}
