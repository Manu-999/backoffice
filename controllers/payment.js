// Se importan los servicios de la pasarela y la conficuración de la base de datos. 
const pgateway = require('../services/pgateway');
const dbConnection = require('../config/db');
// Función controladora pay. Recoge del .env las pasarelas de pago configuradas en la aplicación, las pasa a un array y se aplica el método find para encontrar la que se requiere para el pago en la petición. 
function pay(req, res) {
  const gateways = process.env.gateways.split(', ');
  const pgFound = gateways.find(el => el === req.body.pg);
// Se conecta con la base de datos y se busca el producto que viene en el cuerpo de la petición. 
  dbConnection.connect(async err => {
    const collection = dbConnection.db("backoffice").collection("products");
    try {
      const productFound = await collection.findOne({name: req.body.name});
// Se comprueba que la pasarela que se requiere usar existe en la configuración y que el servicio no devuelve estado OFF. Se llama al servicio de pasarela, utilizando el método pay() de la pasarela requrida. Se hace un find and update en la base de datos para actualiar las ventas y el stock del producto vendido. Se hace con async/await para esperar a que la operación se complete y todo dentro de try/catch para capturar un posible error. 
      if (!!pgFound && pgateway[pgFound] !== 'off') {
        pgateway[pgFound].pay(productFound.price, req.body.pg);
        await collection.findOneAndUpdate({name: req.body.name}, {$set: {sales: productFound.sales + 1, stock: productFound.stock - 1}}, { upsert: true });
        res.status(200).json({"payment": 'OK'});
      } else {
        res.status(404).json({error: "Payment Gateway not available"});
      }

    } catch (error) {
      console.log(error);
      res.status(404).json({"payment": 'KO'});
    }

    dbConnection.close();
  })
}
// Función refund. Se hace la misma operación de comprobar que la pasarela requerida para la operación está configurada en la aplicación.
function refund(req, res) {
  const gateways = process.env.gateways.split(', ');
  const pgFound = gateways.find(el => el === req.body.pg);
// Se conecta a la base de datos y se busca el producto en base al nombre. Se comprueba si la petición llega con un porcentaje de reembolso superior a 0 para hacer un reembolso parcial. Si es 0 se hace un reembolso total llamando al método refund() de la pasarela requerida y se actualiza el producto en base de datos. 
  dbConnection.connect(async err => {
    const collection = dbConnection.db("backoffice").collection("products");
    try {
      const productFound = await collection.findOne({name: req.body.name});

      if (req.body.percentage) {
        pgateway.pgateway_1.partialRefund(productFound.price, req.body.percentage);
        res.status(200).json({reimburse: 'OK'});
      } else if (!!pgFound && pgateway[pgFound] !== 'off') {
        pgateway[pgFound].refund(productFound.price);
        await collection.findOneAndUpdate({name: req.body.name}, {$set: {sales: productFound.sales - 1}}, { upsert: true });
        res.status(200).json({refund: 'OK'});
      } else {
        res.status(404).json({error: 'Reimburse not available. Gateway not available.'});
      }

    } catch (error) {
      console.log(error);
      res.status(404).json({refund: 'KO'});
    }

  dbConnection.close();
  })
}

module.exports = {pay, refund};
