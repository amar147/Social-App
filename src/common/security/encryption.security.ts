import crypto from 'node:crypto';
import { ENC_KEY, IV_LENGTH } from '../../config';

export const encryption = async (plaintext: string) => {
    const iv = crypto.randomBytes(Number(IV_LENGTH));
    const cipher = crypto.createCipheriv('aes-256-cbc', ENC_KEY, iv);
    let encryptData = cipher.update(plaintext, "utf-8", "hex");
    encryptData += cipher.final("hex");
    console.log({ cipher, encryptData });
    return `${iv}::${encryptData}`;
};