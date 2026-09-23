const pool = require('../db/config');

async function getPosts() {
    const result = await pool.query('SELECT * FROM posts ORDER BY titulo');
    return result.rows;
} 

async function getPostsByAuthorId(authorId) {
    const result = await pool.query(
    `SELECT
        posts.id AS post_id,
        posts.titulo AS post_titulo,
        posts.published AS post_published,
        posts.creado AS post_creado,
        posts.contenido,
        authors.id AS author_id,
        authors.nombre AS author_nombre,
        authors.email AS author_email,
        authors.bio
    FROM posts
    INNER JOIN authors ON posts.autores_id = authors.id
    WHERE posts.autores_id = $1`,[authorId]
    );
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

module.exports ={ getPosts,getPostById,createPost,updatePost,deletePost,getPostsByAuthorId};