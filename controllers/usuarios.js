// este archivo recibe las peticiones HTTP, llama al modelo de usuarios y devuelve la respuesta al cliente
import { generarToken } from "../helpers/autenticacion.js"; // crea un JWT (para que el usuario acceda a rutas privadas sin pedir email y clave cada vez)
import usuariosModel from "../models/usuarios.js"; // conexión con el modelo
import bcrypt from 'bcrypt'; // permite encriptar contraseñas y compararlas sin desencriptarlas


class usuariosController {
    constructor() { }

    // método que se ejecuta cuando el cliente hace POST /usuarios/register
    async register(req, res) {
        try {
            const { email, nombre, telefono, clave } = req.body; // destructuring de los datos del cliente

            const usuarioExiste = await usuariosModel.getOne({ email }) // getOne devuelve el primer usuario con ese mail

            if (usuarioExiste) {
                return res.status(400).json({ error: 'El usuario ya existe' }); // si el usuario ya existe para la ejecución y responde al cliente
            }

            const claveEncryptada = await bcrypt.hash(clave, 10); // encripta la contraseña

            const data = await usuariosModel.create({
                email,
                nombre,
                telefono,
                clave: claveEncryptada
            }); // le digo al modelo que cree un usuario con los datos que llegan del cliente y la contraseña encriptada, await espera a que MongoDB termine

            res.status(201).json(data); // devuelvo el usuario creado
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    }

    // método que se ejecuta cuando el cliente hace POST /usuarios/login
    async login(req, res) {
        const { email, clave } = req.body; // destructuring de los datos del cliente

        const usuarioExiste = await usuariosModel.getOne({ email }) // getOne devuelve el primer usuario con ese mail

        if (!usuarioExiste) {
            return res.status(400).json({ error: 'El usuario no existe' }); // si el usuario no existe para la ejecución y responde al cliente
        }

        const claveValida = await bcrypt.compare(clave, usuarioExiste.clave); // comparo la clave escrita con la clave encriptada guardada

        if (!claveValida) {
            return res.status(400).json({ error: 'Clave no válida' }); // si la clave no coincide para la ejecución y responde al cliente
        }

        const token = generarToken(email); // el servidor crea un pase de acceso para el usuario, dice este usuario es mail, caduca en 1h

        return res.status(200).json({ msg: 'Usuario autenticado', token }); // respuesta al cliente
    }

    async profile(req, res) {
        try {
            console.log(req.emailConectado);
            const data = await usuariosModel.getOne({ email: req.emailConectado }); // busca al usuario, con el mail que viene del token que he validado en el middleware verificarToken, en la bd
            res.status(201).json(data);
        } catch (error) {
            res.status(500).send(error);
            console.error(error);
        }
    }
}

export default new usuariosController();