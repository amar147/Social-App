import { z } from 'zod'
import { changePasswordSchema, 
    confirmEmailSchema, 
    forgetPasswordSchema, 
    loginSchema, 
    resetPasswordSchema, 
    sendEmailOtpSchema, 
    signupSchema } from './auth.validation';


export type SignupDto = z.infer<ReturnType<typeof signupSchema>>["body"];
export type LoginDto = z.infer<ReturnType<typeof loginSchema>>["body"];
export type SendEmailOtpDto = z.infer<ReturnType<typeof sendEmailOtpSchema>>["body"];
export type ConfirmEmailDto = z.infer<ReturnType<typeof confirmEmailSchema>>["body"];
export type ForgetPasswordDto = z.infer<ReturnType<typeof forgetPasswordSchema >>["body"];
export type ResetPasswordDto = z.infer<ReturnType<typeof resetPasswordSchema>>["body"];
export type ChangePasswordDto = z.infer<ReturnType<typeof changePasswordSchema>>["body"];