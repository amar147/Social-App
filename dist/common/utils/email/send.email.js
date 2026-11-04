"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.transporter = exports.UserEmailKey = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../../config");
const exceptions_1 = require("../../exceptions");
const UserEmailKey = ({ email, subject }) => {
    return `User::${email}::${subject}::OTP`;
};
exports.UserEmailKey = UserEmailKey;
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: config_1.APP_EMAIL,
        pass: config_1.APP_PASSWORD
    }
});
const sendEmail = async ({ to, subject, html, text, cc, bcc, attachments = [] }) => {
    if (!to?.length && !cc?.length && !bcc?.length) {
        throw new exceptions_1.BadRequestException("At least one recipient (to, cc, bcc) is required to send an email.");
    }
    if (!subject?.length && !text?.length && !attachments?.length && !html?.length) {
        throw new exceptions_1.BadRequestException("At least one of subject, text, or html is required to send an email.");
    }
    try {
        const info = await exports.transporter.sendMail({
            from: `"${config_1.APP_NAME}" <${config_1.APP_EMAIL}>  `,
            to,
            cc,
            bcc,
            subject,
            text,
            html,
            attachments
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer_1.default.getTestMessageUrl(info));
    }
    catch (err) {
        console.error("Error while sending mail:", err);
    }
};
exports.sendEmail = sendEmail;
