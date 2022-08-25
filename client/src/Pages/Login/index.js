import { useState } from "react";
import "./style.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function signIn() {
        let item = { email, password };
        let result = await fetch("http://localhost:7002/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });

        let data = await result.json();

        console.log(data);

        localStorage.setItem("Authorization", data.user.token);
    }

    return (
        <div className="text-white d-flex align-items-center flex-column vh-100 justify-content-center">
            <div className="glass-effect">
                <header className="d-flex align-items-center flex-column fs-1 fw-bolder mb-4">
                    <h1>Login</h1>
                </header>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="visually-hidden">Email</label>
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="inputPassword"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="visually-hidden">Password</label>
                </div>

                <div className="mb-3">
                    <input type="checkbox" value="rememberMe" /> Remember me
                </div>

                <button className="btn btn-success" onClick={signIn}>
                    Sign in
                </button>
                <button className="btn btn-danger">Sign up</button>
            </div>
        </div>
    );
}
