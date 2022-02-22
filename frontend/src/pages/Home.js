import React from 'react';
import logo from '../assets/img/Logo-600x274.png'
import '../styles/components/pages/Home.css';

const HomePage = (props) => {
    return (
        <main className="mHome">
            <div className="presentacion">
                <h1>WORKING S.R.L.</h1>
                <p>Somos una empresa familiar ubicada en Gualeguaychú, Entre Ríos</p>
            </div>
            <div className="presentacionLogo">
                <img src={logo} alt="Logo 600x274" />
            </div>
        </main>
    );
}

export default HomePage;