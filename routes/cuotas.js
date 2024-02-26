const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');
const { obtenerCuotas, obtenerCuota, crearCuota } = require('../controllers/cuotas');
const { existeCuotaPorId } = require('../helpers/db-validators');

const router = Router();

/**
 * {{url}}/api/cuotas
 */

// Obtener todas las cuotas - público
router.get('/', obtenerCuotas);

// Obtener una cuota por id - público
router.get('/:id', [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom(existeCuotaPorId),
    validarCampos,
], obtenerCuota);

// Crear cuota - privado - cualquier persona con un token válido
router.post('/', [
    //validarJWT,  //validar x-token
    check('motivo', 'El motivo es obligatorio').not().isEmpty(),
    check('monto', 'El monto es obligatorio').not().isEmpty(),
    check('fecha_limite', 'La fecha límite es obligatoria').not().isEmpty(),
    validarCampos
], crearCuota);

// Otras rutas como actualizar y borrar cuota podrían agregarse aquí si es necesario

module.exports = router;
