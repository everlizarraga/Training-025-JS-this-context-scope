/**
**CONSIGNA:**
Tenés una función genérica `aplicarDescuento` que calcula precios con descuento.

Usá bind() para crear funciones especializadas:
1. `descuento10` - Siempre aplica 10% de descuento
2. `descuento25` - Siempre aplica 25% de descuento
3. `descuentoBlackFriday` - Aplica 50% de descuento en categoría "Electrónica"
 */

// ============================================
// FUNCIÓN GENÉRICA
// ============================================

function aplicarDescuento(porcentaje, precio, producto) {
  const descuento = precio * (porcentaje / 100);
  const precioFinal = precio - descuento;

  console.log(`Producto: ${producto}`);
  console.log(`Precio original: $${precio}`);
  console.log(`Descuento ${porcentaje}%: -$${descuento}`);
  console.log(`Precio final: $${precioFinal}`);
  console.log('---');

  return precioFinal;
}

// ============================================
// TU CÓDIGO AQUÍ - PARTE 1
// ============================================

// Crear función con 10% fijo
const descuento10 = aplicarDescuento.bind(null, 10)
// function descuento10() {
//   const algo = aplicarDescuento.bind(null, 10)
//   return algo(...arguments)
// }
// function descuento10() {
//   return aplicarDescuento.bind(null, 10)(...arguments);
// }

// Crear función con 25% fijo
const descuento25 = aplicarDescuento.bind(null, 25);

// Probar las funciones especializadas
console.log("=== DESCUENTO 10% ===");
descuento10(100, "Teclado");

console.log("\n=== DESCUENTO 25% ===");
descuento25(100, "Mouse");

// ============================================
// PARTE 2: Función con múltiples argumentos fijos
// ============================================

function aplicarDescuentoPorCategoria(categoria, porcentaje, precio, producto) {
  console.log(`Categoría: ${categoria}`);

  const descuento = precio * (porcentaje / 100);
  const precioFinal = precio - descuento;

  console.log(`Producto: ${producto}`);
  console.log(`Precio original: $${precio}`);
  console.log(`Descuento ${porcentaje}%: -$${descuento}`);
  console.log(`Precio final: $${precioFinal}`);
  console.log('---');

  return precioFinal;
}

// TU CÓDIGO AQUÍ - PARTE 2:
// Crear función Black Friday: categoría "Electrónica" + 50% descuento
const descuentoBlackFriday = aplicarDescuentoPorCategoria.bind(null, "Electronica", 50);

// Probar
console.log("\n=== BLACK FRIDAY (Electrónica 50%) ===");
descuentoBlackFriday(1200, "Laptop");
descuentoBlackFriday(800, "Tablet");

