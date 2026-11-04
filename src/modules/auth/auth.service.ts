// import { ApplicationExceptions } from "../../common/exceptions";

import { ChangePasswordDto, ConfirmEmailDto, ForgetPasswordDto, LoginDto, ResetPasswordDto, SendEmailOtpDto, SignupDto } from "./auth.dto"
import { ConflictException } from "../../common/exceptions"
import { UserRepository } from "../../common/repository"



export class AuthServices{
    private UserRepository:UserRepository
    constructor(){
        this.UserRepository = new UserRepository();
    }
    async signup({username , email ,password , phone}:SignupDto){
        const user = await this.UserRepository.findOne({email})
        if(user) throw new ConflictException('Email already exists')
        const acc = await this.UserRepository.create({username , email ,password , phone})
        return acc
    }
    login(data:LoginDto){        
        return data
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