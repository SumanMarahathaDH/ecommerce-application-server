import fs from 'fs';
import path from 'path'
import nodemailer from 'nodemailer'
import handlebars from 'handlebars';

export const sendEmail = async (userEmail, subject, payload, template) => {
    const host = process.env.EMAIL_HOST
    const port = process.env.EMAIL_PORT
    const username = process.env.EMAIL_USER
    const password = process.env.EMAIL_PASSWORD
    const __dirname = path.resolve()
    try{
        const transporter = nodemailer.createTransport({
            host,
            port,
            auth: {
                user: username,
                pass: password
            }
        })
        const source = fs.readFileSync(path.join(__dirname, template), "utf-8")
        const compiledTemplate = handlebars.compile(source)
        const options = () => {
            return {
                from: username,
                to: userEmail,
                subject: subject,
                html: compiledTemplate(payload)
            }
        }
        transporter.sendMail(options(), (error, info) => {
            if(error){
                console.log(error)
            }
            else {
                console.log(info.response)
            }
        })
    }
    catch(error){
        console.log(error)
        return error
    }
}