// Este archivo habla directamente con MongoDB (inserta, actualiza, borra y lee datos)
import mongoose from 'mongoose';
import Mascota from "../schemas/mascotas.js";
class mascotasModel {
  // Método que recibe un objeto mascota (viene del controlador), lo valida contra el schema y lo guarda en MongoDB
  async create(mascota) {
    return await Mascota.create(mascota);
  }

  // Método que convierte el id que llega como string desde la URL en un ObjectId (new mongoose.Types.ObjectId(id))
  // findOneAndUpdate busca la mascota por _id, actualiza los campos enviados, y devuelve la mascota ya actualizada
  async update(id, mascota) {
    return await Mascota.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, mascota, { new: true });
  }

  // Método que convierte el id que llega como string desde la URL en un ObjectId (new mongoose.Types.ObjectId(id))
  // Busca una mascota por su ID , la elimina de la base de datos y devuelve la mascota eliminada, si no existe devuelve null
  async delete(id) {
    return await Mascota.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) }); // busco por el id y lo elimino
  }

  // Método que busca todas las mascotas, devuelve un array
  async getAll() {
    return await Mascota.find();
  }

  // Método que busca una mascota por su ID, devuelve un solo objeto, si no existe devuelve null
  async getOne(id) {
    return await Mascota.findById(id);
  }
}

// creo una instancia, la exporto para que el controlador pueda usar mascotasModel.getAll()
export default new mascotasModel();
