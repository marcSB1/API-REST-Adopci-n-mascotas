// este archivo controla que método del controlador usar si alguien llama a la URL con un método HTTP
import express from 'express';

// constante para gestionar las rutas
const route = express.Router();

// importo la clase mascotasController para usar sus métodos get post put delete
import mascotaController from '../controllers/mascotas.js'

route.post('/', mascotaController.create);
route.get('/:id', mascotaController.getOne);
route.get('/', mascotaController.getAll);
route.put('/:id', mascotaController.update);
route.delete('/:id', mascotaController.delete);

export default route;
