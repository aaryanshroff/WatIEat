import { Request } from "express";
import { UserTable } from "../db/models";

export interface ReqUser extends Request {
  user?: UserTable;
}
