const express = require("express");
const apiRouter = require("./routes/api.router");
const authRouter = require("./routes/auth.router");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);
app.use("/auth", authRouter);

app.listen(8080, () => {
    console.log("✅ Server: http://localhost:8080");
})