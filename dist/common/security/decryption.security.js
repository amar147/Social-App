"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryption = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const decryption = (cipherText) => {
    if (!cipherText || !cipherText.includes(":")) {
        throw new Error("Invalid cipher text format");
    }
    const [ivHex, encryptedDataHex] = cipherText.split(":");
    if (!ivHex || !encryptedDataHex) {
        throw new Error("Malformed cipher text components");
    }
    const key = Buffer.from(process.env.ENC_KEY || "", "utf-8");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = node_crypto_1.default.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedDataHex, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};
exports.decryption = decryption;
