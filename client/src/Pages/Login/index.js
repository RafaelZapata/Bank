import { useState } from "react";
import { Container, Card, Input, Title, Button } from "./styles";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        let item = { email, password };
        let result = await fetch("http://localhost:7002/auth", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
        });

        let data = await result.json();

        localStorage.setItem("Authorization", data.user.token);
        console.log(data);
    };

    //add redux

    return (
        <Container>
            <Card onSubmit={onSubmit}>
                <Title>Login</Title>
                <Input
                    placeholder="Email"
                    type="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <Input
                    placeholder="Senha"
                    type="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <Button type="submit">Entrar</Button>
            </Card>
        </Container>
    );
}
