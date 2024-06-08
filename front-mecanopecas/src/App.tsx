import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from "./pages/Home";


function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login"  element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;