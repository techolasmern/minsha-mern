import { useState } from "react";
import api from "./lib/axios";

const App = () => {

    const [email, setEmail] = useState("");
    const [otp, setOTP] = useState("");

    const sendOTP = async () => {
        try {
            const res = await api.post("/otp/send", { email });
            console.log(res);
        } catch (e) {
            console.log(e.response);
            return console.log(e);
        }
    }

    const verifyOTP = async () => {
        try {
            console.log(email, otp);
            const res = await api.post("/otp/verify", { email, otp });
            console.log(res);
        } catch (e) {
            console.log(e.response);
            return console.log(e);
        }
    }

    return <div>
        <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/><button onClick={sendOTP}>Send OTP</button>
        <input type="text" name="otp" value={otp} onChange={(e) => setOTP(e.target.value)}/> <button onClick={verifyOTP}>Verify OTP</button>
    </div>
}

export default App;