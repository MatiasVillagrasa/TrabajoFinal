import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import '../src/styles/components/pages/Normalize.css';

import HomePage from '../src/pages/Home';
import LaEmpresaPage from '../src/pages/LaEmpresa';
import ProductosPage from '../src/pages/Productos';
import ServiciosPage from '../src/pages/Servicios';
import ContactoPage from '../src/pages/Contacto';

import Header from "../src/components/layout/Header";
import Footer from "../src/components/layout/Footer";
import Nav from "../src/components/layout/Nav";

function App() {
  return (
    <Router>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/LaEmpresa" exact element={<LaEmpresaPage />} />
          <Route path="/Productos" exact element={<ProductosPage />} />
          <Route path="/Servicios" exact element={<ServiciosPage />} />
          <Route path="/Contacto" exact element={<ContactoPage />} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;