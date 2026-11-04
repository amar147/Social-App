"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)({ strict: true, caseSensitive: true });
router.post('/signup', (0, middleware_1.Validation)(auth_validation_1.signupSchema), (0, middleware_1.ResponseFormatter)(async (req, res, next) => {
    const data = await auth_service_1.default.signup(req.body);
    return { data };
}));
router.post('/login', (0, middleware_1.Validation)(auth_validation_1.loginSchema), (0, middleware_1.ResponseFormatter)(async (req, res, next) => {
    const data = await auth_service_1.default.login(req.body);
    return { data };
}));
router.post('/forget-password', (0, middleware_1.Validation)(auth_validation_1.forgetPasswordSchema), (0, middleware_1.ResponseFormatter)(async (req, res, next) => {
    const data = await auth_service_1.default.forgetPassword(req.body);
    return { data };
}));
router.post('/change-password', (0, middleware_1.Validation)(auth_validation_1.changePasswordSchema), (0, middleware_1.ResponseFormatter)(async (req, res, next) => {
    const data = await auth_service_1.default.changePassword(req.body);
    return { data };
}));
router.post('/confirm-email', (0, middleware_1.Validation)(auth_validation_1.confirmEmailSchema), (0, middleware_1.ResponseFormatter)(async (req, res, next) => {
    const data = await auth_service_1.default.confirmEmail(req.body);
    return { data };
}));
router.post('/reset-password', (0, middleware_1.Validation)(auth_validation_1.resetPasswordSchema), (0, middleware_1.ResponseFormatter)(async (req, res, next) => {
    const data = await auth_service_1.default.resetPassword(req.body);
    return { data };
}));
router.post('/resend-otp', (0, middleware_1.Validation)(auth_validation_1.sendEmailOtpSchema), (0, middleware_1.ResponseFormatter)(async (req, res, next) => {
    const data = await auth_service_1.default.resendOtp(req.body);
    return { data };
}));
router.post('/send-otp', (0, middleware_1.Validation)(auth_validation_1.sendEmailOtpSchema), (0, middleware_1.ResponseFormatter)(async (req, res, next) => {
    const data = await auth_service_1.default.sendOtp(req.body);
    return { data };
}));
router.post('/logout', (0, middleware_1.ResponseFormatter)(async (req, res, next) => {
    const data = await auth_service_1.default.logout(req.body);
    return { data };
}));
exports.default = router;
