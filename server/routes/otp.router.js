const { Router } = require("express");
const otpController = require("../controllers/otp.controller");

const otpRouter = Router();

otpRouter.post("/send", otpController.send);
otpRouter.post("/verify", otpController.verify);
otpRouter.post("/resend", otpController.resend);

module.exports = otpRouter;