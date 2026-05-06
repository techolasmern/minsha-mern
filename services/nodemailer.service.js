const transporter = require("../config/nodemailer.config");

const mailingOptions = {
    from: "mail@gmail.com",
    subject: "Hello World",
    text: "Hello World!"
}

const sendEmail = (to) => {
    mailingOptions.to = to;
    const res = transporter.sendMail(mailingOptions);
    return res;
}

module.exports = sendEmail;
