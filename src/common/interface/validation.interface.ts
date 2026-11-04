// import { Request } from "express";


// export interface IValidation extends Request {
//     validate:object;
// }




////  3mlt search 3lyha
import "express";

declare module "express" {
  export interface Request {
    validate?: any; 
  }
}