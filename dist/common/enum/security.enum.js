"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderEnum = exports.RoleEnum = exports.LanguageEnum = void 0;
var LanguageEnum;
(function (LanguageEnum) {
    LanguageEnum["EN"] = "en";
    LanguageEnum["AR"] = "ar";
})(LanguageEnum || (exports.LanguageEnum = LanguageEnum = {}));
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["ADMIN"] = "admin";
    RoleEnum["USER"] = "user";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
var ProviderEnum;
(function (ProviderEnum) {
    ProviderEnum["GOOGLE"] = "google";
    ProviderEnum["SYSTEM"] = "system";
})(ProviderEnum || (exports.ProviderEnum = ProviderEnum = {}));
