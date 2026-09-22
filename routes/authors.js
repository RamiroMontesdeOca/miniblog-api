const express = require('express');
const router = express.Router();
const { getAuthors,getAuthorsById,createAuthor,updateAuthor,deleteAuthor } = require('../services/authorsService');

router.get('/', async(req, res)=>{
    try {
        const authors = await getAuthors();
        res.json(authors);
    }catch (error) {
        console.error('Error obteniendo autores', error);
        res.status(500).json({error:'Error obtiendio autores'});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const author = await getAuthorsById (req.params.id)
        if (!author){
            return res.status(404).json({ error: 'autor no encontrado'});
        }
        res.json(author);
    }catch (error) {
        console.error('Error obteniendo autor', error);
        res.status(500).json({ error: 'Error obteniendo autor'});
    }
});

router.post('/', async (req, res)=>{
    const { nombre, email, bio } = req.body;
    if (!nombre || !email) {
        return res.status(400).json({error: 'Nombre y email son requeridos'});
    }
    try {
        const  author = await createAuthor (nombre, email, bio);
        res.status(201).json(author);
    }catch (error) {
        if (error.code === '23505') {
            return res.status(409).json({error: 'El email ya esta registrado'});
        }
        res.status(500).json({error: 'Error creando autor'});
    }
});

router.put('/:id', async (req, res)=>{
    const { nombre, email, bio } = req.body;
    try {
        const author = await updateAuthor( nombre, email, bio, req.params.id);
        if (!author) {
            return res.status(404).json({ error: 'Autor no encontrado'});
        }
        res.json(author);
    }catch (error) {
        if (error.code === '23505'){
            return res.status(409).json({error: 'el email ya esta registrado'});
        }
        res.status(500).json({error: 'error actualizado autor'});
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const authorDeleted = await deleteAuthor(req.params.id)
        if (!authorDeleted){
            return res.status(404).json({ error: 'Autor no encontrado'});
        }
        res.json({message: 'autor eliminado exitosamente'});
    }catch (error){
        res.status(500).json({error: 'error eliminando autor'});
    }
});

module.exports = router;