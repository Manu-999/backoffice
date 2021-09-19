// Se importa los controllers de producto y el router de express
const productController = require('../controllers/product');
const router = require('express').Router();
// Se crean las rutas para añadir y borrar productos y se les pasa la función controladora correspondiente. 
router.post('/add-product', productController.createProduct);
router.post('/delete-product', productController.deleteProduct);

module.exports = router;