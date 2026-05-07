const sendEmailOtp = require("../services/nodemailer.service");

const send = async (request, response) => {
    try {
        const { to } = request.body;
        if (!to) {
            return response.status(400).send({ message: "receiver email is required" });
        }
        const mailResponse = await sendEmailOtp(to);
        if (!mailResponse) {
            return response.status(400).send({ message: "failed to send otp" });
        }
        request.session[to] = { otp: mailResponse.otp };
        return response.status(200).send({ message: "otp sent successfully" });
    } catch (err) {
        return response.status(500).send({ error: err.message || "Internal server error"});
    }
}

module.exports = { send }