import nodemailer from "nodemailer";
import { APP_EMAIL, APP_NAME, APP_PASSWORD } from "../../../config";
import { BadRequestException } from "../../exceptions";

export const UserEmailKey=({email , subject}:
    {email:string , subject:string}
)=>{
    return `User::${email}::${subject}::OTP` 
}
//connect to email service
export const transporter =nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: APP_EMAIL,
        pass: APP_PASSWORD
    }
})

export const sendEmail = async ({
    to,
    subject,
    html,
    text,
    cc,
    bcc,
    attachments=[]
}:{
    to? :string | string[],
    subject?: string,
    html?: string,
    text?: string,
    cc?: string[],
    bcc?: string[],
    attachments?: []

}) => {
    if(!to?.length && !cc?.length && !bcc?.length){
        throw new BadRequestException("At least one recipient (to, cc, bcc) is required to send an email.");
    }
    if(!subject?.length && !text?.length &&!attachments?.length && !html?.length){
        throw new BadRequestException("At least one of subject, text, or html is required to send an email.");
    }

    try {
        const info = await transporter.sendMail({
        from: `"${APP_NAME}" <${APP_EMAIL}>  `, // sender address
        to, // list of recipients
        cc,
        bcc,
        subject, // subject line
        text, // plain text body
        html, // HTML body
        attachments
});
    console.log("Message sent: %s", info.messageId);
    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
} catch (err) {
    console.error("Error while sending mail:", err);
}
}