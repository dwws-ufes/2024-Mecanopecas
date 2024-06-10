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

import { useQueryClient } from "@tanstack/react-query";
import {useEffect} from "react";

// const fetchToken = async () => {
//     const token = localStorage.getItem('jwtToken');
//     if (token){
//
//     }
// }

// const useUser = () =>{
//     return useQueryClient('user', fetchUser, {
//         enabled: !!localStorage.getItem('jwtToken'),
//     });
// };

function App() {

    // const { data: user, isLoading } = useUser();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token){
            setAuthToken(token);
        }
    }, []);

    return (
        <BrowserRouter>
            {/*{ user ?*/}
                <Routes>
                        <Route path="/orcamentos"  element={<Orcamentos />} />
                        <Route path="/orcamentos/:id" element={<OrcamentoDetails />} />
                        <Route path="/vendedores" element={<VendedorListPage />} />
                        <Route path="/vendedores/:id" element={<VendedorDetailPage />} />
                        <Route path="/vendedores/create" element={<VendedorCreatePage />} />
            {/*    </Routes>*/}
            {/*:*/}
            {/*    <Routes>*/}
                    <Route exact={true} path="/" element={<Home />} />
                    <Route path="/login"  element={<LoginComponent />} />
                </Routes>
            {/*}*/}
        </BrowserRouter>
    )
}

export default App;