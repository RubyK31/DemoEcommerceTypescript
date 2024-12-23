import { Request, Response } from "express";
export declare const addItemToCart: (req: Request, res: Response) => Promise<void>;
export declare const deletetemFromCart: (req: Request, res: Response) => Promise<void>;
export declare const changeQuantity: (req: Request, res: Response) => Promise<void>;
export declare const getCart: (req: Request, res: Response) => Promise<void>;
export declare const cartItemsCount: (req: Request, res: Response) => Promise<void>;
