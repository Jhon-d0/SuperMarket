import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

    fetch("http://localhost:8080/produtos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setProdutos)
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Erro!",
          text: "Não foi possível carregar os produtos.",
        });
      });
  }, []);

  function logout() {
    localStorage.removeItem("token");

    Swal.fire({
      title: "Sessão encerrada",
      icon: "info",
      confirmButtonColor: "#ff6f00",
    }).then(() => {
      navigate("/");
    });
  }

  function deletarProduto(id) {
    const token = localStorage.getItem("token");

    Swal.fire({
      title: "Tem certeza?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d32f2f",
      cancelButtonColor: "#616161",
      confirmButtonText: "Excluir"
    }).then((result) => {
      if (!result.isConfirmed) return;

      fetch(`http://localhost:8080/produtos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
        setProdutos(produtos.filter((p) => p.id !== id));

        Swal.fire({
          icon: "success",
          title: "Produto removido!",
          confirmButtonColor: "#ff6f00"
        });
      });
    });
  }

  const produtosFiltrados = produtos.filter((p) =>
    p.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="pagina-container">

      {/* Topo */}
      <div className="top-bar">
        <h1>📦 StockMaster - Produtos</h1>
        <button className="logout" onClick={logout}>Sair</button>
      </div>

      {/* Botão de novo produto */}
      <button className="novo" onClick={() => navigate("/produtos/novo")}>
        ➕ Cadastrar Produto
      </button>

      {/* Barra de busca */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Pesquisar produto..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* Tabela */}
      <div className="tabela-wrapper">
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

                <td className="acoes">
                  <button
                    className="editar"
                    onClick={() => navigate(`/produtos/editar/${p.id}`)}
                  >
                    Editar
                  </button>

                  <button
                    className="excluir"
                    onClick={() => deletarProduto(p.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
