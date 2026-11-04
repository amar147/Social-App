"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hash = async (plaintext, round = 12) => {
    return await bcrypt_1.default.hash(plaintext, round);
};
exports.hash = hash;
const compare = async (plaintext, ciphertext) => {
    return await bcrypt_1.default.compare(plaintext, ciphertext);
};
exports.compare = compare;
