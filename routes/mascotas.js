// Decide qué método del controlador se ejecuta según la URL y el método HTTP
import express from 'express';
const route = express.Router(); // Router de Express para agrupar rutas de usuarios
import mascotaController from '../controllers/mascotas.js' // importo la clase mascotasController para usar sus métodos get post put delete
import { verificarToken } from '../helpers/autenticacion.js';

route.post('/', mascotaController.create);
route.get('/:id', mascotaController.getOne);
route.get('/', mascotaController.getAll);
route.put('/:id', verificarToken, mascotaController.update);
route.delete('/:id', verificarToken, mascotaController.delete);

export default route;
