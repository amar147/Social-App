"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryption = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const config_1 = require("../../config");
const encryption = async (plaintext) => {
    const iv = node_crypto_1.default.randomBytes(Number(config_1.IV_LENGTH));
    const key = Buffer.from(config_1.ENC_KEY, 'hex');
    const cipher = node_crypto_1.default.createCipheriv('aes-256-cbc', key, iv);
    let encryptData = cipher.update(plaintext, "utf-8", "hex");
    encryptData += cipher.final("hex");
    return `${iv.toString('hex')}::${encryptData}`;
};
exports.encryption = encryption;
