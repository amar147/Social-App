// import { ApplicationExceptions } from "../../common/exceptions";

import { ChangePasswordDto, ConfirmEmailDto, ForgetPasswordDto, LoginDto, ResetPasswordDto, SendEmailOtpDto, SignupDto } from "./auth.dto"
import { ConflictException } from "../../common/exceptions"
import { UserRepository } from "../../common/repository"
import { ProviderEnum } from "../../common/enum";
import { compare, TokenSecurity  } from "../../common/security";
import { CacheService } from "../../common/services";



export class AuthServices{
    private UserRepository:UserRepository
    private CacheService:CacheService
    private TokenSecurity:TokenSecurity
    constructor(){
        this.UserRepository = new UserRepository();
        this.CacheService = new CacheService();
        this.TokenSecurity = new TokenSecurity();
    }
    async signup({username , email ,password , phone}:SignupDto){
        const user = await this.UserRepository.findOne({email})
        if(user) throw new ConflictException('Email already exists')
        const acc = await this.UserRepository.create({
    username , 
    email ,
    password:(password) , 
    phone:(phone) ,
    provider:ProviderEnum.SYSTEM
})

        return acc
    }
    async login({email , password}:LoginDto){  
        const account =  await this.UserRepository.findOne({
            filter:{
                email,
                provider:ProviderEnum.SYSTEM,
                confirmEmail:{ $exists: true },
                password
            }
        })
        if(!account) throw new ConflictException('Email not found or not confirmed')
            const match = await compare(password,  account.password)
        if(!match) throw new ConflictException('Password is incorrect')

        return  this.TokenSecurity.createLoginCredentials({user:account})
    }
    forgetPassword(data:ForgetPasswordDto){        
        return data
    }
    changePassword(data:ChangePasswordDto){        
        return data
    }
    confirmEmail(data:ConfirmEmailDto){        
        return data
    }
    resetPassword(data:ResetPasswordDto){        
        return data
    }
    sendOtp(data:SendEmailOtpDto){        
        return data
    }
    resendOtp(data:SendEmailOtpDto){        
        return data
    }
    logout(data:any){        
        return data
    }

}

export default new AuthServices()