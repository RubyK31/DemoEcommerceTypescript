import { Request, Response } from 'express';
export declare const addAddress: (req: Request, res: Response) => Promise<void>;
export declare const deleteAddress: (req: Request, res: Response) => Promise<void>;
export declare const listAddress: (req: Request, res: Response) => Promise<void>;
export declare const updateUser: (req: Request, res: Response) => Promise<void>;
export declare const listUsers: (req: Request, res: Response) => Promise<void>;
export declare const getUserById: (req: Request, res: Response) => Promise<void>;
export declare const changeUserRole: (req: Request, res: Response) => Promise<void>;
