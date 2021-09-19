// Clase genérica Gateway para instanciar pasarelas de pago. El constructor requiere una clave pública y una privada que servirían para conectar a la pasarela de pago real vía API. Tiene dós métodos, pay() y refund().
class Gateway {
  constructor(apiKeyPublic, apiKeySecret) {
    this.publicKey = apiKeyPublic;
    this.secretKey = apiKeySecret;
  }

  pay(amount, pg) {
    console.log(`Thanks, we've correctly received ${amount}€ from PAYMENT GATEWAY: ${pg}`);
  };

  refund(amount) {console.log(`Here is your refund for ${amount}€`);};
}
// Clase específica heredada de la clase padre Gateway. Añade un método específico además de todo lo que tiene la clase padre. 
class Pgateway_1 extends Gateway {
  constructor(publicKey, secretKey) {
    super(publicKey, secretKey);
  }

  partialRefund(total, percentage) {
    const reimburse = (total * percentage) / 100;
    console.log(`Here is your ${percentage}% refund: ${reimburse}€`);
  }
}

module.exports = {Gateway, Pgateway_1};
