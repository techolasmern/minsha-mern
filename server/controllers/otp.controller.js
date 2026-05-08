const sendEmailOtp = require("../services/nodemailer.service");

const send = async (request, response) => {
    try {
        const { email } = request.body;
        if (!email) {
            return response.status(400).send({ message: "receiver email is required" });
        }
        const mailResponse = await sendEmailOtp(email);
        if (!mailResponse) {
            return response.status(400).send({ message: "failed to send otp" });
        }
        const cooldown_time = Math.floor(Date.now() / 1000) + 60;
        request.session[email] = { otp: mailResponse.otp, cooldown_time };
        return response.status(200).send({ message: "otp sent successfully", otp: mailResponse.otp });
    } catch (err) {
        return response.status(500).send({ error: err.message || "Internal server error"});
    }
}

const verify = async (request, response) => {
    try {
        const { email, otp } = request.body;
        if(!email || !otp) {
            return response.status(400).send({ message: "Email and otp are required" });
        }
        const session = request.session;
        console.log(session);
        if (!session?.[email]) {
            return response.status(400).send({ message: "Expired otp" });
        }
        const { otp: session_otp } = session[email]; 
        if (otp != session_otp) {
            return response.status(400).send({ message: "Invalid otp" });
        }
        return response.status(200).send({ message: "otp verified successfully" });
    } catch (err) {
        return response.status(500).send({ error: err.message || "Internal server error"});
    }
}

const resend = async (request, response) => {
    try {
        const { email }= request.body;
        if (!email) {
            return response.status(400).send({ message: "Email is required" });
        }
        const session = request.session;
        if (session?.[email]) {
            const { cooldown_time } = session[email];
            const current_time = Math.floor(Date.now() / 1000);
            if (current_time < cooldown_time) {
                const time_remaining = cooldown_time - current_time;
                return response.status(400).send({ message: `Please wait ${time_remaining} seconds to resend otp` });
            }
        }
        return send(request, response);
    } catch (err) {
        return response.status(500).send({ error: err.message || "Internal server error"});
    }
}


module.exports = { send, verify, resend }
