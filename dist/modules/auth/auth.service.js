"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const exceptions_1 = require("../../common/exceptions");
const repository_1 = require("../../common/repository");
const enum_1 = require("../../common/enum");
const security_1 = require("../../common/security");
const services_1 = require("../../common/services");
class AuthServices {
    UserRepository;
    CacheService;
    TokenSecurity;
    constructor() {
        this.UserRepository = new repository_1.UserRepository();
        this.CacheService = new services_1.CacheService();
        this.TokenSecurity = new security_1.TokenSecurity();
    }
    async signup({ username, email, password, phone }) {
        const user = await this.UserRepository.findOne({ email });
        if (user)
            throw new exceptions_1.ConflictException('Email already exists');
        const acc = await this.UserRepository.create({
            username,
            email,
            password: (password),
            phone: (phone),
            provider: enum_1.ProviderEnum.SYSTEM
        });
        return acc;
    }
    async login({ email, password }) {
        const account = await this.UserRepository.findOne({
            filter: {
                email,
                provider: enum_1.ProviderEnum.SYSTEM,
                confirmEmail: { $exists: true },
                password
            }
        });
        if (!account)
            throw new exceptions_1.ConflictException('Email not found or not confirmed');
        const match = await (0, security_1.compare)(password, account.password);
        if (!match)
            throw new exceptions_1.ConflictException('Password is incorrect');
        return this.TokenSecurity.createLoginCredentials({ user: account });
    }
    forgetPassword(data) {
        return data;
    }
    changePassword(data) {
        return data;
    }
    confirmEmail(data) {
        return data;
    }
    resetPassword(data) {
        return data;
    }
    sendOtp(data) {
        return data;
    }
    resendOtp(data) {
        return data;
    }
    logout(data) {
        return data;
    }
}
exports.AuthServices = AuthServices;
exports.default = new AuthServices();
