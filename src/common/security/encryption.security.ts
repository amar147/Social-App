import crypto from 'node:crypto';
import { ENC_KEY, IV_LENGTH } from '../../config';

export const encryption = async (plaintext: string) => {
    const iv = crypto.randomBytes(Number(IV_LENGTH));
    const key = Buffer.from(ENC_KEY as string, 'hex'); 
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encryptData = cipher.update(plaintext, "utf-8", "hex");
    encryptData += cipher.final("hex");
    return `${iv.toString('hex')}::${encryptData}`;
};