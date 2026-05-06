const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mail@gmail.com", // email address
        pass: "app-password" // app password
    }
});

module.exports = transporter;