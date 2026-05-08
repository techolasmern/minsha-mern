const nodemailer = require("nodemailer");
const env = require("./env.config");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.GMAIL_USER, // email address
        pass: env.GMAIL_PASS, // app password
    }
});

module.exports = transporter;