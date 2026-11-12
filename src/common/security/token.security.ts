import jwt from "jsonwebtoken";
import {
    ACCESS_TOKEN_ADMIN_SECRET,
    ACCESS_TOKEN_USER_SECRET,
    REFRESH_TOKEN_ADMIN_SECRET,
    REFRESH_TOKEN_USER_SECRET,
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN
} from "../../config";
import { RoleEnum, TokenTypeEnum } from "../enum";
import { BadRequestException } from "../exceptions";
import { UserRepository } from "../repository";
import { HUser } from "../../DB/model";

export class TokenSecurity {
private userRepository: UserRepository;
    constructor( ) {
this.userRepository = new UserRepository();
    }

    createToken = ({
        payload,
        secret = ACCESS_TOKEN_USER_SECRET,
        options = {}
    }: {
        payload: object;
        secret?: string;
        options?: jwt.SignOptions;
    }): string => {
        return jwt.sign(payload, secret, options);
    };

    verifyToken = ({
        token,
        secret
    }: {
        token: string;
        secret: string;
    }) => {
        return jwt.verify(token, secret);
    };

    getSecretKey = ({
        role = RoleEnum.USER,
        tokenType = TokenTypeEnum.ACCESS_TOKEN
    }: {
        role?: string;
        tokenType?: string;
    } = {}) => {
        const secrets: Record<string, Record<string, string>> = {
            [RoleEnum.USER]: {
                [TokenTypeEnum.ACCESS_TOKEN]: ACCESS_TOKEN_USER_SECRET,
                [TokenTypeEnum.REFRESH_TOKEN]: REFRESH_TOKEN_USER_SECRET,
            },
            [RoleEnum.ADMIN]: {
                [TokenTypeEnum.ACCESS_TOKEN]: ACCESS_TOKEN_ADMIN_SECRET,
                [TokenTypeEnum.REFRESH_TOKEN]: REFRESH_TOKEN_ADMIN_SECRET,
            },
        };

        return secrets[role]?.[tokenType];
    };

    decodeToken = async ({
        authorization = '',
        tokenType = TokenTypeEnum.ACCESS_TOKEN,
    }: {
        authorization?: string;
        tokenType?: TokenTypeEnum;
    } = {}) => {
        if (!authorization) {
            throw new BadRequestException('authorization header is missing');
        }

        const token = authorization.startsWith('Bearer ')
            ? authorization.split(' ')[1]
            : authorization;

        if (!token) {
            throw new BadRequestException('Token is missing');
        }

        const decoded = jwt.decode(token, { json: true });
        if (!decoded?.aud?.length || !decoded?.sub || !decoded?.exp || !decoded?.iat) {
            throw new BadRequestException(`Invalid ${tokenType} token`);
        }

        const role = (Array.isArray(decoded.aud) ? decoded.aud[0] : decoded.aud) as RoleEnum;
        const secret = this.getSecretKey({ role, tokenType });

        if (!secret) {
            throw new BadRequestException('Invalid signature configuration');
        }

        let payload: jwt.JwtPayload;
        try {
            payload = this.verifyToken({ token, secret }) as jwt.JwtPayload;
        } catch (error: any) {
            throw new BadRequestException(error.message || 'Token verification failed');
        }

        // التحقق من وجود المستخدم في قاعدة البيانات
        const user = await this.userRepository.findById(payload.sub as string);

        if (!user) {
            throw new BadRequestException('User not found ');
        }

        return { user, payload };
    };

    createLoginCredentials = ({
        user,
        options = {}
    }: {
        user: HUser;
        options?: jwt.SignOptions;
    }) => {
        const accessSignature = this.getSecretKey({
            role: user.role as RoleEnum,
            tokenType: TokenTypeEnum.ACCESS_TOKEN
        });

        const refreshSignature = this.getSecretKey({
            role: user.role as RoleEnum,
            tokenType: TokenTypeEnum.REFRESH_TOKEN
        });

        if (!accessSignature || !refreshSignature) {
            throw new BadRequestException("Invalid secret key configuration");
        }

        const access_token = this.createToken({
            payload: { sub: user._id },
            secret: accessSignature,
            options: {
                ...options,
                audience: [user.role],
                expiresIn: ACCESS_TOKEN_EXPIRES_IN
            }
        });

        const refresh_token = this.createToken({
            payload: { sub: user._id },
            secret: refreshSignature,
            options: {
                ...options,
                audience: [user.role],
                expiresIn: REFRESH_TOKEN_EXPIRES_IN
            }
        });

        return { access_token, refresh_token };
    };
}

export const tokenSecurity = new TokenSecurity();