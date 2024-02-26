const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const { crearPost,
        obtenerPosts,
        obtenerPost,
        actualizarPost, 
        borrarPost } = require('../controllers/posts');
const { existePostPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/posts
 */

// Obtener todos los posts - público
router.get('/', obtenerPosts );

// Obtener un post por id - público
router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existePostPorId ),
    validarCampos,
], obtenerPost );

// Crear post - privado - cualquier persona con un token válido
router.post('/', [ 
    //validarJWT, //validar x-token
    check('titulo','El título es obligatorio').not().isEmpty(),
    check('descripcion','La descripción es obligatoria').not().isEmpty(),
    validarCampos
], crearPost );

// Actualizar - privado - cualquiera con token válido
router.put('/:id',[
    validarJWT,
    check('titulo','El título es obligatorio').not().isEmpty(),
    check('descripcion','La descripción es obligatoria').not().isEmpty(),
    check('id').custom( existePostPorId ),
    validarCampos
],actualizarPost );

// Borrar un post - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole, // Middleware para asegurar que el usuario sea administrador
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existePostPorId ),
    validarCampos,
],borrarPost);

module.exports = router;
