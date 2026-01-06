// este archivo habla directamente con MongoDB (inserta, actualiza, borra y lee datos)
// MongoDB usa _id de tipo ObjectId, cuando el id llega por la URL, llega como string, hay que convertirlo a ObjectId para poder buscarlo
import { ObjectId } from "mongodb";
import dbClient from "../config/dbClient.js" // conexión a MongoDB
class mascotasModel {
     async create(mascota) {
        const colMascotas = dbClient.db.collection('mascotas'); // accedo a la colección
        return await colMascotas.insertOne(mascota);  // inserta el objeto recibido, MongoDB devuelve insertedId y acknowledged, el controlador recibe el resultado y lo envía al cliente
     }

     async update(id, mascota) {
      const colMascotas = dbClient.db.collection('mascotas'); // accedo a la colección 
        return await colMascotas.updateOne({_id: new ObjectId(id)}, { $set: mascota}); // el id llega como texto desde la URL, lo convierto a ObjectId, $set actualiza solo los campos enviados, MongoDB devuelve matchedCount y modifiedCount
     }

     async delete(id) {
      const colMascotas = dbClient.db.collection('mascotas'); // accedo a la colección 
        return await colMascotas.deleteOne({_id: new ObjectId(id)}); // el id llega como texto desde la URL, lo convierto a ObjectId, busco por _id y borro el documento, MongoDB devuelve deletedCount
     }

     async getAll(){
      const colMascotas = dbClient.db.collection('mascotas'); // accedo a la colección 
      return await colMascotas.find({}).toArray(); // find({}) busca todos, toArray() convierte el cursor en array, devuelve una lista de mascotas
     }

     async getOne(id){
      const colMascotas = dbClient.db.collection('mascotas'); // accedo a la colección 
      return await colMascotas.findOne({_id: new ObjectId(id)}); // busca una sola mascota por id, devuelve el documento o null
     }
}

export default new mascotasModel;