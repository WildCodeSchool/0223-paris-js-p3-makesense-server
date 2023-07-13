const mailer = require("nodemailer");

const transporter = mailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

const sendResetPasswordMail = async ({ dest, url }) => {
    const mailOptions = {
        from: "support@makesense.org",
        to: dest,
        subject: "Changement de mot de passe : ",
        text: `Cliquez sur ce lien pour changer votre mot de passe : ${url}`,
        html: `<p>Cliquez sur ce lien pour changer votre mot de passe : <a href=${url}>Modification du mot de passe</a>`,
    };
    return transporter.sendMail(mailOptions);
};

const createAccountMail = async ({ email, password }) => {
    const mailOptions = {
        from: "support@makesense.org",
        to: email,
        subject: "Votre compte Makesense : ",
        text: `Les informations de connexion de votre compte makesense : \n E-mail : ${email} \n Mot de passe : ${password}`,
        html: `<p>Les informations de connexion de votre compte makesense : </br> E-mail : ${email} </br> Mot de passe : ${password}</p>`,
    };
    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendResetPasswordMail,
    createAccountMail,
}