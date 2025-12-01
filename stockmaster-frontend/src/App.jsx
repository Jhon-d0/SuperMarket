import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import Produtos from "./pages/PaginaInicial/PaginaInicial.jsx";
import Cadastro from "./pages/Cadastro/Cadastro.jsx"; 
import CadastroProduto from "./pages/CadastraProdutos/CadastrarProdutos.jsx";
import EditarProduto from "./pages/EditarProduto/EditarProduto.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} /> 
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/novo" element={<CadastroProduto />} />
        <Route path="/produtos/editar/:id" element={<EditarProduto />} />
      </Routes>
    </BrowserRouter>
  );
}
