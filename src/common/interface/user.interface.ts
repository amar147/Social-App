import { GenderEnum, ProviderEnum,RoleEnum } from "../enum";

export interface IUser {
    firstName: string;
    lastName: string;
    username?: string;
    email: string;
    password: string;
    gender: GenderEnum;
    role: RoleEnum;
    provider: ProviderEnum;
    phone?: string;
    DOB?: string;
    confirmEmail?: Date;
    image?: string;
    coverImage?: string[];
    changeCredentials?: Date;
    createdAt?: string;
    updated?:string;
}