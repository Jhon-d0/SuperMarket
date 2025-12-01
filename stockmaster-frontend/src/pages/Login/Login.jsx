import { useState } from "react";
import api from "../../services/api";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

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

      localStorage.setItem("token", response.data);

      // ALERTA MODERNO
      Swal.fire({
        title: "Login bem-sucedido!",
        text: "Bem-vindo ao StockMaster!",
        icon: "success",
        confirmButtonColor: "#ff6f00",
        background: "#fff8e1",
      }).then(() => {
        navigate("/produtos");
      });
      
    } catch {
      Swal.fire({
        title: "Erro!",
        text: "Credenciais inválidas!",
        icon: "error",
        confirmButtonColor: "#d32f2f",
      });
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        
        <h1 className="logo">
          Stock<span>Master</span>
        </h1>

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

        <p className="signup-text">
          Não tem conta?{" "}
          <span onClick={() => navigate("/cadastro")}>Cadastre-se</span>
        </p>
      </div>
    </div>
  );
}
