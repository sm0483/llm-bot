/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { IRequestUser } from "../types/IRequest";
import { CustomError } from "../error/custom-error";

const errorHandler = (
  err: Error,
  req: IRequestUser,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    return res
      .status(err.status)
      .json({ error: err.message, status: err.status, success: false });
  }

  if (process.env.NODE_ENV === "development") {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: err.message,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
    });
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
    });
  }
};

export default errorHandler;
