import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './view/pages/login/loginPage.tsx';
import HomePage from "./view/pages/home/index.tsx";

import VendedorListPage from "./view/pages/vendedores/vendedorListPage";
import VendedorUpdatePage from "./view/pages/vendedores/vendedorUpdatePage";
import VendedorCreatePage from "./view/pages/vendedores/vendedorCreatePage";

import PecaListPage from "./view/pages/pecas/pecaListPage";
import PecaUpdatePage from "./view/pages/pecas/pecaUpdatePage";
import PecaCreatePage from "./view/pages/pecas/pecaCreatePage";

import ClienteListPage from "./view/pages/clientes/clienteListPage";
import ClienteUpdatePage from "./view/pages/clientes/clienteUpdatePage";
import ClienteCreatePage from "./view/pages/clientes/clienteCreatePage";

import GerenteListPage from './view/pages/gerentes/gerenteListPage';
import GerenteUpdatePage from './view/pages/gerentes/gerenteUpdatePage';
import GerenteCreatePage from './view/pages/gerentes/gerenteCreatePage';

import OrcamentoListPage from './view/pages/orcamentos/orcamentoListPage';
import OrcamentoUpdatePage from './view/pages/orcamentos/orcamentoUpdatePage';
import OrcamentoCreatePage from './view/pages/orcamentos/orcamentoCreatePage';

import { getTokenFromLocalStorage, setRoleOnLocalStorage } from './helpers/localStorage.ts';
import { setAuthTokenOnAxiosClient } from './repositories/axiosClient.ts';
import { decodeJWT } from './helpers/jwtToken.ts';

function App() {

    // Check if there is a token in local storage and set it on axios client
    var token = getTokenFromLocalStorage();
    if (token) {
        setAuthTokenOnAxiosClient(token);

        const decodedToken = decodeJWT(token);
        if (decodedToken) {
            setRoleOnLocalStorage(decodedToken.role);
        }
    } 

    return (
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/home" element={<HomePage />} />
    
                        <Route path="/vendedores" element={<VendedorListPage />} />
                        <Route path="/vendedores/:id" element={<VendedorUpdatePage />} />
                        <Route path="/vendedores/create" element={<VendedorCreatePage />} />
    
                        <Route path="/pecas" element={<PecaListPage />} />
                        <Route path="/pecas/:id" element={<PecaUpdatePage />} />
                        <Route path="/pecas/create" element={<PecaCreatePage />} />
    
                        <Route path="/clientes" element={<ClienteListPage />} />
                        <Route path="/clientes/:id" element={<ClienteUpdatePage />} />
                        <Route path="/clientes/create" element={<ClienteCreatePage />} />
    
                        <Route path="/gerentes" element={<GerenteListPage />} />
                        <Route path="/gerentes/:id" element={<GerenteUpdatePage />} />
                        <Route path="/gerentes/create" element={<GerenteCreatePage />} />
    
                        <Route path="/orcamentos" element={<OrcamentoListPage />} />
                        <Route path="/orcamentos/:id" element={<OrcamentoUpdatePage />} />
                        <Route path="/orcamentos/create" element={<OrcamentoCreatePage />} />
    
                    </Routes>
            </BrowserRouter>
        )
    }

export default App;