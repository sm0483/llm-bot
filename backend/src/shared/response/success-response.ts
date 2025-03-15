import { Response } from "express";
import { StatusCodes } from "http-status-codes";

interface IResponse {
  success: boolean;
  message: string;
  result?: unknown;
}

class SuccessResponse {
  constructor(
    res: Response,
    message: string,
    result?: unknown,
    status?: number,
  ) {
    const response = {
      success: true,
      message: message,
      status: status || StatusCodes.OK,
    };

    if (result) (response as IResponse).result = result;

    res.status(StatusCodes.OK).send(response);
  }
}

export { SuccessResponse };
