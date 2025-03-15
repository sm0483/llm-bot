import { Request, Response } from "express";
import { SuccessResponse } from "../../shared/response/success-response";

export default class IndexController {
  public getServer = async (req: Request, res: Response): Promise<any> => {
    return new SuccessResponse(res, "Server alive");
  };
}
