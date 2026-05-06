const { Router } = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/signup", authController.userRegistration);
authRouter.post("/login", authController.userLogin);
authRouter.get("/session", authController.getUserSession);

module.exports = authRouter;