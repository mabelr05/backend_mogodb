const { Schema, model } = require('mongoose');

const PostSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    img: {
        type: String, // Aquí podrías definir el tipo de dato que más se ajuste a tus necesidades para almacenar la imagen
        required: false // Puedes ajustar esto según tus requisitos
    },
    time_stamp: {
        type: Date,
        default: Date.now
    },
    autor: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario', // Suponiendo que el autor está relacionado con el modelo Usuario
        required: false
    }
});

// Método para eliminar campos que no quieres devolver en las respuestas JSON
PostSchema.methods.toJSON = function() {
    const { __v, ...data } = this.toObject(); // Puedes excluir más campos si lo deseas
    return data;
}

module.exports = model('Post', PostSchema);
