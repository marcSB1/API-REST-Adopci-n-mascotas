// Este archivo habla directamente con MongoDB (inserta, actualiza, borra y lee datos)
import mongoose from 'mongoose';
import Usuario from "../schemas/usuarios.js";
class usuariosModel {
    // Método que recibe un objeto Usuario (viene del controlador), lo valida contra el schema y si todo está bien lo guarda en MongoDB
    // Devuelve el usuario creado
    async create(usuario) {
        return await Usuario.create(usuario);
    }

    // Método que convierte el id que llega como string desde la URL en un ObjectId (new mongoose.Types.ObjectId(id))
    // findOneAndUpdate busca el usuario por _id, actualiza los campos enviados, y devuelve el usuario ya actualizado
    async update(id, usuario) {
        return await Usuario.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, usuario, { new: true });
    }

    // Método que convierte el id que llega como string desde la URL en un ObjectId (new mongoose.Types.ObjectId(id))
    // Busca un usuario por su ID , lo elimina de la base de datos y devuelve el usuario eliminado, si no existe devuelve null
    async delete(id) {
        return await Usuario.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) }); // busco por el id y lo elimino
    }

    // Método que busca todos los usuarios, devuelve un array
    async getAll() {
        return await Usuario.find();
    }

    // Método que busca un usuario por su ID, devuelve un solo objeto, si no existe devuelve null
    async getOneById(id) {
        return await Usuario.findById(id);
    }

    // Método que busca el primer usuario con ese mail, devuelve el usuario o null
    async getOne(filtro) {
        return await Usuario.findOne(filtro);
    }

    
}

// creo una instancia, la exporto para que el controlador pueda usar usuariosModel.getAll()
export default new usuariosModel();
