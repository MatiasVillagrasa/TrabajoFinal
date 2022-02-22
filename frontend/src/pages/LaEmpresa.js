import React from 'react';
import logo from '../assets/img/Logo-400x176.png'
import '../styles/components/pages/LaEmpresa.css';

const LaEmpresaPage = (props) => {
    return (
        <main className="mLaEmpresa">
            <h1>La Empresa</h1>
            <div className="tarjetas">
                <div className="tarjeta">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="tarjeta">
                    <h1>Nuestra Mision</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis libero, pariatur optio assumenda nisi
                        soluta. Autem cumque error, debitis iure excepturi natus voluptatem officiis dolorum sint harum.</p>
                    <h1>Nuestra Vision</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum nisi ea soluta quasi ipsa, quae sint
                        inventore, explicabo voluptatum, veritatis nemo! Praesentium dolore perferendis voluptatum illum iure
                        blanditiis perspiciatis ipsam?</p>
                    <h1>Nuestro Objetivo</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum eum nam, delectus recusandae iste
                        asperiores tenetur et vitae quasi amet labore numquam doloremque facere voluptate rerum autem. Eius, eaque
                        vero.</p>
                </div>
            </div>
        </main>
    );
}

export default LaEmpresaPage;