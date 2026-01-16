// este archivo es el punto de entrada de la API (arranca el servidor, configura express, 
// conecta la base de datos, carga las rutas, deja la API escuchando peticiones)
import 'dotenv/config' // carga de variables de entorno
import express from 'express'; // framework que crea el servidor HTTP
import routesMascotas from './routes/mascotas.js' // grupo de rutas
import routesUsuarios from './routes/usuarios.js' // grupo de rutas
import bodyParser from 'body-parser'; // permite leer el cuerpo de las peticiones y convertir JSON en objetos JS
import dbClient from './config/dbClient.js'; // se crea la instancia de dbClient, se ejecuta su constructor y se conecta automáticamente a MongoDB

const app = express(); // creo una instancia de Express

app.use(bodyParser.json()); // indico que los datos sean procesados como json
app.use(bodyParser.urlencoded({extended: true})); // permito que Express entienda formularios

app.use('/pets', routesMascotas); // le indico que use las rutas
app.use('/users', routesUsuarios);

// inicio el servidor, abre el puerto y empieza a escuchar peticiones
try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log('Servidor activo en el puerto ' + PORT));
} catch (error) {
    console.error(error);
}

// se ejecuta cuando pulso CTRL + C, cierra la conexión con MongoDB
process.on('SIGINT', async() => {
    dbClient.cerrarConexion();
    process.exit(0);
});