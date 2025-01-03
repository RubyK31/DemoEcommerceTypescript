import { Request, Response, NextFunction } from "express";
export declare const errorHandler: (method: Function) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
