import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './view/pages/Login';
import Home from "./view/pages/Home";

import Orcamentos from "./view/pages/Orcamentos";

import DetailsVendedores from "./view/pages/Vendedores/detailsVendedores.tsx";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login"  element={<Login />} />
            <Route path="/orcamentos"  element={<Orcamentos />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;