// Decide qué método del controlador se ejecuta según la URL y el método HTTP
import express from 'express';
const route = express.Router(); // Router de Express para agrupar rutas de usuarios
import usuariosController from '../controllers/usuarios.js' // Controlador con la lógica de usuarios
import { verificarToken } from '../helpers/autenticacion.js'; // Middleware para comprobar JWT

// Ruta pública: registro de usuario
// POST /usuarios/register
route.post('/register', usuariosController.register);

// Ruta pública: login de usuario
// POST /usuarios/login
route.post('/login', usuariosController.login);

// Ruta privada: perfil del usuario autenticado
// GET /usuarios/profile
// Primero se ejecuta verificarToken y, si el token es válido, se ejecuta el controlador
route.get('/profile', verificarToken, usuariosController.profile);


export default route;