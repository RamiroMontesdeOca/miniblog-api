const pool = require('../db/config');

async function getAuthors() {
    const result = await pool.query('SELECT * FROM authors ORDER BY nombre');
    return result.rows;
} 

async function getAuthorsById(id) {
    const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
    return result.rows[0];
}

async function createAuthor(nombre, email, bio){
    const result = await pool.query('INSERT INTO authors (nombre, email, bio) VALUES ($1, $2, $3) RETURNING *',
    [nombre, email, bio || null]);
    return result.rows[0];
}

async function updateAuthor(nombre, email, bio, id){
    const result = await pool.query(
        `UPDATE authors SET nombre = COALESCE($1, nombre), email = COALESCE($2, email),
        bio = COALESCE($3, bio) WHERE id = $4 RETURNING *`, [nombre, email, bio, id]);
        return result.rows[0];
}

async function deleteAuthor(id){
    const result = await pool.query(
        'DELETE FROM authors WHERE id = $1',
        [id]);
        return result.rowCount;
}

module.exports ={ getAuthors,getAuthorsById,createAuthor,updateAuthor,deleteAuthor};