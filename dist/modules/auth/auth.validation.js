"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.resetPasswordSchema = exports.forgetPasswordSchema = exports.confirmEmailSchema = exports.sendEmailOtpSchema = exports.loginSchema = exports.signupSchema = void 0;
const enum_1 = require("../../common/enum");
const zod_1 = require("zod");
const utils_1 = require("../../common/utils");
const signupSchema = (lang = enum_1.LanguageEnum.EN) => {
    const fields = (0, utils_1.generalValidationFields)(lang);
    return zod_1.z.object({
        body: zod_1.z.object({
            email: fields.email,
            password: fields.password,
            username: fields.username,
            confirmPassword: fields.password,
            phone: fields.phone,
            gender: fields.gender
        }).superRefine((0, utils_1.matchFields)("password", "confirmPassword", lang)),
    });
};
exports.signupSchema = signupSchema;
const loginSchema = (lang = enum_1.LanguageEnum.EN) => {
    const fields = (0, utils_1.generalValidationFields)(lang);
    return zod_1.z.object({
        body: zod_1.z.object({
            email: fields.email,
            password: fields.password,
        })
    });
};
exports.loginSchema = loginSchema;
const sendEmailOtpSchema = (lang = enum_1.LanguageEnum.EN) => {
    const fields = (0, utils_1.generalValidationFields)(lang);
    return zod_1.z.object({
        body: zod_1.z.object({
            email: fields.email,
        })
    });
};
exports.sendEmailOtpSchema = sendEmailOtpSchema;
const confirmEmailSchema = (lang = enum_1.LanguageEnum.EN) => {
    const fields = (0, utils_1.generalValidationFields)(lang);
    return zod_1.z.object({
        body: zod_1.z.object({
            email: fields.email,
            otp: fields.otp,
        })
    });
};
exports.confirmEmailSchema = confirmEmailSchema;
const forgetPasswordSchema = (lang = enum_1.LanguageEnum.EN) => {
    const fields = (0, utils_1.generalValidationFields)(lang);
    return zod_1.z.object({
        body: zod_1.z.object({
            email: fields.email,
        })
    });
};
exports.forgetPasswordSchema = forgetPasswordSchema;
const resetPasswordSchema = (lang = enum_1.LanguageEnum.EN) => {
    const fields = (0, utils_1.generalValidationFields)(lang);
    return zod_1.z.object({
        body: zod_1.z.object({
            email: fields.email,
            otp: fields.otp,
            newPassword: fields.newPassword,
            confirmPassword: fields.confirmPassword,
        }).superRefine((0, utils_1.matchFields)("newPassword", "confirmPassword", lang)),
    });
};
exports.resetPasswordSchema = resetPasswordSchema;
const changePasswordSchema = (lang = enum_1.LanguageEnum.EN) => {
    const fields = (0, utils_1.generalValidationFields)(lang);
    return zod_1.z.object({
        body: zod_1.z.object({
            oldPassword: fields.password,
            newPassword: fields.newPassword,
            confirmPassword: fields.confirmPassword,
        }).superRefine((0, utils_1.matchFields)("newPassword", "confirmPassword", lang)),
    });
};
exports.changePasswordSchema = changePasswordSchema;
