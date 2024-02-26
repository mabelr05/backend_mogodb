const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { obtenerGastos, obtenerGasto, crearGasto, actualizarGasto } = require('../controllers/gastos');
const { existeGastoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/gastos
 */

// Obtener todos los gastos - público
router.get('/', obtenerGastos);

// Obtener un gasto por id - público
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeGastoPorId),
    validarCampos,
], obtenerGasto);

// Crear gasto - privado - cualquier persona con un token válido
router.post('/', [
    // validarJWT, // validar x-token
    check('concepto', 'El concepto es obligatorio').not().isEmpty(),
    check('monto', 'El monto es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    validarCampos
], crearGasto);

// Actualizar gasto - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    check('concepto', 'El concepto es obligatorio').not().isEmpty(),
    check('monto', 'El monto es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').not().isEmpty(),
    check('id').custom(existeGastoPorId),
    validarCampos
], actualizarGasto);

// Otras rutas como eliminar un gasto podrían agregarse aquí si es necesario

module.exports = router;
