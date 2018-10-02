module.exports = function(to, subject, text){
    const mailer = require("nodemailer")
    //usando SMTP para envio
    const smtpTransport = mailer.createTransport({
        host: process.env.SMTP_SERVER,
        port: parseInt(process.env.SMTP_PORT),
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    })

    const message = {
        from: process.env.SMTP_USERNAME,
        to,
        subject,
        text,
        //html: "<b>Olá mundo!</b>" //opcional
    }

    smtpTransport.sendMail(message, function(error, response){
        if(error) 
            console.log(error)
        else
            console.log("Email enviado: " + response.message);
        smtpTransport.close();
    })

}