import { Request, Response, NextFunction } from "express";
import { TokenTypeEnum } from "../common/enum";
import { UnauthorizedException } from "../common/exceptions"; // أو اسم الـ Exception عندك
import { IUser } from "../common/interface";
import jwt from "jsonwebtoken";

import {TokenSecurity} from '../common/security'

const tokenSecurity = new TokenSecurity();

export interface AuthenticatedRequest extends Request {
    user?: IUser;
    payload?: jwt.JwtPayload;
}

export const authentication = (tokenType: TokenTypeEnum = TokenTypeEnum.ACCESS_TOKEN) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { authorization } = req.headers;

            if (!authorization) {
                throw new UnauthorizedException("Authorization header is required");
            }

            // فك التوكن والتحقق منه والبحث عن المستخدم
            const { user, payload } = await tokenSecurity.decodeToken({
                authorization,
                tokenType
            });

            req.user = user;
            req.payload = payload;
            // req.params= params

            next();
        } catch (error) {
            next(error); 
        }
    };
};