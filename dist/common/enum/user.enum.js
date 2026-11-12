"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccStatusEnum = exports.GenderEnum = void 0;
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "male";
    GenderEnum["FEMALE"] = "female";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));
var AccStatusEnum;
(function (AccStatusEnum) {
    AccStatusEnum[AccStatusEnum["ARCHIVE"] = 0] = "ARCHIVE";
    AccStatusEnum[AccStatusEnum["ACTIVE"] = 1] = "ACTIVE";
})(AccStatusEnum || (exports.AccStatusEnum = AccStatusEnum = {}));
