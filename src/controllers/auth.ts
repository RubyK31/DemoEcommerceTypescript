import { NextFunction, Request,Response } from "express"
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException, ErrorCode, NotFoundException } from "../validators/GlobalValidator"
import { SignUpSchema } from "../schema/users";



export const signup = async (req: Request, res: Response, next: NextFunction) => {
        SignUpSchema.parse(req.body);
        const { email, password, name } = req.body;

        let user = await prismaClient.user.findFirst({ where: { email } });
        if (user) {
            throw new BadRequestsException('User already exists!', ErrorCode.USER_ALREADY_EXISTS);
        }

        user = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashSync(password, 10)
            }
        });

        res.json(user);
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        let user = await prismaClient.user.findFirst({ where: { email } });
        if (!user) {
            throw new NotFoundException('User  Not Found', ErrorCode.USER_NOT_FOUND);
        }
        if (!compareSync(password, user.password)) {
            throw new BadRequestsException('Incorrect password entered', ErrorCode.INCORRECT_PASSWORD);
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET);

        res.json({ user, token });
};

// Return logged user
export const me = async (req: Request, res: Response) => {
    res.json(req.user)
};