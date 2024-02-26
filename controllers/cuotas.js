const { response } = require('express');
const { Cuota } = require('../models');

const obtenerCuotas = async (req, res = response) => {
    try {
        const cuotas = await Cuota.find();
        res.json({ cuotas });
        console.log('Consulta para obtener cuotas realizada.');
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al obtener las cuotas.'
        });
    }
}

const obtenerCuota = async (req, res = response) => {
    const { id } = req.params;
    try {
        const cuota = await Cuota.findById(id);
        if (!cuota) {
            return res.status(404).json({
                msg: 'La cuota no fue encontrada.'
            });
        }
        res.json({ cuota });
    } catch (error) {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                msg: 'ID de cuota no válida.'
            });
        }
        res.status(500).json({
            msg: 'Hubo un error al obtener la cuota.'
        });
    }
}

const crearCuota = async (req, res = response) => {
    const { motivo, monto, fecha_limite } = req.body;

    try {
        const cuota = new Cuota({ motivo, monto, fecha_limite });
        await cuota.save();
        console.log('Cuota creada:', cuota);
        res.status(201).json(cuota);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al crear la cuota.'
        });
    }
}

module.exports = {
    obtenerCuotas,
    obtenerCuota,
    crearCuota
};