/**
### 🎯 CONSIGNA:

Este ejercicio integra **TODO** lo que aprendiste en las 4 fases:
- Scope y Closures (Fase 1 y 2)
- This (Fase 3)
- Call/Apply/Bind (Fase 4)

Vas a crear un **sistema de gestión de pedidos** con:
- Factory functions (closures)
- Métodos que usan "this" correctamente
- Method borrowing
- Decorators para logging y validación
 */

// ============================================
// SISTEMA DE GESTIÓN DE PEDIDOS
// ============================================

// ============================================
// PARTE 1: Factory de Pedidos (Closures)
// ============================================

/**
 * @typedef {Object} Producto 
 * @property {string} nombre
 * @property {number} precio
 * @property {number} cantidad
*/

function crearPedido(id, cliente) {
  // Estado privado (closure)
  /**@type {Producto[]} */
  let productos = [];
  let total = 0;

  return {
    // TU CÓDIGO AQUÍ:
    // Métodos públicos que necesitas implementar:

    agregarProducto: function (nombre, precio, cantidad) {
      // 1. Crear objeto producto
      // 2. Agregarlo a productos
      // 3. Actualizar total
      // 4. Retornar this para chaining
      /**@type {Producto} */
      const producto = {
        nombre: nombre,
        precio: precio,
        cantidad: cantidad
      };
      productos.push(producto);
      total = productos.reduce((s, e) => s + e.cantidad * e.precio, 0);
      return this;
    },

    obtenerTotal: function () {
      // Retornar total
      return total;
    },

    obtenerResumen: function () {
      // Retornar objeto con: id, cliente, productos, total
      return {
        id: id,
        cliente: cliente,
        productos: [...productos],
        total: total
      }
    },

    aplicarDescuento: function (porcentaje) {
      // Reducir total según porcentaje
      // Retornar this para chaining
      total = total * (100 - porcentaje) / 100;
      return this;
    }
  };
}

// ============================================
// PARTE 2: Sistema de Envío (This)
// ============================================

const sistemaEnvio = {
  empresa: "FastShip",
  tarifaBase: 10,

  // TU CÓDIGO AQUÍ:
  calcularEnvio: function (peso, distancia) {
    // Formula: tarifaBase + (peso * 0.5) + (distancia * 0.1)
    // Mostrar: "Envío {empresa}: $XX"
    const rpta = this.tarifaBase + (peso * 0.5) + (distancia * 0.1);
    console.log(`Envío ${this.empresa}: ${rpta}`);
    return rpta;
  },

  generarEtiqueta: function (pedido) {
    // Usar this.empresa
    // Mostrar info del pedido
    console.log(`Empresa: ${this.empresa}
      Pedido: ${pedido}`);
  }
};

// ============================================
// PARTE 3: Method Borrowing
// ============================================

const sistemaEnvioExpress = {
  empresa: "ExpressShip",
  tarifaBase: 20
  // NO tiene métodos, los va a "prestar" de sistemaEnvio
};

// TU CÓDIGO AQUÍ:
// Usar calcularEnvio de sistemaEnvio en sistemaEnvioExpress


// ============================================
// PARTE 4: Decorators
// ============================================

function loggingDecorator(funcion) {
  // TU CÓDIGO AQUÍ:
  // Wrapper que loggea cuando se llama la 
  return function(...args) {
    // Obtener nombre de la función (si tiene)
    const nombreFuncion = funcion.name || 'función';
    
    console.log(`[LOG] Llamando ${nombreFuncion} con:`, args);
    const rpta = funcion.apply(this, args);
    console.log(`[LOG] Función terminó. Resultado:`, rpta);
    return rpta;
  };
}

function validacionDecorator(funcion) {
  // TU CÓDIGO AQUÍ:
  // Validar que precio > 0 y cantidad > 0
  return function (nombre, precio, cantidad) {  // ✅ 3 parámetros
    // Validar que precio > 0 y cantidad > 0
    if (precio <= 0) {
      throw new Error("El precio debe ser mayor a 0");
    }
    if (cantidad <= 0) {
      throw new Error("La cantidad debe ser mayor a 0");
    }

    // Mostrar validación OK
    console.log(`[VALIDACIÓN] OK - precio: ${precio}, cantidad: ${cantidad}`);

    // Ejecutar función original con los 3 parámetros
    return funcion.apply(this, [nombre, precio, cantidad]);
  };
}

// ============================================
// PRUEBAS
// ============================================

console.log("=== CREANDO PEDIDO ===");
const pedido1 = crearPedido(1, "Juan Pérez");

// Agregar productos (debería permitir chaining)
pedido1
  .agregarProducto("Laptop", 1200, 1)
  .agregarProducto("Mouse", 25, 2)
  .agregarProducto("Teclado", 80, 1);

console.log("Total:", pedido1.obtenerTotal());  // 1380

// Aplicar descuento
pedido1.aplicarDescuento(10);  // 10% de descuento
console.log("Total con descuento:", pedido1.obtenerTotal());  // 1242

// Resumen
console.log("\nResumen:", pedido1.obtenerResumen());

// ============================================
// Calcular envío
console.log("\n=== ENVÍO ===");
sistemaEnvio.calcularEnvio(5, 100);  // peso 5kg, distancia 100km

// Method borrowing
sistemaEnvio.calcularEnvio.call(sistemaEnvioExpress, 5, 100);

// ============================================
// Decorators
console.log("\n=== CON DECORATORS ===");
const agregarConLog = loggingDecorator(pedido1.agregarProducto.bind(pedido1));
const agregarConValidacion = validacionDecorator(agregarConLog);

agregarConValidacion("Audífonos", 50, 1);

