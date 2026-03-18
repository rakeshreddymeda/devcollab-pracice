import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", { email, password });
            localStorage.setItem("token", res.data.token);
            navigate("/dashboard");
        } catch (err) {
            alert("Login failed:", err.message);
        }
    }

    return (
        <div style={{padding: "40px"}}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <br />
                <div>
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;
