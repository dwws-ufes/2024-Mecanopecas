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

import GerenteListPage from './view/pages/gerentes/gerenteListPage';
import GerenteUpdatePage from './view/pages/gerentes/gerenteUpdatePage';
import GerenteCreatePage from './view/pages/gerentes/gerenteCreatePage';

import OrcamentoListPage from './view/pages/orcamentos/orcamentoListPage';
// import OrcamentoUpdatePage from './view/pages/orcamentos/orcamentoUpdatePage';
import OrcamentoCreatePage from './view/pages/orcamentos/orcamentoCreatePage';

import api from './repositories/axiosClient.ts';
import { setAuthToken } from "./repositories/authenticationRepository.ts";

function App() {
    var token = localStorage.getItem('jwtToken');
    if (token){
        setAuthToken(token);
    } else {
        setAuthToken(null);
    }

    return (
        <BrowserRouter>
            { localStorage.getItem('jwtToken') ?
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

            <Route path="/gerentes" element={<GerenteListPage />} />
            <Route path="/gerentes/:id" element={<GerenteUpdatePage />} />
            <Route path="/gerentes/create" element={<GerenteCreatePage />} />

            <Route path="/orcamentos" element={<OrcamentoListPage />} />
            {/* <Route path="/orcamentos/:id" element={<OrcamentoUpdatePage />} /> */}
            <Route path="/orcamentos/create" element={<OrcamentoCreatePage />} />

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