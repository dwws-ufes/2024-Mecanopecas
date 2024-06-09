import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './view/pages/Login';
import Home from "./view/pages/Home";
import VendedorListPage from "./view/pages/Vendedores/vendedorListPage";
import VendedorUpdatePage from "./view/pages/Vendedores/vendedorUpdatePage";
import VendedorCreatePage from "./view/pages/Vendedores/vendedorCreatePage";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login"  element={<Login />} />
            {/* <Route path="/orcamentos"  element={<Orcamentos />} /> */}
            <Route path="/vendedores" element={<VendedorListPage />} />
            <Route path="/vendedores/:id" element={<VendedorUpdatePage />} />
            <Route path="/vendedores/create" element={<VendedorCreatePage />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;