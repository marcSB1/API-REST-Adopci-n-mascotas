// este archivo recibe las peticiones HTTP, llama al modelo de mascotas y devuelve la respuesta al cliente
import mascotasModel from '../models/mascotas.js'; // conexión con el modelo

class mascotasController {
    constructor() {

    }

    // método que se usa cuando el cliente hace POST /mascotas
    async create(req, res) {
        const { nombre, tipo, raza, edad, descripcion, adoptado } = req.body; // destructuring para que swagger detecte los campos exactos
        try {
            const data = await mascotasModel.create({ nombre, tipo, raza, edad, descripcion, adoptado }); // le digo al modelo que cree una mascota con los datos que llegan del cliente, await espera a que MongoDB termine
            res.status(201).json(data); // devuelvo la mascota creada
        } catch (error) {
            res.status(500).send(error);
            console.error(error);
        }
    }

    // método que se usa cuando el cliente hace PUT /mascotas/:id
    async update(req, res) {
        const { nombre, tipo, raza, edad, descripcion, adoptado } = req.body; // destructuring para que swagger detecte los campos exactos
        try {
            const { id } = req.params; // obtengo el id
            const data = await mascotasModel.update(id, { nombre, tipo, raza, edad, descripcion, adoptado }); // le digo al modelo que actualice una mascota con los datos que llegan del cliente, await espera a que MongoDB termine
            res.status(201).json(data); // devuelvo la mascota actualizada
        } catch (error) {
            res.status(500).send(error);
            console.error(error);
        }
    }

    // método que se usa cuando el cliente hace DELETE /mascotas/:id
    async delete(req, res) {
        try {
            const { id } = req.params; // obtengo el id
            const data = await mascotasModel.delete(id); // llamada al modelo
            res.status(206).json(data);
        } catch (error) {
            res.status(500).send(error);
            console.error(error);
        }
    }

    // método que se usa cuando el cliente hace GET /mascotas
    async getAll(req, res) {
        try {
            const data = await mascotasModel.getAll(); // llamada al modelo, el modelo hace un find()
            res.status(201).json(data); // devuelve un array de mascotas
        } catch (error) {
            res.status(500).send(error);
            console.error(error);
        }
    }

    // método que se usa cuando el cliente hace GET /mascotas/:id
    async getOne(req, res) {
        try {
            const { id } = req.params; // leo el id de la URL
            const data = await mascotasModel.getOne(id); // llamada al modelo
            res.status(201).json(data); // devuelve una sola mascota
        } catch (error) {
            res.status(500).send(error);
            console.error(error);
        }
    }
}

export default new mascotasController();