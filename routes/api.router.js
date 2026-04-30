const { Router } = require("express");
const apiController = require("../controllers/api.controller");
const authController = require("../controllers/auth.controller");

const apiRouter = Router();

apiRouter.post("/password/create-hash", apiController.createPasswordHash);
apiRouter.post("/password/compare", apiController.comparePassword);

apiRouter.get("/users", authController.get_users);

module.exports = apiRouter;