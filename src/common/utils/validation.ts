import { z, RefinementCtx } from "zod";
import { GenderEnum, RoleEnum } from "../enum";
import { LanguageEnum } from "../enum/security.enum";
import mongoose from "mongoose";

export const matchFields = (
    original: string,
    copy: string,
    lang: LanguageEnum = LanguageEnum.EN
) => {
    return (data: Record<string, any>, ctx: RefinementCtx) => {
    if (data[original] !== data[copy]) {
        const isAr = lang === LanguageEnum.AR;
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

export const generalValidationFields = (lang: LanguageEnum = LanguageEnum.EN) => {
    const isAr = lang === LanguageEnum.AR;

    return {
    email: z.string().email({
        message: isAr ? "البريد الإلكتروني غير صحيح" : "Invalid email",
    }),

    password: z
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
    newPassword: z
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

    username: z
        .string()
        .min(3, {
        message: isAr
            ? "اسم المستخدم يجب ألا يقل عن 3 أحرف"
            : "Username must be at least 3 characters",
        }),

    otp: z
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

    phone: z
        .string()
        .regex(/^(010|011|012|015)[0-9]{8}$/, {
        message: isAr
            ? "رقم الهاتف غير صحيح (يجب أن يكون رقم مصري صالح)"
            : "Invalid Egyptian phone number",
        }),

    confirmPassword: z
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

    confirmEmail: z.string().email({
        message: isAr
        ? "تأكيد البريد الإلكتروني غير صحيح"
        : "Invalid confirm email",
    }),

    gender: z.nativeEnum(GenderEnum, {message: isAr ? "النوع المحدد غير صالح" : "Invalid gender",

    }),

    role: z.nativeEnum(RoleEnum, { message: isAr ? "الدور المحدد غير صالح" : "Invalid role",
    }),

    id: z.string().refine((data) => Boolean(mongoose.Types.ObjectId.isValid(data)), {
        message: isAr ? "معرف غير صالح" : "Invalid ID format",
    }),

    file: z.strictObject({
        fieldname: z.string(),
        originalname: z.string(),
        encoding: z.string(),
        size: z.number(),
        mimetype: z.string(),
        buffer: z.instanceof(Buffer).optional(),
        path: z.string().optional(),
        destination: z.string().optional(),
        filename: z.string().optional(),
    }),
    matchFields: (original: string, copy: string) => matchFields(original, copy, lang),
};
};


