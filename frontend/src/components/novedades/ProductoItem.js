const ProductoItem = (props) => {
    const { name, description, imagen } = props;

    return (
        <div className="tarjeta">
            <img src={imagen}/>
            <h1>{name}</h1>
            <p>{description}</p>
        </div>
    );
}

export default ProductoItem;