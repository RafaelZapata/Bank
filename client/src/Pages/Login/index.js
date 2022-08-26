import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "context";
import { useNavigate } from "react-router-dom";
import { auth } from "utilities/api/system";
import { Container, Card, Input, Title, Button } from "./styles";

export default function Login() {
    const [email, setEmail] = useState("banana@gmail.com");
    const [password, setPassword] = useState("bananao");
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
      const isValidUser = user?.token?.length > 0;

      if (window.location.pathname === "/login" && isValidUser)
        navigate("/");
    }, []);

    const onSubmit = async (e) => {
      e.preventDefault();

      const data = await auth({ email, password });
      console.log(data);

      if (data?.status !== true)
        return alert("Credenciais inválidas");

      dispatch({ type: "SET_USER", payload: data.user });
      localStorage.setItem("Authorization", data.user.token);

      navigate("/");
    };

    return (
        <Container>
            <Card onSubmit={onSubmit}>
                <Title>Login</Title>
                <Input
                    value={ email }
                    placeholder="Email"
                    type="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <Input
                    value={ password }
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
