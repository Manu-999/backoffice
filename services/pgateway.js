// Se requiere la clase Gateway
const gateways = require('../models/Gateway');

// Aquí se crean nuevas pasarelas de pago en base a las que hay configuradas en el .env de nuestra aplicación. 
const pgateway_1 = process.env.PG1 === 'on'
                 ? new gateways.Pgateway_1('public1', process.env.SECRET1) 
                 : 'off';
const pgateway_2 = process.env.PG2 === 'on' 
                 ? new gateways.Gateway('public2', process.env.SECRET2) 
                 : 'off';
const stripe = process.env.STRIPE === 'on' 
             ? new gateways.Gateway('public_stripe', process.env.SECRET_STRIPE) 
             : 'off';

module.exports = {pgateway_1, pgateway_2, stripe};
