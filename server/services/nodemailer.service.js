const env = require("../config/env.config");
const transporter = require("../config/nodemailer.config");
const { generate: generateOTP } = require("otp-generator");

const sendEmailOtp = async (to) => {
    try {
        const otp = generateOTP(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        })
        const mailingOptions = {
            from: env.GMAIL_USER,
            subject: "Email Verification",
            to,
            html: `<b>You have received a verification code: <code>${otp}</code></b>`
        }
        const response = await transporter.sendMail(mailingOptions);
        return { message_id: response.messageId, otp };
    } catch (err) {
        return null;
    }
}

module.exports = sendEmailOtp;
