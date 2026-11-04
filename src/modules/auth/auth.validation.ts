import { LanguageEnum } from "../../common/enum";
import { z } from "zod";
import { generalValidationFields, matchFields } from "../../common/utils";

export const signupSchema = (lang: LanguageEnum = LanguageEnum.EN) => {
    const fields = generalValidationFields(lang);
    return z.object({
        body: z.object({
        email: fields.email,
        password: fields.password,
        username: fields.username,
        confirmPassword: fields.password,
        phone: fields.phone,
        gender: fields.gender
        }).superRefine(matchFields("password", "confirmPassword", lang)),

    })
}
export const loginSchema = (lang: LanguageEnum = LanguageEnum.EN) => {
    const fields = generalValidationFields(lang);
    return z.object({
        body: z.object({
        email: fields.email,
        password: fields.password,
        })

    })
}
export const sendEmailOtpSchema = (lang: LanguageEnum = LanguageEnum.EN) => {
    const fields = generalValidationFields(lang);
    return z.object({
        body: z.object({
        email: fields.email,
        })

    })
}
export const confirmEmailSchema = (lang: LanguageEnum = LanguageEnum.EN) => {
    const fields = generalValidationFields(lang);
    return z.object({
        body: z.object({
        email: fields.email,
        otp: fields.otp,
        })

    })
}
export const forgetPasswordSchema = (lang: LanguageEnum = LanguageEnum.EN) => {
    const fields = generalValidationFields(lang);
    return z.object({
        body: z.object({
        email: fields.email,
        })

    })
}
export const resetPasswordSchema = (lang: LanguageEnum = LanguageEnum.EN) => {
    const fields = generalValidationFields(lang);
    return z.object({
        body: z.object({
        email: fields.email,
        otp: fields.otp,
        newPassword: fields.newPassword,
        confirmPassword: fields.confirmPassword,
        }).superRefine(matchFields("newPassword", "confirmPassword", lang)),
    })
}
export const changePasswordSchema = (lang: LanguageEnum = LanguageEnum.EN) => {
    const fields = generalValidationFields(lang);
    return z.object({
        body: z.object({
        oldPassword: fields.password,
        newPassword: fields.newPassword,
        confirmPassword: fields.confirmPassword,
        }).superRefine(matchFields("newPassword", "confirmPassword", lang)),
    })
}