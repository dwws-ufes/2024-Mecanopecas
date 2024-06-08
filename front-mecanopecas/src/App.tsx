import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './view/pages/Login';
import Home from "./view/pages/Home";

import DetailsVendedores from "./view/pages/Vendedores/detailsVendedores.tsx";
import DetailsOrcamentos from "./view/pages/Orcamentos/detailsOrcamentos.tsx";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login"  element={<Login />} />
            <Route path="/orcamentos"  element={<DetailsOrcamentos />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;