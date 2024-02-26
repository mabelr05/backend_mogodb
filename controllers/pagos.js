const { response } = require('express');
const { Pago } = require('../models');

const obtenerPagos = async (req, res = response) => {
    try {
        const pagos = await Pago.find();
        res.json({ pagos });
        console.log('Consulta para obtener pagos realizada.');
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al obtener los pagos.'
        });
    }
}

const obtenerPago = async (req, res = response) => {
    const { id } = req.params;
    try {
        const pago = await Pago.findById(id);
        if (!pago) {
            return res.status(404).json({
                msg: 'El pago no fue encontrado.'
            });
        }
        res.json({ pago });
    } catch (error) {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                msg: 'ID de pago no válida.'
            });
        }
        res.status(500).json({
            msg: 'Hubo un error al obtener el pago.'
        });
    }
}

const crearPago = async (req, res = response) => {
    const { id_estudiante, nombre_estudiante, email, monto, comprobante, id_cuota } = req.body;

    try {
        const pago = new Pago({ id_estudiante, nombre_estudiante, email, monto, comprobante, id_cuota });
        await pago.save();
        console.log('Pago creado:', pago);
        res.status(201).json(pago);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al crear el pago.'
        });
    }
}

const actualizarPago = async (req, res = response) => {
    const { id } = req.params;
    const { status, motivo_rechazo } = req.body;

    // Validar que el campo status sea uno de los valores permitidos
    const statusPermitidos = ['Pendiente', 'Aprobado', 'Rechazado'];
    if (!statusPermitidos.includes(status)) {
        return res.status(400).json({
            msg: 'El valor del status no es válido. Debe ser uno de: Pendiente, Aprobado, Rechazado.'
        });
    }

    // Crear un objeto con los campos a actualizar
    const camposActualizar = {};
    if (status) camposActualizar.status = status;
    if (motivo_rechazo !== undefined) camposActualizar.motivo_rechazo = motivo_rechazo; // Solo se agrega si se recibe en la solicitud

    try {
        const pago = await Pago.findByIdAndUpdate(id, camposActualizar, { new: true });

        if (!pago) {
            return res.status(404).json({
                msg: 'El pago no fue encontrado.'
            });
        }

        console.log('Pago actualizado:', pago);
        res.json({ pago });
    } catch (error) {
        console.error('Error al actualizar el pago:', error.message);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                msg: 'ID de pago no válido.'
            });
        }
        res.status(500).json({
            msg: 'Hubo un error al actualizar el pago.'
        });
    }
}


module.exports = {
    obtenerPagos,
    obtenerPago,
    crearPago,
    actualizarPago
};
