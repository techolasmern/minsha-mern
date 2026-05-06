const express = require("express");
const apiRouter = require("./routes/api.router");
const authRouter = require("./routes/auth.router");
const session = require("express-session");

const app = express();
app.use(session({
    secret: "sdkjhfiuwreflksdnlf",
    cookie: {
        maxAge: 1000 * 60 // 1 min
    }
}));
app.use(express.json());

app.use("/api", apiRouter);
app.use("/auth", authRouter);

app.listen(8080, () => {
    console.log("✅ Server: http://localhost:8080");
})

// cookie -> client side storage
// session -> server side storage

// express-session