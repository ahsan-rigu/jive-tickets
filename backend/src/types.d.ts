import { Request } from "express";
import { IUser } from "./models/userModel";

export interface AuthorizedRequest extends Request {
  user: Omit<IUser, "password">;
}
