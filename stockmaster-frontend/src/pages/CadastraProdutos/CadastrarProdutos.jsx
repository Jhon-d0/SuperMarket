import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CadastrarProdutos.css";

export default function CadastroProduto() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  async function salvarProduto() {
    if (!nome || !preco || !quantidade || !categoria) {
      setMensagem("⚠ Preencha todos os campos!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const produto = { nome, preco, quantidade, categoria };

    try {
      const response = await fetch("http://localhost:8080/produtos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(produto),
      });

      if (!response.ok) throw new Error("Erro ao cadastrar");

      setMensagem("✔ Produto cadastrado com sucesso!");

      setTimeout(() => navigate("/produtos"), 1500);
    } catch {
      setMensagem("❌ Erro ao cadastrar produto!");
    }
  }

  return (
    <div className="cadastro-produto-container">
      <div className="cadastro-produto-card">
        <h2>Cadastrar Produto</h2>

        <input type="text" placeholder="Nome do produto" value={nome} onChange={e => setNome(e.target.value)} />
        <input type="number" placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} />
        <input type="number" placeholder="Quantidade" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
        <input type="text" placeholder="Categoria" value={categoria} onChange={e => setCategoria(e.target.value)} />

        <button onClick={salvarProduto}>Salvar</button>

        <button className="voltar" onClick={() => navigate("/produtos")}>
          Voltar
        </button>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  );
}
