import React from 'react';
import { useState } from 'react';
import axios from 'axios';

import '../styles/components/pages/Contacto.css';

const ContactoPage = (props) => {

    const initialForm = {
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        mensaje: ''
    }

    const [sending, setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialForm);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(oldData => ({
            ...oldData,
            [name]: value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true)
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/contacto`, formData);
        setSending(false);
        if (response.data.error === false) {
            setFormData(initialForm)
        }
    }

    return (
        <main className="mContacto">
            <div className="contenedorContacto">
                <h3>Formulario de Contacto</h3>
                <form action="/contacto" method='post' onSubmit={handleSubmit}>
                    <p>
                        <label htmlFor="nombre">Nombre: </label>
                        <input type="text" placeholder="Ingresar Nombre" name='nombre' value={formData.nombre} onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="apellido">Apellido: </label>
                        <input type="text" placeholder="Ingresar Apellido" name='apellido' value={formData.apellido} onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="email">Email: </label>
                        <input type="text" placeholder="Ingresar Email" name='email' value={formData.email} onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="telefono">Telefono: </label>
                        <input type="text" placeholder="Cod. Area - Numero" name='telefono' value={formData.telefono} onChange={handleChange} />
                    </p>
                    <p>
                        <label htmlFor="mensaje">Mensaje: </label>
                        <textarea placeholder="Mensaje" name='mensaje' value={formData.mensaje} onChange={handleChange}></textarea>
                    </p>
                    <p className="boton">
                        <input type="submit" value="Enviar" />
                    </p>
                </form>
                {sending ? <p>Enviando...</p> : null}
                {msg ? <p>{msg}</p> : null}
            </div>
        </main>
    );
}

export default ContactoPage;