const bcrypt = require("bcrypt");
const sendEmail = require("../services/nodemailer.service");

const createPasswordHash = async (request, response) => {
    try {
        const { password } = request.body;
        if (!password) {
            return response.status(400).send({ message: "Password is required" });
        }
        // const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, 10);
        return response.status(200).send({ hash });
    } catch (err) {
        return response.status(500).send({ message: err.message || "Internal server error" });
    }
}

const comparePassword = async (request, response) => {
    try {
        const { password, hash } = request.body;
        if (!password || !hash) {
            return response.status(400).send({ message: "Password and hash are required" });
        }
        const isMatch = await bcrypt.compare(password, hash);
        return response.status(200).send({ isMatch });
    } catch (err) {
        return response.status(500).send({ message: err.message || "Internal server error" });
    }
}

const mailer = async (request, response) => {
    try {
        const { to } = request.body;
        if (!to) {
            return response.status(400).send({ message: "receiver email is required" });
        }
        const res = await sendEmail(to);
        return response.status(200).send({ message: "email sent successfully", res });
    } catch (err) {
        return response.status(500).send({ message: err.message || "Internal server error" });
    }
}

module.exports = { createPasswordHash, comparePassword, mailer };

// 500, 200, 404, 201, 400, 409, 401, 403, 503, 425
// 500 -> internal server error
// 200 -> success
// 404 -> not found
// 201 -> created
// 400 -> bad request
// 409 -> conflict
// 401 -> unauthorized
// 403 -> forbidden
// 503 -> service unavailable
// 425 -> method not allowed