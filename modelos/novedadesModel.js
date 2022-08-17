var pool = require('./bd');

/* Para ver las novedades */

async function getNovedades() {
    var query = 'select * from novedades';
    var rows = await pool.query(query);
    return rows;
}

/* DELETE */

async function deleteNovedades(id) {
    var query = 'delete from novedades where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;
}

/* ADD */

async function addNews(obj) {
    try {
        var query = 'insert into novedades set ?';
        var rows = await pool.query(query, [obj])
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// EDIT

// Traigo los datos para modificarlos

async function getNovedadesById(id) {
    var query = 'select * from novedades where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
}

// Modificar esos datos

async function modificarNovedadById(obj, id) {
    try {
        var query = 'update novedades set ? where id = ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error) {
        throw error;
    }
}


module.exports =  {getNovedades, deleteNovedades, addNews, getNovedadesById, modificarNovedadById}

