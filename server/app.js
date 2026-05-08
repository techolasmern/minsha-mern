const express = require("express");
const apiRouter = require("./routes/api.router");
const authRouter = require("./routes/auth.router");
const session = require("express-session");
const otpRouter = require("./routes/otp.router");
const cors = require("cors");

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use(session({
    secret: "sdkjhfiuwreflksdnlf",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 5 // 5 min
    }
}));


app.use("/api", apiRouter);
app.use("/auth", authRouter);
app.use("/otp", otpRouter);

app.listen(8080, () => {
    console.log("✅ Server: http://localhost:8080");
})

// // cookie -> client side storage
// // session -> server side storage

// // express-session

// crypto, otp-generator

// const getOTP = (len = 6) => {
//     const string = "0123456789abcdef"
//     let k = 0;
//     let otp = "";
//     while (k < len) {
//         const randomIndex = Math.floor(Math.random() * string.length);
//         const randomChar = string[randomIndex];
//         otp += randomChar;
//         k++;
//     }
//     console.log(otp)
// }

// getOTP(4);

// // crypto
// const crypto = require("crypto");
// const otp = crypto.randomInt(1000, 9999);
// console.log(otp)

// // otp-generator
// const otpGenerator = require("otp-generator");
// const generated_otp = otpGenerator.generate(6, {
//     lowerCaseAlphabets: false,
//     upperCaseAlphabets: false,
//     specialChars: false,
// });
// console.log(generated_otp)
