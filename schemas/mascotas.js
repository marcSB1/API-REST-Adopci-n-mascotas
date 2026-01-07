// este archivo define la forma de los datos de una mascota en la bd
import mongoose from "mongoose";

// creo el schema
const mascotaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true // es obligatorio
        },
        tipo: {
            type: String,
            required: true,
            enum: [ // solo puede ser uno de esos valores
                'perro', 'gato', 'conejo'
            ]
        },
        raza: {
            type: String,
        },
        edad: {
            type: Number,
            min: [0, 'La edad no puede ser negativa'], // no puede ser menor que 0
            max: [30, 'La edad no parece correcta'] // no puede ser mayor que 30
        },
        descripcion:{
            type: String,
        },
        adoptado:{
            type: Boolean,
            default: false, // por defecto es false
        }

    },{ timestamps: true } // Mongoose añade automáticamente createdAt (fecha de creación) y updatedAt (última modificación)
);

// crea un model, lo asocia a la colección mascotas (si 
// no existe la crea), exporta el model para que lo use 
// el modelo lógico (/models/mascotas.js)
export default mongoose.model('mascotas', mascotaSchema);