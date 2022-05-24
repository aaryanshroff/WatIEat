import { Request } from "express";
import { UserTable } from "../db/models";

export interface ReqNutrients extends Request {
  body: {
    query: string;
  };
}

export interface ReqUser extends Request {
  user?: UserTable;
}
