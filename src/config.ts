import { config } from "dotenv";
import { resolve} from "path";

export const NODE_ENV = process.env.NODE_ENV || "dev";
config({path:resolve(`.env.${NODE_ENV}`) })    


export const PORT : number = Number(process.env.PORT) || 3000; 
export const DB_URI : string = process.env.DB_URI || "";
export const REDIS_URI : string = process.env.REDIS_URI || "";

export const ENC_KEY : string = process.env.ENC_KEY || "";
export const IV_LENGTH : number = Number(process.env.IV_LENGTH) || 16;  

export const APP_NAME : string = process.env.APP_NAME || "";
export const APP_PASSWORD : string = process.env.APP_PASSWORD || "";
export const APP_EMAIL : string = process.env.APP_EMAIL || "";


export const ACCESS_TOKEN_USER_SECRET : string = process.env.ACCESS_TOKEN_USER_SECRET || "" as string;
export const ACCESS_TOKEN_ADMIN_SECRET : string = process.env.ACCESS_TOKEN_ADMIN_SECRET || "" as string;

export const REFRESH_TOKEN_USER_SECRET : string = process.env.REFRESH_TOKEN_USER_SECRET || "" as string;
export const REFRESH_TOKEN_ADMIN_SECRET : string = process.env.REFRESH_TOKEN_ADMIN_SECRET || "" as string;


export const ACCESS_TOKEN_EXPIRES_IN : number = Number(process.env.ACCESS_TOKEN_EXPIRES_IN) || 1800;  
export const REFRESH_TOKEN_EXPIRES_IN : number = Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 86400 * 365;  
