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

const sendResetPasswordMail = async ({ dest, url, duree }) => {
    const mailOptions = {
        from: "support@makesense.org",
        to: dest,
        subject: "Changement de mot de passe : ",
        text: `Bonjour, \nCliquez sur ce lien pour changer votre mot de passe : \n${url} (Vous avez ${duree} pour changer le mot de passe.) \nCordialment\nLe Support Makesense,`,
        html: `Bonjour,<br/>Cliquez sur ce lien pour changer votre mot de passe :<br><a href=${url}>Modification du mot de passe</a> <p>(Vous avez ${duree} pour changer le mot de passe.)</p><br>Cordialment,<br>Le Support Makesense`,
    };
    return transporter.sendMail(mailOptions);
};

const createAccountMail = async ({ email, password }) => {
    const mailOptions = {
        from: "support@makesense.org",
        to: email,
        subject: "Votre compte Makesense : ",
        text: `Bonjour, \nLes informations de connexion de votre compte makesense : \nE-mail : ${email}\nMot de passe : ${password} \nCordialment,\nLe Support Makesense,`,
        html: `Bonjour,<br/>Les informations de connexion de votre compte makesense :<br>E-mail : ${email}<br>Mot de passe : ${password}<br>Cordialment,<br>Le Support Makesense`,
    };
    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendResetPasswordMail,
    createAccountMail,
}