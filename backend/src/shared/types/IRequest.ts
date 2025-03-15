import { Request } from "express";

interface IRequestUser extends Request {
  user?: {
    id: string;
    email: string;
    userType: string[];
  };
  data?: object;
  refreshToken?: string;
}

export { IRequestUser };
