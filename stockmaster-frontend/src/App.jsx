import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Produtos from "./pages/PaginaInicial/PaginaInicial";
import Cadastro from "./pages/Cadastro/Cadastro";
import CadastroProduto from "./pages/CadastraProdutos/CadastrarProdutos";
import EditarProduto from "./pages/EditarProduto/EditarProduto";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route
          path="/produtos"
          element={
            <ProtectedRoute>
              <Produtos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/produtos/novo"
          element={
            <ProtectedRoute>
              <CadastroProduto />
            </ProtectedRoute>
          }
        />

        <Route
          path="/produtos/editar/:id"
          element={
            <ProtectedRoute>
              <EditarProduto />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
