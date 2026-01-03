/**
**CONSIGNA:**
Tenés 3 objetos que representan productos y una función `mostrarProducto` que NO está dentro de ningún objeto.

Usá `call()` para:
1. Mostrar el producto 1
2. Mostrar el producto 2
3. Mostrar el producto 3 con descuento del 20%
 */

// ============================================
// OBJETOS
// ============================================

const producto1 = {
  nombre: "Laptop",
  precio: 1200,
  categoria: "Electrónica"
};

const producto2 = {
  nombre: "Zapatillas",
  precio: 80,
  categoria: "Ropa"
};

const producto3 = {
  nombre: "Cafetera",
  precio: 50,
  categoria: "Hogar"
};

// ============================================
// FUNCIÓN (NO está en ningún objeto)
// ============================================

function mostrarProducto() {
  console.log(`Producto: ${this.nombre}`);
  console.log(`Categoría: ${this.categoria}`);
  console.log(`Precio: $${this.precio}`);
}

function mostrarProductoConDescuento(porcentaje) {
  const descuento = this.precio * (porcentaje / 100);
  const precioFinal = this.precio - descuento;

  console.log(`Producto: ${this.nombre}`);
  console.log(`Precio original: $${this.precio}`);
  console.log(`Descuento: ${porcentaje}%`);
  console.log(`Precio final: $${precioFinal}`);
}

// ============================================
// TU CÓDIGO AQUÍ
// ============================================

// 1. Llamar mostrarProducto para producto1 usando call()
mostrarProducto.call(producto1);

// 2. Llamar mostrarProducto para producto2 usando call()
mostrarProducto.call(producto2);

// 3. Llamar mostrarProductoConDescuento para producto3 con 20% usando call()
// mostrarProducto();
mostrarProductoConDescuento.call(producto3, 20);
