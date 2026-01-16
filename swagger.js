// este archivo lee la API (rutas, métodos, comentarios), genera un archivo llamado swagger.json, ese archivo lo usa Swagger UI para mostrar /doc
import swaggerAutogen from 'swagger-autogen'; // esta libreria lee mi código, detecta rutas (GET, POST, etc), y genera el JSON de documentación

const outputFile = './swagger.json'; // archivo que va a crear en la raíz del proyecto
const endPointsFiles = ['./app.js']; // le indico que empieze a leer desde app.js para encontrar las rutas de mi API

// información general de la API
const doc = {
    info: {
        title: 'API de Adopción de mascotas',
        description: 'Esta API permite gestionar mascotas y usuarios'
    },
    host: 'localhost:5100',
    scheme: ['http']
}

// inicializo la libreria swaggerAutogen, le indico que analice el archivo app.js, use la información en doc y genere el resultado en swagger.json
swaggerAutogen()(outputFile, endPointsFiles, doc); 