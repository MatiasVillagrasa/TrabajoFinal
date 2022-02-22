var pool = require('./bd');

async function getProductos() {
    try {
        var query = `SELECT id, nombre, descripcion, id_imagen
                     FROM productos`;
        var rows = await pool.query(query);

        return rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function insertProductos(obj) {
    try {
        var query = `INSERT INTO productos SET ?`;
        var rows = await pool.query(query, [obj]);
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function eliminarProductoPorId(id) {
    try {
        var query = `DELETE FROM productos WHERE id = ?`;
        var rows = await pool.query(query, [id]);
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function getProductoPorId(id) {
    try {
        var query = `SELECT id, nombre, descripcion, id_imagen 
                     FROM productos
                     WHERE id = ?`;
        var rows = await pool.query(query, [id]);
        return rows[0];
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateProductoPorId(obj, id) {
    try {
        var query = `UPDATE productos SET ? WHERE id = ?`;
        var rows = await pool.query(query, [obj, id]);
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getProductos, insertProductos, eliminarProductoPorId, updateProductoPorId, getProductoPorId };