"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalValidationFields = exports.matchFields = void 0;
const zod_1 = require("zod");
const enum_1 = require("../enum");
const security_enum_1 = require("../enum/security.enum");
const mongoose_1 = __importDefault(require("mongoose"));
const matchFields = (original, copy, lang = security_enum_1.LanguageEnum.EN) => {
    return (data, ctx) => {
        if (data[original] !== data[copy]) {
            const isAr = lang === security_enum_1.LanguageEnum.AR;
            ctx.addIssue({
                code: "custom",
                message: isAr
                    ? `حقل ${copy} غير متطابق مع ${original}`
                    : `${copy} does not match ${original}`,
                path: [copy],
            });
        }
    };
};
exports.matchFields = matchFields;
const generalValidationFields = (lang = security_enum_1.LanguageEnum.EN) => {
    const isAr = lang === security_enum_1.LanguageEnum.AR;
    return {
        email: zod_1.z.string().email({
            message: isAr ? "البريد الإلكتروني غير صحيح" : "Invalid email",
        }),
        password: zod_1.z
            .string()
            .min(8, {
            message: isAr
                ? "كلمة المرور يجب ألا تقل عن 8 أحرف"
                : "Password must be at least 8 characters",
        })
            .max(20, {
            message: isAr
                ? "كلمة المرور يجب ألا تتجاوز 20 حرفاً"
                : "Password must be at most 20 characters",
        }),
        newPassword: zod_1.z
            .string()
            .min(8, {
            message: isAr
                ? "كلمة المرور الجديدة يجب ألا تقل عن 8 أحرف"
                : "New password must be at least 8 characters",
        })
            .max(20, {
            message: isAr
                ? "كلمة المرور يجب ألا تتجاوز 20 حرفاً"
                : "Password must be at most 20 characters",
        }),
        username: zod_1.z
            .string()
            .min(3, {
            message: isAr
                ? "اسم المستخدم يجب ألا يقل عن 3 أحرف"
                : "Username must be at least 3 characters",
        }),
        otp: zod_1.z
            .string()
            .length(6, {
            message: isAr
                ? "كود التحقق يجب أن يتكون من 6 أرقام"
                : "OTP must be exactly 6 digits",
        })
            .regex(/^\d+$/, {
            message: isAr
                ? "كود التحقق يجب أن يحتوي على أرقام فقط"
                : "OTP must contain only digits",
        }),
        phone: zod_1.z
            .string()
            .regex(/^(010|011|012|015)[0-9]{8}$/, {
            message: isAr
                ? "رقم الهاتف غير صحيح (يجب أن يكون رقم مصري صالح)"
                : "Invalid Egyptian phone number",
        }),
        confirmPassword: zod_1.z
            .string()
            .min(8, {
            message: isAr
                ? "تأكيد كلمة المرور يجب ألا يقل عن 8 أحرف"
                : "Confirm password must be at least 8 characters",
        })
            .max(20, {
            message: isAr
                ? "تأكيد كلمة المرور يجب ألا يتجاوز 20 حرفاً"
                : "Confirm password must be at most 20 characters",
        }),
        confirmEmail: zod_1.z.string().email({
            message: isAr
                ? "تأكيد البريد الإلكتروني غير صحيح"
                : "Invalid confirm email",
        }),
        gender: zod_1.z.nativeEnum(enum_1.GenderEnum, { message: isAr ? "النوع المحدد غير صالح" : "Invalid gender",
        }),
        role: zod_1.z.nativeEnum(enum_1.RoleEnum, { message: isAr ? "الدور المحدد غير صالح" : "Invalid role",
        }),
        id: zod_1.z.string().refine((data) => Boolean(mongoose_1.default.Types.ObjectId.isValid(data)), {
            message: isAr ? "معرف غير صالح" : "Invalid ID format",
        }),
        file: zod_1.z.strictObject({
            fieldname: zod_1.z.string(),
            originalname: zod_1.z.string(),
            encoding: zod_1.z.string(),
            size: zod_1.z.number(),
            mimetype: zod_1.z.string(),
            buffer: zod_1.z.instanceof(Buffer).optional(),
            path: zod_1.z.string().optional(),
            destination: zod_1.z.string().optional(),
            filename: zod_1.z.string().optional(),
        }),
        matchFields: (original, copy) => (0, exports.matchFields)(original, copy, lang),
    };
};
exports.generalValidationFields = generalValidationFields;
