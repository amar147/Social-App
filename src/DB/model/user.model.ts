import mongoose from "mongoose";
import type { HydratedDocument } from "mongoose";
import { GenderEnum, ProviderEnum, RoleEnum } from "../../common/enum";
import { IUser } from "../../common/interface";

const userSchema= new mongoose.Schema<IUser>({

    firstName:{
        type:String,

    },
    lastName:{
        type:String,

    },
    email:{
        type:String,
        unique:true,

    },
    password:{
        type:String,  
        required:function(this: IUser):boolean{
            return this.provider === ProviderEnum.SYSTEM;
        }

    },
    phone:{
        type:String,        
    },
    DOB:Date,
    confirmEmail:Date,
    image:String,
    coverImage:[String], //scroll
    gender:{
        type: String,
        enum:Object.values(GenderEnum),
        default:GenderEnum.MALE
    },
    role:{
        type: String,
        enum:Object.values(RoleEnum),
        default:RoleEnum.USER
    },
    provider:{
        type: String,
        enum:Object.values(ProviderEnum),
        default: ProviderEnum.SYSTEM
    }



},{
    timestamps:true,
    toObject:{virtuals:true},
    toJSON:{virtuals:true},
    strict:true, //mfi4 7aga mn bra el schema
    strictQuery:true,
    autoIndex:true


})
userSchema.virtual('username')
  .set(function (this: IUser, value: string) {
    if (!value) return;
    const parts = value.trim().split(/\s+/);
    this.firstName = parts[0] || '';
    this.lastName = parts.slice(1).join(' ');
  })
  .get(function (this: IUser) {
    return `${this.firstName || ''} ${this.lastName || ''}`.trim();
  });

export const UserModel = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', userSchema);
export type HUser=HydratedDocument<IUser>;