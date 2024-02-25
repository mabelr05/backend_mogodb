const { Schema, model } = require('mongoose');

const CuotaSchema = Schema({
    motivo: {
        type: String,
        required: [true, 'El motivo es obligatorio']
    },
    monto: {
        type: Number,
        required: [true, 'El monto es obligatorio']
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    },
    fecha_limite: {
        type: Date,
        required: [true, 'La fecha límite es obligatoria']
    }
});

module.exports = model('Cuota', CuotaSchema);