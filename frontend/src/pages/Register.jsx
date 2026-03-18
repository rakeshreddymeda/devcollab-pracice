import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

import API from "../services/api";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await API.post("/auth/register", {name, email, password});
            alert("Registration Successful!");
            navigate("/");
        } catch (err) {
            alert("User Registration Failed:", err.message);
        }
    }

    return (
        <div style={{padding: "40px"}}>
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <input type="text" value={name} placeholder="Enter Full Name" onChange={(e) => setName(e.targer.value)} />
                </div>
                <div>
                    <input type="email" value={email} placeholder="Email Adress" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
            <hr />
            <p>Already has account? <Link to="/">Log in</Link></p>
        </div>
    )
}

export default Register;
