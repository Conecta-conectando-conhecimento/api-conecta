"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
mail_1.default.setApiKey(process.env.SENDGRID_API_KEY);
const sendEmail = async (email, title, content) => {
    const msg = {
        to: email,
        from: process.env.EMAIL_FROM,
        subject: title,
        html: content,
    };
    let status;
    let message;
    await mail_1.default.send(msg)
        .then(() => {
        console.log('Email sent');
        status = true;
        message = 'Email enviado com sucesso';
    })
        .catch((error) => {
        console.error(error);
        status = false;
        message = 'Falha ao enviar o email';
    });
    return { status, message };
};
exports.sendEmail = sendEmail;
