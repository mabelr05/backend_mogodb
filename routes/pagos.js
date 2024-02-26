const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { obtenerPagos, obtenerPago, crearPago, actualizarPago } = require('../controllers/pagos');
const { existePagoPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/pagos
 */

// Obtener todos los pagos - público
router.get('/', obtenerPagos);

// Obtener un pago por id - público
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existePagoPorId),
    validarCampos,
], obtenerPago);

// Crear pago - privado - cualquier persona con un token válido
router.post('/', [
    //validarJWT, //validar x-token
    check('id_estudiante', 'El ID del estudiante es obligatorio').not().isEmpty(),
    check('nombre_estudiante', 'El nombre del estudiante es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('monto', 'El monto es obligatorio').not().isEmpty(),
    check('comprobante', 'El comprobante es obligatorio').not().isEmpty(),
    check('id_cuota', 'El ID de la cuota es obligatorio').not().isEmpty(),
    validarCampos
], crearPago);

// Actualizar pago - privado - cualquier persona con un token válido
router.put('/:id', [
    validarJWT,
    check('status', 'El status es obligatorio').not().isEmpty(),
    check('motivo_rechazo', 'El motivo de rechazo es obligatorio').optional().not().isEmpty(), // El motivo_rechazo es opcional
    check('id').custom(existePagoPorId),
    validarCampos
], actualizarPago);

// Otras rutas como eliminar un pago podrían agregarse aquí si es necesario

module.exports = router;
