import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./Cadastro.css";

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  async function registrar() {
    if (!nome || !email || !senha) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/cadastro", {
        nome,
        email,
        senha,
      });

      setMensagem("Usuário cadastrado com sucesso!");

      setTimeout(() => {
        navigate("/");
      }, 1500); // espera antes de voltar pro login
    } catch {
      setMensagem("Erro ao cadastrar usuário");
    }
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h2>Cadastro de Usuário</h2>

        <input
          type="text"
          placeholder="Nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <button onClick={registrar}>Cadastrar</button>

        {mensagem && <p className="cadastro-msg">{mensagem}</p>}
      </div>
    </div>
  );
}
