"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const exceptions_1 = require("../../common/exceptions");
const repository_1 = require("../../common/repository");
class AuthServices {
    UserRepository;
    constructor() {
        this.UserRepository = new repository_1.UserRepository();
    }
    async signup({ username, email, password, phone }) {
        const user = await this.UserRepository.findOne({ email });
        if (user)
            throw new exceptions_1.ConflictException('Email already exists');
        const acc = await this.UserRepository.create({ username, email, password, phone });
        return acc;
    }
    login(data) {
        return data;
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
