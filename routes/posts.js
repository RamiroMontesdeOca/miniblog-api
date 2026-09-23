const express = require('express');
const router = express.Router();
const { getPosts,getPostById,createPost,updatePost,deletePost } = require('../services/postsService');

router.get('/', async(req, res)=>{
    try {
        const posts = await getPosts();
        res.json(posts);
    }catch (error) {
        console.error('Error obteniendo posts', error);
        res.status(500).json({error:'Error obtiendio posts'});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const post = await getPostById (req.params.id)
        if (!post){
            return res.status(404).json({ error: 'post no encontrado'});
        }
        res.json(post);
    }catch (error) {
        console.error('Error obteniendo post', error);
        res.status(500).json({ error: 'Error obteniendo post'});
    }
});

router.post('/', async (req, res)=>{
    const { titulo, contenido, published, author_id } = req.body;
    if (!titulo || !contenido || !author_id) {
        return res.status(400).json({error: 'titulo, contenido y autor id son requeridos'});
    }
    try {
        const  post = await createPost (titulo, contenido, published, author_id);
        res.status(201).json(post);
    }catch (error) {
    if (error.code === '23503') {
        return res.status(400).json({error: 'El autor indicado no existe'});
    }
    res.status(500).json({error: 'Error creando post'});
}
});

router.put('/:id', async (req, res)=>{
    const { titulo, contenido, published } = req.body;
    try {
        const post = await updatePost( titulo, contenido, published, req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'post no encontrado'});
        }
        res.json(post);
    }catch (error) {
        res.status(500).json({error: 'error actualizado post'});
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const postDeleted = await deletePost(req.params.id)
        if (!postDeleted){
            return res.status(404).json({ error: 'post no encontrado'});
        }
        res.json({message: 'post eliminado exitosamente'});
    }catch (error){
        res.status(500).json({error: 'error eliminando post'});
    }
});

module.exports = router;