import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './view/pages/Login';
import Home from "./view/pages/Home";

import VendedorListPage from "./view/pages/vendedores/vendedorListPage";
import VendedorUpdatePage from "./view/pages/vendedores/vendedorUpdatePage";
import VendedorCreatePage from "./view/pages/vendedores/vendedorCreatePage";

import PecaListPage from "./view/pages/pecas/pecaListPage";
import PecaUpdatePage from "./view/pages/pecas/pecaUpdatePage";
import PecaCreatePage from "./view/pages/pecas/pecaCreatePage";

import ClienteListPage from "./view/pages/clientes/clienteListPage";
import ClienteUpdatePage from "./view/pages/clientes/clienteUpdatePage";
import ClienteCreatePage from "./view/pages/clientes/clienteCreatePage";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login"  element={<Login />} />

            <Route path="/vendedores" element={<VendedorListPage />} />
            <Route path="/vendedores/:id" element={<VendedorUpdatePage />} />
            <Route path="/vendedores/create" element={<VendedorCreatePage />} />

            <Route path="/pecas" element={<PecaListPage />} />
            <Route path="/pecas/:id" element={<PecaUpdatePage />} />
            <Route path="/pecas/create" element={<PecaCreatePage />} />

            <Route path="/clientes" element={<ClienteListPage />} />
            <Route path="/clientes/:id" element={<ClienteUpdatePage />} />
            <Route path="/clientes/create" element={<ClienteCreatePage />} />
            
        </Routes>
    </BrowserRouter>
  )
}

export default App;