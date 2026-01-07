// este archivo se conecta a la base de datos MongoDB cuando arranca la aplicación
import 'dotenv/config' // carga variables de entorno
import mongoose from 'mongoose'; // libreria que permite usar schemas y modelos

// Gestionar la conexión a la BD
class dbClient {
    constructor(){
        this.conectarBaseDatos(); // cuando la app hace import dbClient from ... se crea el objeto y se llama a conectarBaseDatos()
    }
    // Es async porque conectar a una base de datos tarda tiempo y así Node.js no se queda bloqueado esperando
    // Uso una cadena de conexión con variables de entorno para no exponer credenciales
    // Mongoose se conecta a MongoDB Atlas, verifica usuario y contraseña, abre un canal de comunicación y guarda la conexión internamente
    async conectarBaseDatos(){
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/adopcion?appName=adopcion`; 
        await mongoose.connect(queryString);
        console.log('Conectado a la base de datos');
    }

    // Método para cerrar la conexión
    async cerrarConexion(){
        try {
            await mongoose.disconnect();
            console.log("Conexión a la base de datos cerrada");
        } catch (error) {
            console.error("Error al cerrar la conexión:", error);
        }
    }
}

export default new dbClient(); // creo una instancia de la clase y la exporto para que otros archivos la usen