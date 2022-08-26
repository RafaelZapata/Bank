import { useEffect } from "react";
import { useSelector, useDispatch } from "context";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch({ type: "RESET" });
    navigate("/login");
  }

  if (user === null)
    return "Aguarde...";

  return (
    <section>
      <h1>{ user.name }</h1>
      <h2>{ user.email}</h2>
      <h3>R$ { user.balance}</h3>
      <button onClick={ onClick }>Logout - Sair do Sistema</button>
    </section>
  )
}
