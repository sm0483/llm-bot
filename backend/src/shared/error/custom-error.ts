import { StatusCodes, getReasonPhrase } from "http-status-codes";

class CustomError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    (this.message = message), (this.status = status);
  }
}

class ServerError extends CustomError {
  constructor() {
    super(
      getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

class PaymentError extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.PAYMENT_REQUIRED);
  }
}

export { CustomError, ServerError, BadRequestError, PaymentError };
