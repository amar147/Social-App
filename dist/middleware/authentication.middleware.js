"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const enum_1 = require("../common/enum");
const exceptions_1 = require("../common/exceptions");
const security_1 = require("../common/security");
const tokenSecurity = new security_1.TokenSecurity();
const authentication = (tokenType = enum_1.TokenTypeEnum.ACCESS_TOKEN) => {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers;
            if (!authorization) {
                throw new exceptions_1.UnauthorizedException("Authorization header is required");
            }
            const { user, payload } = await tokenSecurity.decodeToken({
                authorization,
                tokenType
            });
            req.user = user;
            req.payload = payload;
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.authentication = authentication;
