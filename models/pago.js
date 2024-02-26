const { Schema, model } = require('mongoose');

const PagoSchema = Schema({
    id_estudiante: {
        type: String,  
        required: [true, 'El id_estudiante es obligatorio']
    },
    nombre_estudiante: {
        type: String,
        required: [true, 'El nombre_estudiante es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    monto: {
        type: Number,
        required: [true, 'El monto es obligatorio']
    },
    fecha_pago: {
        type: Date,
        default: Date.now
    },
    comprobante: {
        type: String,
        required: [true, 'El comprobante es obligatorio']
    },
    id_cuota: {
        type: String,
        required: [true, 'El id_cuota es obligatorio']
    },
    motivo_cuota: String,
    status: {
        type: String,
        enum: ['Pendiente', 'Aprobado', 'Rechazado'],
        default: 'Pendiente'
    },
    motivo_rechazo: String,
    fecha_actualizacion_estado: {
        type: Date,
        default: Date.now
    }
});

// Hook para actualizar la fecha de la última actualización solo al modificar el documento
PagoSchema.pre('findOneAndUpdate', function(next) {
    this._update.fecha_actualizacion_estado = new Date();
    next();
});

PagoSchema.methods.toJSON = function() {
    const { __v, _id, ...pago } = this.toObject();
    pago._id = _id;
    return pago;
}

module.exports = model('Pago', PagoSchema);

