"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
const security_enum_1 = require("../common/enum/security.enum");
const exceptions_1 = require("../common/exceptions");
const Validation = (schema) => {
    return (req, res, next) => {
        const headerLang = req.headers['lang'];
        const lang = headerLang === security_enum_1.LanguageEnum.AR ? security_enum_1.LanguageEnum.AR : security_enum_1.LanguageEnum.EN;
        const validationResult = schema(lang).safeParse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        if (!validationResult.success) {
            throw new exceptions_1.BadRequestException("Validation Error", { cause: validationResult.error.issues });
        }
        req.validate = validationResult.data;
        next();
    };
};
exports.Validation = Validation;
