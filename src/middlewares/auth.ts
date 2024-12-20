import { Request, Response, NextFunction } from "express";
import { UnauthorisedException } from "../exceptions/unauthorised";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";
import { CustomJwtPayload } from "../types/express";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        return next(new UnauthorisedException("Unauthorized", ErrorCode.UNAUTHORISED));
    }
    try {
        const payload = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
        const user = await prismaClient.user.findFirst({ where: { id: payload.userId } });
        if (!user) {
            return next(new UnauthorisedException("Unauthorized", ErrorCode.UNAUTHORISED));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new UnauthorisedException("Unauthorized", ErrorCode.UNAUTHORISED));
    }
};

export default authMiddleware;
