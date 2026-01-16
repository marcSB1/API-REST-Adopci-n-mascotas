// Este archivo define la forma de los datos de un usuario en la bd
import mongoose from "mongoose";

// Creo el schema
const usuarioSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true, // Campo Obligatorio
            unique: true, // Campo único, lo uso como clave primaria
            trim: true, // Quito espacios en blanco que alguien pueda dejar en el formulario
        },
        nombre: {
            type: String,
            required: true,
            trim: true,
        },
        telefono: {
            type: String,
            required: false,
        },
        clave: { // Contraseña cifrada
            type: String,
            required: true,
        }
    }
);

// Creo un model llamado usuarios, lo conecto con la colección 
// usuarios de MongoDB, aplico automáticamente las reglas del schema, 
// lo exporto para usarlo en el proyecto
export default mongoose.model('usuarios', usuarioSchema); 