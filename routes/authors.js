const express = require('express');
const router = express.Router();
const pool = require('../db/config');

router.get('/', async(req, res)=>{
    try {
        const result = await pool.query('SELECT * FROM authors ORDER BY nombre');
        res.json(result.rows);
    }catch (error) {
        console.error('Error obteniendo autores', error);
        res.status(500).json({error:'Error obtiendio autores'});
    }
});

router.get('/:id', async(req, res)=>{
    try{
        const result = await pool.query('SELECT * FROM authors WHERE id = $1', 
            [req.params.id]
        );
        if (result.rows.length === 0){
            return res.status(404).json({ error: 'autor no encontrado'});
        }
        res.json(result.rows[0]);
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
        const result = await pool.query(
            'INSERT INTO authors (nombre, email, bio) VALUES ($1, $2, $3) RETURNING *',
            [nombre, email, bio || null]
        );
        res.status(201).json(result.rows[0]);
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
        const result = await pool.query(
            `UPDATE authors SET nombre = COALESCE($1, nombre), email = COALESCE($2, email),
            bio = COALESCE($3, bio) WHERE id = $4 RETURNING *`, [nombre, email, bio, req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Autor no encontrado'});
        }
        res.json(result.rows[0]);
    }catch (error) {
        if (error.code === '23505'){
            return res.status(409).json({error: 'el email ya esta registrado'});
        }
        res.status(500).json({error: 'error actualizado autor'});
    }
});

router.delete('/:id', async (req, res)=>{
    try{
        const result = await pool.query('DELETE FROM authors WHERE id = $1',
            [req.params.id]
        );
        if (result.rowCount === 0){
            return res.status(404).json({ error: 'Autor no encontrado'});
        }
        res.json({message: 'autor eliminado exitosamente'});
    }catch (error){
        res.status(500).json({error: 'error eliminando autor'});
    }
});

module.exports = router;