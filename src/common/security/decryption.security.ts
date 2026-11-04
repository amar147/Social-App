import crypto from "node:crypto";

export const decryption = (cipherText: string): string => {
  if (!cipherText || !cipherText.includes(":")) {
    throw new Error("Invalid cipher text format");
  }

  const [ivHex, encryptedDataHex] = cipherText.split(":");

  if (!ivHex || !encryptedDataHex) {
    throw new Error("Malformed cipher text components");
  }

  const key = Buffer.from(process.env.ENC_KEY || "", "utf-8");

  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

  let decrypted = decipher.update(encryptedDataHex, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};