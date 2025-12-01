import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./CadastrarProdutos.css";

export default function CadastroProduto() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoria, setCategoria] = useState("");
  const navigate = useNavigate();

  async function salvarProduto() {
    if (!nome || !preco || !quantidade || !categoria) {
      Swal.fire({
        icon: "warning",
        title: "Atenção!",
        text: "Preencha todos os campos!",
        confirmButtonColor: "#ff6f00"
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

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

      if (!response.ok) throw new Error();

      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Produto cadastrado com sucesso!",
        confirmButtonColor: "#ff6f00"
      }).then(() => navigate("/produtos"));

    } catch {
      Swal.fire({
        icon: "error",
        title: "Erro!",
        text: "Não foi possível cadastrar o produto",
        confirmButtonColor: "#d32f2f"
      });
    }
  }

  return (
    <div className="cadastro-produto-container">
      <div className="cadastro-produto-card">

        <h2>Cadastro de Produto</h2>

        <input type="text" placeholder="Nome do produto" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="number" placeholder="Preço" value={preco} onChange={(e) => setPreco(e.target.value)} />
        <input type="number" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
        <input type="text" placeholder="Categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} />

        <button onClick={salvarProduto}>Salvar</button>

        <button className="voltar" onClick={() => navigate("/produtos")}>
          Voltar
        </button>
        
      </div>
    </div>
  );
}
