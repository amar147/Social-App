import {Router  } from 'express'
import type { Request , Response ,NextFunction } from 'express'
import { ResponseFormatter, Validation } from '../../middleware'
import  AuthServices  from './auth.service'
import { changePasswordSchema, 
    confirmEmailSchema, 
    forgetPasswordSchema, 
    loginSchema, 
    resetPasswordSchema,
    sendEmailOtpSchema,
    signupSchema } from './auth.validation'
const router  =Router({strict:true , caseSensitive:true })

router.post('/signup',Validation(signupSchema) ,ResponseFormatter(
    async(
    req:Request ,
    res:Response ,
    next:NextFunction)=>{
        
        const data = await AuthServices.signup(req.body)
        return { data }
    }
))
router.post('/login',Validation(loginSchema) ,ResponseFormatter(
    async(
    req:Request ,
    res:Response ,
    next:NextFunction)=>{
        
        const data = await AuthServices.login(req.body)
        return { data }
    }
))
router.post('/forget-password',Validation(forgetPasswordSchema) ,ResponseFormatter(
    async(
    req:Request ,
    res:Response ,
    next:NextFunction)=>{
        
        const data = await AuthServices.forgetPassword(req.body)
        return { data }
    }
))
router.post('/change-password',Validation(changePasswordSchema) ,ResponseFormatter(
    async(
    req:Request ,
    res:Response ,
    next:NextFunction)=>{
        
        const data = await AuthServices.changePassword(req.body)
        return { data }
    }
))
router.post('/confirm-email',Validation(confirmEmailSchema) ,ResponseFormatter(
    async(
    req:Request ,
    res:Response ,
    next:NextFunction)=>{
        
        const data = await AuthServices.confirmEmail(req.body)
        return { data }
    }
))
router.post('/reset-password',Validation(resetPasswordSchema) ,ResponseFormatter(
    async(
    req:Request ,
    res:Response ,
    next:NextFunction)=>{
        
        const data = await AuthServices.resetPassword(req.body)
        return { data }
    }
))
router.post('/resend-otp',Validation(sendEmailOtpSchema) ,ResponseFormatter(
    async(
    req:Request ,
    res:Response ,
    next:NextFunction)=>{
        
        const data = await AuthServices.resendOtp(req.body)
        return { data }
    }
))
router.post('/send-otp',Validation(sendEmailOtpSchema) ,ResponseFormatter(
    async(
    req:Request ,
    res:Response ,
    next:NextFunction)=>{
        
        const data = await AuthServices.sendOtp(req.body)
        return { data }
    }
))
router.post('/logout', ResponseFormatter(
    async(
    req:Request ,
    res:Response ,
    next:NextFunction)=>{
        
        const data = await AuthServices.logout(req.body)
        return { data }
    }
))






export default router