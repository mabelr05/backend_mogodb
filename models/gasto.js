const { Schema, model } = require('mongoose');

const GastoSchema = Schema({
    concepto: {
        type: String,
        required: [true, 'El concepto es obligatorio']
    },
    monto: {
        type: Number,
        required: [true, 'El monto es obligatorio']
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatoria']
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    }
});

// Método para eliminar campos que no quieres devolver en las respuestas JSON
GastoSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject();
    return data;
}

module.exports = model('Gasto', GastoSchema);
