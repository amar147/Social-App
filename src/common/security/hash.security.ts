import bcrypt from 'bcrypt'
export const hash = async(plaintext : string ,round=12)=>{
    return await bcrypt.hash(plaintext,round)
}
export const compare = async(plaintext : string ,ciphertext : string)=>{
    return await bcrypt.compare(plaintext,ciphertext)
}