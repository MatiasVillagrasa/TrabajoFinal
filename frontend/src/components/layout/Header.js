import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../../assets/img/Logo.png'
import '../../styles/components/layout/Header.css';

const Header = (props) => {
    return (
        <div>
            <Link to="/"><img src={logo} alt="Logo"></img></Link>
        </div>
    );
}

export default Header;