const { response } = require('express');
const { Post } = require('../models');

const obtenerPosts = async (req, res = response) => {
    const posts = await Post.find().populate('autor', 'nombre');
    res.json({ posts });
}

const obtenerPost = async (req, res = response) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate('autor', 'nombre');
    res.json({ post });
}

const crearPost = async (req, res = response) => {
    const { titulo, descripcion, autor } = req.body;

    try {
        const post = new Post({ titulo, descripcion, autor });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al crear el post.'
        });
    }
}

const actualizarPost = async (req, res = response) => {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    try {
        const post = await Post.findByIdAndUpdate(id, { titulo, descripcion }, { new: true });
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al actualizar el post.'
        });
    }
}

const borrarPost = async (req, res = response) => {
    const { id } = req.params;

    try {
        await Post.findByIdAndDelete(id);
        res.json({ msg: 'Post eliminado correctamente.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al borrar el post.'
        });
    }
}

module.exports = {
    obtenerPosts,
    obtenerPost,
    crearPost,
    actualizarPost,
    borrarPost
}
