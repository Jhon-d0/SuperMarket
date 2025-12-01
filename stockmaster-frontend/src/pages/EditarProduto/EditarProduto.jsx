import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditarProduto.css";

export default function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:8080/produtos/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(p => {
        setNome(p.nome);
        setPreco(p.preco);
        setQuantidade(p.quantidade);
        setCategoria(p.categoria);
      });
  }, [id]);

  async function atualizar() {
    const token = localStorage.getItem("token");

    const produto = { nome, preco, quantidade, categoria };

    try {
      const response = await fetch(`http://localhost:8080/produtos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(produto),
      });

      if (!response.ok) throw new Error("Erro ao atualizar");

      setMensagem("✔ Produto atualizado com sucesso!");

      setTimeout(() => navigate("/produtos"), 1500);
    } catch {
      setMensagem("❌ Erro ao atualizar produto!");
    }
  }

  return (
    <div className="editar-container">
      <div className="editar-card">
        <h2>Editar Produto</h2>

        <input type="text" value={nome} onChange={e => setNome(e.target.value)} />
        <input type="number" value={preco} onChange={e => setPreco(e.target.value)} />
        <input type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
        <input type="text" value={categoria} onChange={e => setCategoria(e.target.value)} />

        <button onClick={atualizar}>Salvar Alterações</button>
        <button className="voltar" onClick={() => navigate("/produtos")}>Voltar</button>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </div>
    </div>
  );
}
