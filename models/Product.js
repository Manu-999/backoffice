// Clase Producto para crear nuevas instancias (nuevos productos), con un constructor que requiere que se le indique precio, nombre y stock.
class Product {
  constructor(price, name, stock) {
    this.price = price;
    this.name = name;
    this.stock = stock;
  }
  sales = 0;
}

module.exports = Product;