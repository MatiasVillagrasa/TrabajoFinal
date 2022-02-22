import React from 'react'
import { Link } from 'react-router-dom';
import '../../styles/components/layout/Nav.css';

const Nav = (props) => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/LaEmpresa">La Empresa</Link></li>
                <li><Link to="/Servicios">Servicios</Link></li>
                <li><Link to="/Productos">Productos</Link></li>
                <li><Link to="/Contacto">Contacto</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;