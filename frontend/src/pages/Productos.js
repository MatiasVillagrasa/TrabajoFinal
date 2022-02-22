import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductoItem from '../components/novedades/ProductoItem';

import '../styles/components/pages/Productos.css';

const ProductosPage = (props) => {

    const [loading, setLoading] = useState(false);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const cargarProductos = async () => {
            setLoading(true);
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/productos`)
            setProductos(response.data);
            setLoading(false);
        };

        cargarProductos();
    }, []);

    return (
        <main className="mProductos">
            <h1>Productos</h1>
            <div className='tarjetas'>
                {loading ? (
                    <p>Cargando...</p>
                ) : (
                    productos.map(item => <ProductoItem key={item.id}
                        name={item.nombre}
                        description={item.descripcion}
                        imagen={item.imagen} />)
                )}
            </div>
        </main>
    );
}

export default ProductosPage;