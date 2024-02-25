const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de datos online');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);

        // Si el error es debido a la falta de conexión a Internet
        if (error.code === 'ENOTFOUND') {
            throw new Error('No se pudo conectar a la base de datos. Verifica tu conexión a Internet.');
        }

        // Si el error es debido a las credenciales incorrectas
        if (error.name === 'MongoError' && error.message.includes('Authentication')) {
            throw new Error('Error de autenticación. Verifica las credenciales de la base de datos.');
        }

        // Si el error es debido a la configuración incorrecta
        if (error.name === 'MongoError' && error.message.includes('InvalidURI')) {
            throw new Error('La cadena de conexión a la base de datos es inválida.');
        }

        // Si el error es debido a cualquier otro motivo
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};

module.exports = {
    dbConnection
};

