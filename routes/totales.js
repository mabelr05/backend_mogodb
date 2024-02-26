const express = require('express');
const router = express.Router();
const Gasto = require('../models/gasto');
const Pago = require('../models/pago');

// Ruta para obtener el total de dinero gastado y en pagos
router.get('/', async (req, res) => {
    try {
        // Obtener el total de dinero gastado
        const totalGastado = await Gasto.aggregate([
            { $group: { _id: null, total: { $sum: "$monto" } } }
        ]);

        // Obtener el total de dinero en pagos
        const totalPagos = await Pago.aggregate([
            { $group: { _id: null, total: { $sum: "$monto" } } }
        ]);

        // Combinar los resultados en un solo objeto JSON
        const resultados = {
            total_gastado: totalGastado[0].total,
            total_pagos: totalPagos[0].total
        };

        // Enviar el objeto JSON como respuesta
        res.json(resultados);
    } catch (error) {
        console.error('Error al obtener los totales:', error);
        res.status(500).json({ error: 'Error al obtener los totales' });
    }
});


// Ruta para obtener el total de dinero gastado y en pagos
router.get('/totales', async (req, res) => {
    try {
        // Obtener el total de dinero gastado
        const totalGastado = await Gasto.aggregate([
            { $group: { _id: null, total: { $sum: "$monto" } } }
        ]);

        // Obtener el total de dinero en pagos con estado "aprobado"
        const totalPagosAprobados = await Pago.aggregate([
            { $match: { status: "Aprobado" } },
            { $group: { _id: null, total: { $sum: "$monto" }, count: { $sum: 1 } } }
        ]);

        // Obtener el total de dinero en pagos con estado "pendiente"
        const totalPagosPendientes = await Pago.aggregate([
            { $match: { status: "Pendiente" } },
            { $group: { _id: null, total: { $sum: "$monto" }, count: { $sum: 1 } } }
        ]);

        // Combinar los resultados en un solo objeto JSON
        const resultados = {
            total_gastado: totalGastado[0].total,
            total_pagos_aprobados: totalPagosAprobados.length > 0 ? totalPagosAprobados[0].total : 0,
            total_pagos_pendientes: totalPagosPendientes.length > 0 ? totalPagosPendientes[0].total : 0,
            count_pagos_aprobados: totalPagosAprobados.length > 0 ? totalPagosAprobados[0].count : 0,
            count_pagos_pendientes: totalPagosPendientes.length > 0 ? totalPagosPendientes[0].count : 0
        };

        // Enviar el objeto JSON como respuesta
        res.json(resultados);
    } catch (error) {
        console.error('Error al obtener los totales:', error);
        res.status(500).json({ error: 'Error al obtener los totales' });
    }
});

module.exports = router;
