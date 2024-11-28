// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


// Componentes importados
import TopBar from './components/pages/TopBar';
import Menu from './components/pages/Menu';
import EmpresaForm from './components/pages/EmpresaForm';
import EmpresaDashboard from './components/pages/EmpresaDashboard';
import ProductPage from './components/pages/ProductPage';
import CadastroProduto from './components/Product/CadastroProduto';
import ProductListByCompany from './components/Product/ProductListByCompany';
import ProductForm from './components/Product/ProductForm';
import ProductDetail from './components/Product/ProductDetail';
import Layout from './components/Layout';
import EditProduct from './components/Product/EditProduct';
import SearchResults from "././components/pages/SearchResults"; // Crie este componente


function App() {
    return (
        <Router>
            <Routes>
                {/* Rotas que utilizam o Layout com TopBar */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Menu />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/cadastro-empresa" element={<EmpresaForm />} />
                    <Route path="/produto/:productId" element={<ProductDetail />} /> {/* Rota padronizada */}
                    <Route path="/cadastrar-produto" element={<CadastroProduto />} />
                    <Route path="/editar-produto/:productId" element={<EditProduct />} />
                    <Route path="/listar-produtos-por-empresa" element={<ProductListByCompany />} />
                    <Route path="/empresa-dashboard" element={<EmpresaDashboard />} />
                    <Route path="/search" element={<SearchResults />} />
                </Route>

                {/* Rota específica para login, fora do Layout */}
                <Route path="/login" element={<TopBar />} />
            </Routes>
        </Router>
    );
}

export default App;
