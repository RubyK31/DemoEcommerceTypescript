import { JwtPayload } from "jsonwebtoken";
import * as express from "express";
// Define and export the interface for your JWT payload
export interface CustomJwtPayload extends JwtPayload {
  user: User;
  
}
declare global {
  namespace Express {
    interface Request {
      user?: User; // Use the custom payload type for the user property
    }
  }
}