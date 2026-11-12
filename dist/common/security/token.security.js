"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenSecurity = exports.TokenSecurity = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
const enum_1 = require("../enum");
const exceptions_1 = require("../exceptions");
const repository_1 = require("../repository");
class TokenSecurity {
    userRepository;
    constructor() {
        this.userRepository = new repository_1.UserRepository();
    }
    createToken = ({ payload, secret = config_1.ACCESS_TOKEN_USER_SECRET, options = {} }) => {
        return jsonwebtoken_1.default.sign(payload, secret, options);
    };
    verifyToken = ({ token, secret }) => {
        return jsonwebtoken_1.default.verify(token, secret);
    };
    getSecretKey = ({ role = enum_1.RoleEnum.USER, tokenType = enum_1.TokenTypeEnum.ACCESS_TOKEN } = {}) => {
        const secrets = {
            [enum_1.RoleEnum.USER]: {
                [enum_1.TokenTypeEnum.ACCESS_TOKEN]: config_1.ACCESS_TOKEN_USER_SECRET,
                [enum_1.TokenTypeEnum.REFRESH_TOKEN]: config_1.REFRESH_TOKEN_USER_SECRET,
            },
            [enum_1.RoleEnum.ADMIN]: {
                [enum_1.TokenTypeEnum.ACCESS_TOKEN]: config_1.ACCESS_TOKEN_ADMIN_SECRET,
                [enum_1.TokenTypeEnum.REFRESH_TOKEN]: config_1.REFRESH_TOKEN_ADMIN_SECRET,
            },
        };
        return secrets[role]?.[tokenType];
    };
    decodeToken = async ({ authorization = '', tokenType = enum_1.TokenTypeEnum.ACCESS_TOKEN, } = {}) => {
        if (!authorization) {
            throw new exceptions_1.BadRequestException('authorization header is missing');
        }
        const token = authorization.startsWith('Bearer ')
            ? authorization.split(' ')[1]
            : authorization;
        if (!token) {
            throw new exceptions_1.BadRequestException('Token is missing');
        }
        const decoded = jsonwebtoken_1.default.decode(token, { json: true });
        if (!decoded?.aud?.length || !decoded?.sub || !decoded?.exp || !decoded?.iat) {
            throw new exceptions_1.BadRequestException(`Invalid ${tokenType} token`);
        }
        const role = (Array.isArray(decoded.aud) ? decoded.aud[0] : decoded.aud);
        const secret = this.getSecretKey({ role, tokenType });
        if (!secret) {
            throw new exceptions_1.BadRequestException('Invalid signature configuration');
        }
        let payload;
        try {
            payload = this.verifyToken({ token, secret });
        }
        catch (error) {
            throw new exceptions_1.BadRequestException(error.message || 'Token verification failed');
        }
        const user = await this.userRepository.findById(payload.sub);
        if (!user) {
            throw new exceptions_1.BadRequestException('User not found ');
        }
        return { user, payload };
    };
    createLoginCredentials = ({ user, options = {} }) => {
        const accessSignature = this.getSecretKey({
            role: user.role,
            tokenType: enum_1.TokenTypeEnum.ACCESS_TOKEN
        });
        const refreshSignature = this.getSecretKey({
            role: user.role,
            tokenType: enum_1.TokenTypeEnum.REFRESH_TOKEN
        });
        if (!accessSignature || !refreshSignature) {
            throw new exceptions_1.BadRequestException("Invalid secret key configuration");
        }
        const access_token = this.createToken({
            payload: { sub: user._id },
            secret: accessSignature,
            options: {
                ...options,
                audience: [user.role],
                expiresIn: config_1.ACCESS_TOKEN_EXPIRES_IN
            }
        });
        const refresh_token = this.createToken({
            payload: { sub: user._id },
            secret: refreshSignature,
            options: {
                ...options,
                audience: [user.role],
                expiresIn: config_1.REFRESH_TOKEN_EXPIRES_IN
            }
        });
        return { access_token, refresh_token };
    };
}
exports.TokenSecurity = TokenSecurity;
exports.tokenSecurity = new TokenSecurity();
