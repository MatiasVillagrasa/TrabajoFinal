import React from 'react';
import feteadora from '../assets/img/Feteadora400.png'
import trozadora from '../assets/img/Trozadora400.png'
import envasadora from '../assets/img/Envasadora400.png'
import balanza from '../assets/img/Balanza400.png'
import '../styles/components/pages/Servicios.css';

const ServiciosPage = (props) => {
    return (
        <main className="mServicios">
            <h1>Servicios</h1>
            <div className="tarjetas">
                <div className="tarjeta">
                    <img src={feteadora} alt="Feteadora" />
                    <h1>Feteado</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A quod, quos cumque nisi, repellendus
                        voluptate animi possimus, est sequi numquam excepturi distinctio illum culpa mollitia vitae
                        asperiores dolor dolorum delectus!</p>
                </div>
                <div className="tarjeta">
                    <img src={trozadora} alt="Trozadora" />
                    <h1>Trozado</h1>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis libero, pariatur optio assumenda nisi
                        soluta. Autem cumque error, debitis iure excepturi natus voluptatem officiis dolorum sint harum.</p>
                </div>
                <div className="tarjeta">
                    <img src={envasadora} alt="Envasadora" />
                    <h1>Envasado</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore nihil mollitia autem minima, in
                        dolorem sapiente quod consequatur dolores ut hic dicta aspernatur ipsum ea cum a. Qui, nihil
                        assumenda?</p>
                </div>
                <div className="tarjeta">
                    <img src={balanza} alt="Balanza" />
                    <h1>Control de Peso</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque a odit, et debitis necessitatibus
                        quas velit, tempora dignissimos molestias accusamus placeat ea officiis magni tenetur fuga. Error
                        quos sint veritatis.</p>
                </div>
            </div>
        </main>
    );
}

export default ServiciosPage;