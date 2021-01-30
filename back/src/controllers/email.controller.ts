import { Request, Response } from "express";

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
})

export async function sendEmail(req: Request, res: Response) {

    const { dest, fromname, from, subject, type, data } = req.body

    const mailOptions = {
        from: `${fromname} <${from}>`,
        to: dest,
        subject: subject,
        html: getHtml(type, data)
    };

    return transporter.sendMail(mailOptions, (erro: any, info: any) => {
        if (erro) {
            return handleError(res, erro.toString())
        }
        return res.status(200).send({ message: 'Mensaje enviado', data: null });
    });

}

function getHtml(type: any, data: any) { 
    let text = ''

    for (const key in data) {    
        
        const element = data[key]; 
        text += `<li><label style="min-width: 250px; text-transform: capitalize;">${key}</label> : ${element}</li>`
        
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
                `
        default:
            return 'Error en el mensaje, por favor contáctenos'

    }

}


function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err}` });
}
