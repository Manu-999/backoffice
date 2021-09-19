// Se importa el router de express y lo controllers de pago
const router = require('express').Router();
const paymentController = require('../controllers/payment');
// Se crean las rutas para pago y reembolso y se les pasa la función controladora correspondiente. 
router.post('/pay', paymentController.pay);
router.post('/refund', paymentController.refund);

module.exports = router;