/**
**CONSIGNA:**
Creá funciones con partial application:
1. `crearDescuento(porcentaje)` que retorna función que aplica ese descuento a un precio
2. `crearImpuesto(pais)` que retorna función que aplica impuesto según país:
  - Argentina: 21%
  - USA: 8%
  - España: 21%
3. Probá crear funciones pre-configuradas y usarlas
 */

// 1. Función para descuentos
function crearDescuento(porcentaje) {
  return function (precio) {
    // Calcular precio con descuento
    // TU CÓDIGO AQUÍ
    return precio * (100 - porcentaje) / 100;
  };
}

// 2. Función para impuestos
function crearImpuesto(pais) {
  return function (precio) {
    // Determinar tasa según país
    // Calcular precio con impuesto
    // TU CÓDIGO AQUÍ
    let inpuesto;
    switch (pais) {
      case 'Argentina':
        inpuesto = 0.21;
        break;
      case 'USA':
        inpuesto = 0.08;
        break;
      case 'España':
        inpuesto = 0.21;
        break;
    
      default:
        break;
    }
    return precio  * (1 + inpuesto);
  };
}

// 3. Crear funciones pre-configuradas
const descuento10 = crearDescuento(10);
const descuento25 = crearDescuento(25);

const impuestoAR = crearImpuesto("Argentina");
const impuestoUSA = crearImpuesto("USA");

// 4. Probar
console.log("$100 con 10% descuento:", descuento10(100));
console.log("$200 con 25% descuento:", descuento25(200));

console.log("$100 con impuesto AR:", impuestoAR(100));
console.log("$100 con impuesto USA:", impuestoUSA(100));


