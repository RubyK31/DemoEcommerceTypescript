import { Request, Response, NextFunction } from "express";
import { UnauthorisedException, ErrorCode } from "@validators/GlobalValidator";


const adminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user
    if(user && user.role == 'ADMIN'){
        next()
    }else{
    return next(new UnauthorisedException("Unauthorized, only administrator allowed to create a new product", ErrorCode.UNAUTHORISED));
    }
}

export default adminMiddleware;
