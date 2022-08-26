import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  
  const onClick = () => navigate("/settings");

  return (
    <section>
      <h1>Home</h1>

      <button onClick={ onClick }>Ir para settings</button>
    </section>
  );
}
