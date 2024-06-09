import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './view/pages/Login';
import Home from "./view/pages/Home";

import Orcamentos from "./view/pages/Orcamentos";
import DetailsOrcamentos from "./view/pages/Orcamentos/detailsOrcamentos.tsx";
import DetailsVendedores from "./view/pages/Vendedores/detailsVendedores.tsx";
import VendedorListPage from "./view/pages/Vendedores/vendedorListPage";
import VendedorDetailPage from "./view/pages/Vendedores/vendedorDetailPage";
import VendedorCreatePage from "./view/pages/Vendedores/vendedorCreatePage";



function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact={true} path="/" element={<Home />} />
            <Route path="/login"  element={<Login />} />
            <Route path="/orcamentos"  element={<Orcamentos />} />
            <Route path="/orcamentos/:id" element={<DetailsOrcamentos />} />
            <Route path="/vendedores" element={<VendedorListPage />} />
            <Route path="/vendedores/:id" element={<VendedorDetailPage />} />
            <Route path="/vendedores/create" element={<VendedorCreatePage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;