import { Request, Response } from 'express';
export declare const createOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const listOrders: (req: Request, res: Response) => Promise<void>;
export declare const cancelOrder: (req: Request, res: Response) => Promise<void>;
export declare const getOrderById: (req: Request, res: Response) => Promise<void>;
export declare const listAllOrders: (req: Request, res: Response) => Promise<void>;
export declare const changeStatus: (req: Request, res: Response) => Promise<void>;
export declare const listUserOrders: (req: Request, res: Response) => Promise<void>;
