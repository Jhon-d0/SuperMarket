import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaginaInicial.css";

export default function PaginaInicial() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // Buscar produtos
    fetch("http://localhost:8080/produtos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setProdutos)
      .catch(() => alert("Erro ao buscar produtos"));
  }, []);

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function deletarProduto(id) {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:8080/produtos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then(() => {
      setProdutos(produtos.filter((p) => p.id !== id));
    });
  }

  // FILTRO POR NOME
  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="container">
      <div className="top-bar">
        <h1>Lista de Produtos</h1>
        <button className="logout" onClick={logout}>Sair</button>
      </div>

      <button className="novo" onClick={() => navigate("/produtos/novo")}>
        Cadastrar Produto
      </button>

      <div className="filtros">
        <input
          type="text"
          placeholder="Pesquisar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Qtd</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {produtosFiltrados.map((p) => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>R$ {p.preco}</td>
              <td>{p.quantidade}</td>
              <td>{p.categoria}</td>

              <td>
                <button onClick={() => navigate(`/produtos/editar/${p.id}`)}>
                  Editar
                </button>
                <button onClick={() => deletarProduto(p.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
