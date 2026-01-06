// este archivo es el punto de entrada de la API (arranca el servidor, configura express, carga las rutas, deja la API escuchando peticiones)
import 'dotenv/config' // carga de variables de entorno
import express from 'express'; // framework que crea el servidor HTTP
import routesMascotas from './routes/mascotas.js' // grupo de rutas
import bodyParser from 'body-parser'; // permite leer el cuerpo de las peticiones

const app = express(); // creo una instancia de express

app.use(bodyParser.json()); // indico que los datos sean procesados como json
app.use(bodyParser.urlencoded({extended: true})); // permito que Express entienda formularios

app.use('/mascotas', routesMascotas); // le indico que use las rutas

// inicio el servidor
try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log('Servidor activo en el puerto ' + PORT));
} catch (error) {
    console.error(error);
}


// TUTORIAL 1: https://www.youtube.com/watch?v=BfYOo5yjeWk&list=PLC1WMptQ1CNDzOj8V_MS0m8-LVCUH-O3p&index=13
// TUTORIAL 2: https://www.youtube.com/watch?v=BKlcgxNYOfI&list=PLC1WMptQ1CNDzOj8V_MS0m8-LVCUH-O3p&index=14
// 2:11

