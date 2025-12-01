import { useState } from "react";
import api from "../../services/api";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await api.post("/auth/login", {
        email,
        senha,
      });

      // salva o token
      localStorage.setItem("token", response.data);

      alert("Login realizado com sucesso!");

      // redireciona para /produtos
      navigate("/produtos");
    } catch {
      alert("Credenciais inválidas!");
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>StockMaster</h1>

        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button onClick={handleLogin}>Entrar</button>
      </div>
    </div>
  );
}
