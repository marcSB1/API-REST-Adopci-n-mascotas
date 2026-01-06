import 'dotenv/config'
import { MongoClient } from "mongodb";

// Gestionar la conexión a la BD
class dbClient {
    // Uso una cadena de conexión con variables de entorno para no exponer credenciales
    // Creo el cliente (objeto que sabe como hablar con MongoDB)
    // En cuanto se instancia la clase, intenta conectarse a MongoDB
    constructor(){
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/?appName=adopcion`; 
        this.client = new MongoClient(queryString);
        this.conectarBD();
    }

    // Abre la conexión con MongoDB (verifica usuario y contraseña, acepta/rechaza la conexión, abre un canal de comunicación)
    // Uso await para bloquear el programa hasta que MongoDB acepte la conexión
    // Guardo el acceso a la base de datos para usarla luego
    async conectarBD() {
        try {
            await this.client.connect();
            this.db = this.client.db('adopcion');
            console.log("Conectado al servidor de base de datos");
            
        } catch (error) {
            console.error(error);
        }
    }
}

export default new dbClient;