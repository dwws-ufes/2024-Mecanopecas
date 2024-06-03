import './App.css';
import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Orcamento from "./pages/Orcamento";
import Cliente from "./pages/Cliente";

// function App() {
//   return <AppRoutes />
// }

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/orcamento' element={<Orcamento />} />
        <Route path='/cliente' element={<Cliente />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;