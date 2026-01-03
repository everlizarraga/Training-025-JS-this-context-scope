/**
**CONSIGNA:**
Tenés un objeto `estadisticas` y funciones que calculan diferentes métricas a partir de arrays de números.

Usá `apply()` para:
1. Calcular el promedio de un array de calificaciones
2. Encontrar el valor máximo de un array de ventas
3. Calcular el total de un array de gastos
 */

// ============================================
// OBJETO
// ============================================

const estadisticas = {
  nombre: "Estadísticas del Mes",
  mes: "Enero"
};

// ============================================
// FUNCIONES
// ============================================

function calcularPromedio(/* cantidad variable de argumentos */) {
  // arguments es un objeto parecido a array con todos los argumentos
  console.log(`${this.nombre} - ${this.mes}`);

  let suma = 0;
  for (let i = 0; i < arguments.length; i++) {
    suma += arguments[i];
  }

  const promedio = suma / arguments.length;
  console.log(`Promedio: ${promedio}`);
  return promedio;
}

function encontrarMaximo() {
  console.log(`${this.nombre} - ${this.mes}`);

  let max = arguments[0];
  for (let i = 1; i < arguments.length; i++) {
    if (arguments[i] > max) {
      max = arguments[i];
    }
  }

  console.log(`Máximo: ${max}`);
  return max;
}

function calcularTotal() {
  console.log(`${this.nombre} - ${this.mes}`);

  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }

  console.log(`Total: $${total}`);
  return total;
}

// ============================================
// DATOS
// ============================================

const calificaciones = [8, 9, 7, 10, 8.5, 9.5];
const ventas = [1200, 1500, 980, 2100, 1750];
const gastos = [500, 300, 150, 800, 450];

// ============================================
// TU CÓDIGO AQUÍ
// ============================================

// 1. Calcular promedio de calificaciones usando apply()
calcularPromedio.apply(estadisticas, calificaciones);

// 2. Encontrar máximo de ventas usando apply()
encontrarMaximo.apply(estadisticas, ventas);

// 3. Calcular total de gastos usando apply()
calcularTotal.apply(estadisticas, gastos);


