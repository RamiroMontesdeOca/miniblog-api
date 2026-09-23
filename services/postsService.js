const pool = require('../db/config');

async function getPosts() {
    const result = await pool.query('SELECT * FROM posts ORDER BY titulo');
    return result.rows;
} 

async function getPostById(id) {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    return result.rows[0];
}

async function createPost(titulo, contenido, published, autores_id){
    const result = await pool.query('INSERT INTO posts (titulo, contenido, published, autores_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [titulo, contenido, published, autores_id || null]);
    return result.rows[0];
}

async function updatePost(titulo, contenido, published, id){
    const result = await pool.query(
        `UPDATE posts SET titulo = COALESCE($1, titulo), contenido = COALESCE($2, contenido),
        published = COALESCE($3, published) WHERE id = $4 RETURNING *`, [titulo, contenido, published, id]);
        return result.rows[0];
}

async function deletePost(id){
    const result = await pool.query(
        'DELETE FROM posts WHERE id = $1',
        [id]);
        return result.rowCount;
}

module.exports ={ getPosts,getPostById,createPost,updatePost,deletePost};