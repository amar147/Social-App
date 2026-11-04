import { LanguageEnum } from "../enum/security.enum";
import { ZodType } from "zod";

export type SchemaType= (lang:LanguageEnum) =>ZodType