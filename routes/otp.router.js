const { Router } = require("express");
const otpController = require("../controllers/otp.controller");

const otpRouter = Router();

otpRouter.post("/send", otpController.send);

module.exports = otpRouter;