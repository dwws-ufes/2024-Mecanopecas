import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from "./view/pages/Home";
import LoginComponent from './view/pages/Login';

import Orcamentos from "./view/pages/Orcamentos";
import OrcamentoDetails from "./view/pages/Orcamentos/orcamentoDetails.tsx";
import DetailsVendedores from "./view/pages/Vendedores/detailsVendedores.tsx";
import VendedorListPage from "./view/pages/Vendedores/vendedorListPage";
import VendedorDetailPage from "./view/pages/Vendedores/vendedorDetailPage";
import VendedorCreatePage from "./view/pages/Vendedores/vendedorCreatePage";


import api from './repositories/axiosClient.ts';
import { setAuthToken } from "./repositories/authenticationRepository.ts";


import {useEffect} from "react";

function App() {

    useEffect(() => {
        var token = localStorage.getItem('jwtToken');
        if (token){
            api.defaults.headers.common['Authorization'] = `Bearer ${token.toString()}`;
        }
    }, []);

    return (
        <BrowserRouter>
            { localStorage.getItem('jwtToken') ?
                <Routes>
                        <Route path="/orcamentos"  element={<Orcamentos />} />
                        <Route path="/orcamentos/:id" element={<OrcamentoDetails />} />
                        <Route path="/vendedores" element={<VendedorListPage />} />
                        <Route path="/vendedores/:id" element={<VendedorDetailPage />} />
                        <Route path="/vendedores/create" element={<VendedorCreatePage />} />
                        <Route exact={true} path="/" element={<Home />} />
                        <Route path="/login"  element={<LoginComponent />} />
                </Routes>
            :
                <Routes>
                    <Route exact={true} path="/" element={<Home />} />
                    <Route path="/login"  element={<LoginComponent />} />
                </Routes>
            }
        </BrowserRouter>
    )
}

export default App;