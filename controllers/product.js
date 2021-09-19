// Importo la clase Product y la configuración de la base de datos. 
const Product = require('../models/Product');
const dbConnection = require('../config/db');
// Función controladora createProduct, conecta a la base de datos, después se inserta en la colección una nueva instancia new Product() pasándole el precio, el nombre y el stock que nos llega en el cuerpo de la petición. Se hace uso de async/await para esperar que la operación de inserción se complete y esto se hace dentro de un try/catch para poder capturar un posible error. 
function createProduct(req, res) {
  dbConnection.connect(async err => {
    const collection = dbConnection.db("backoffice").collection("products");
    try {
    await collection.insertOne(new Product(req.body.price, req.body.name, req.body.stock));
    res.status(200).json({"created": 'OK'});
    } catch (error) {
      console.log(error);
      res.status(404).json({"created": 'KO'});
    }
    dbConnection.close();
  });
}
// Función controladora deleteProduct, conecta con la base de datos y hace un find and delete de producto con el nombre que llega en el cuerpo de la petición. Se hace con async/await y con try/catch igual que arriba. 
function deleteProduct(req, res) {
  dbConnection.connect(async err => {
    const collection = dbConnection.db("backoffice").collection("products");
    try {
    await collection.findOneAndDelete({name: req.body.name});
    res.status(200).json({"deleted": 'OK'});
    } catch (error) {
      console.log(error);
      res.status(404).json({"deleted": 'KO'});
    }
    dbConnection.close();
  });
}

module.exports = {createProduct, deleteProduct};