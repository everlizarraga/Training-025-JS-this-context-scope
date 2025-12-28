/**
**CONSIGNA:**
Creá una factory function `crearProducto` que simule un producto con stock:
1. Parámetros: `nombre`, `precio`, `stockInicial`
2. Datos privados: `_nombre`, `_precio`, `_stock`
3. Métodos públicos:
  - `vender(cantidad)` - reduce stock si hay suficiente
  - `reabastecer(cantidad)` - aumenta stock
  - `verStock()` - retorna stock actual
  - `verPrecio()` - retorna precio
  - `verInfo()` - muestra toda la info
4. Creá 2 productos y probá los métodos
 */

function crearProducto(nombre, precio, stockInicial) {
  // 1. Datos privados
  // TU CÓDIGO AQUÍ
  let _nombre = nombre;
  let _precio = precio;
  let _stock = stockInicial;

  return {
    // 2. Método vender
    vender: function (cantidad) {
      // Verificar si hay stock suficiente
      // Si hay: restar del stock y mostrar mensaje
      // Si no: mostrar error
      // TU CÓDIGO AQUÍ
      if(cantidad > _stock) {
        console.error(`ERROR: Stock insuficiente`);
        return;
      }
      _stock -= cantidad;
      console.log(`Vendido: ${cantidad} [Stock: ${_stock}]`);
    },

    // 3. Método reabastecer
    reabastecer: function (cantidad) {
      // Sumar cantidad al stock
      // Mostrar mensaje
      // TU CÓDIGO AQUÍ
      if(cantidad < 0) {
        console.error('ERROR: No se aceptan cantidades negativas');
        return;
      }
      _stock += cantidad;
      console.log(`Reabastecido: ${cantidad}u  [Stock: ${_stock}u]`);
    },

    // 4. Método verStock
    verStock: function () {
      // Retornar stock
      // TU CÓDIGO AQUÍ
      return _stock;
    },

    // 5. Método verPrecio
    verPrecio: function () {
      // Retornar precio
      // TU CÓDIGO AQUÍ
      return _precio;
    },

    // 6. Método verInfo
    verInfo: function () {
      // Mostrar nombre, precio y stock
      // TU CÓDIGO AQUÍ
      console.log(`Nombre: ${_nombre} | Precio: $${_precio} | Stock: ${_stock}u`);
    }
  };
}

// 7. Crear dos productos
const laptop = crearProducto("Laptop", 1000, 5);
const mouse = crearProducto("Mouse", 20, 50);

// Probar métodos
laptop.verInfo();
laptop.vender(2);
laptop.vender(10);  // Error: no hay stock
laptop.reabastecer(10);
console.log("Stock actual de laptop:", laptop.verStock());

mouse.vender(30);
mouse.verInfo();

