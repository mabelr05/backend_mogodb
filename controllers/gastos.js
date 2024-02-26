const { response } = require('express');
const { Gasto } = require('../models');

const obtenerGastos = async (req, res = response) => {
    try {
        const gastos = await Gasto.find();
        res.json({ gastos });
        console.log('Consulta para obtener gastos realizada.');
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al obtener los gastos.'
        });
    }
}

const obtenerGasto = async (req, res = response) => {
    const { id } = req.params;
    try {
        const gasto = await Gasto.findById(id);
        if (!gasto) {
            return res.status(404).json({
                msg: 'El gasto no fue encontrado.'
            });
        }
        res.json({ gasto });
    } catch (error) {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                msg: 'ID de gasto no válida.'
            });
        }
        res.status(500).json({
            msg: 'Hubo un error al obtener el gasto.'
        });
    }
}

const crearGasto = async (req, res = response) => {
    const { concepto, monto, fecha } = req.body;

    try {
        const gasto = new Gasto({ concepto, monto, fecha });
        await gasto.save();
        console.log('Gasto creado:', gasto);
        res.status(201).json(gasto);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al crear el gasto.'
        });
    }
}

const actualizarGasto = async (req, res = response) => {
    const { id } = req.params;
    const { concepto, monto, fecha } = req.body;

    // Crear un objeto con los campos a actualizar
    const camposActualizar = {};
    if (concepto) camposActualizar.concepto = concepto;
    if (monto) camposActualizar.monto = monto;
    if (fecha) camposActualizar.fecha = fecha;

    try {
        const gasto = await Gasto.findByIdAndUpdate(id, camposActualizar, { new: true });

        if (!gasto) {
            return res.status(404).json({
                msg: 'El gasto no fue encontrado.'
            });
        }

        console.log('Gasto actualizado:', gasto);
        res.json({ gasto });
    } catch (error) {
        console.error('Error al actualizar el gasto:', error.message);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                msg: 'ID de gasto no válido.'
            });
        }
        res.status(500).json({
            msg: 'Hubo un error al actualizar el gasto.'
        });
    }
}

module.exports = {
    obtenerGastos,
    obtenerGasto,
    crearGasto,
    actualizarGasto
};
