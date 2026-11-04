import { LanguageEnum } from "../common/enum/security.enum"
import { BadRequestException } from "../common/exceptions"
import type {Response,Request ,NextFunction} from 'express'
import { SchemaType } from "../common/types"

export const Validation =(schema:SchemaType)=>{
    return (req:Request , res:Response , next:NextFunction )=>{

        // const lang:LanguageEnum = (req.headers['lang']) as string || LanguageEnum.EN


        const headerLang = req.headers['lang'] as string | undefined;
        const lang: LanguageEnum = 
            headerLang === LanguageEnum.AR ? LanguageEnum.AR : LanguageEnum.EN;
        const validationResult= schema(lang).safeParse({
            body : req.body,
            query: req.query,
            params: req.params
        })
        if (!validationResult.success) {
            throw new BadRequestException("Validation Error" , {cause:validationResult.error.issues })
        }
    req.validate= validationResult.data
    next()
    }

    
}