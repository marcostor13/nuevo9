"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'marcostor13@gmail.com',
        pass: 'bpoheocqnjsyksdm'
    },
    tls: {
        rejectUnauthorized: false
    }
});
function sendEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { dest, fromname, from, subject, type, data } = req.body;
        const mailOptions = {
            from: `${fromname} <${from}>`,
            to: dest,
            subject: subject,
            html: getHtml(type, data)
        };
        return transporter.sendMail(mailOptions, (erro, info) => {
            if (erro) {
                return handleError(res, erro.toString());
            }
            return res.status(200).send({ message: 'Mensaje enviado', data: null });
        });
    });
}
exports.sendEmail = sendEmail;
function getHtml(type, data) {
    let text = '';
    for (const key in data) {
        const element = data[key];
        text += `<li><label style="min-width: 250px; text-transform: capitalize;">${key}</label> : ${element}</li>`;
    }
    switch (type) {
        case '1':
            return `
                <div style="display: flex; align-items:center">
                    <img src="http://binteraction.cl/images/logo01.png", width="40px">
                    <span style="margin-left: 10px; margin-top: 4px; color:#0245a3; font-weight: 700; font-size: 16pt">BINTERACTION</span>
                </div>
                <h4 style="margin-top: 10px; color:#0245a3>Mensaje de administración Binteraction Chile</h4><br>
                <p style="margin-top: 10px; color:#0245a3>Tiene un formulario nuevo<p>
                <h3 style="margin-top: 10px">Datos</h3>
                <ul>
                    ${text}                             
                </ul>    
                `;
        default:
            return 'Error en el mensaje, por favor contáctenos';
    }
}
function handleError(res, err) {
    return res.status(500).send({ message: `${err}` });
}
//# sourceMappingURL=email.controller.js.map