/**
 * **CONSIGNA:**
Creá decorators para agregar funcionalidad a funciones existentes.

Implementá:
1. `validacionDecorator` - Valida que los argumentos sean números positivos
2. `retryDecorator` - Reintenta la función si falla (máximo 3 intentos)
3. Aplicar ambos decorators a una función
 */

// ============================================
// PARTE 1: Validation Decorator
// ============================================

function validacionDecorator(funcion) {
  return function (...args) {
    // TU CÓDIGO AQUÍ:
    // 1. Verificar que todos los args sean números
    // 2. Verificar que todos sean positivos
    // 3. Si no, lanzar error
    // 4. Si sí, ejecutar función original
    const todosSonNumeros = args.every(e => typeof e === 'number');
    if (!todosSonNumeros) {
      throw new Error("Todos los arg tienne que ser numeros");
    }
    const todosSonPositivos = args.every(e => e > 0);
    if (!todosSonPositivos) {
      throw new Error("Todos los argumentos tienen que ser positivos");
    }
    return funcion(...args);
  };
}

// Función para probar
function dividir(a, b) {
  console.log(`Dividiendo ${a} / ${b}`);
  return a / b;
}

// Decorar
const dividirValidado = validacionDecorator(dividir);

// Probar
console.log("=== VALIDACIÓN ===");
try {
  console.log(dividirValidado(10, 2));   // Debe funcionar
  console.log(dividirValidado(10, -2));  // Debe lanzar error
} catch (error) {
  console.log("Error:", error.message);
}

// ============================================
// PARTE 2: Retry Decorator
// ============================================

function retryDecorator(funcion, maxIntentos = 3) {
  return function (...args) {
    // TU CÓDIGO AQUÍ:
    // 1. Intentar ejecutar función
    // 2. Si falla, reintentar hasta maxIntentos
    // 3. Si todos fallan, lanzar último error
    let ultimoError;

    for (let intento = 1; intento <= maxIntentos; intento++) {
      try {
        // Intentar ejecutar
        const resultado = funcion.apply(this, args);
        return resultado;  // ✅ Éxito, salir

      } catch (error) {
        ultimoError = error;

        // Si no es el último intento, avisar que reintenta
        if (intento < maxIntentos) {
          console.log(`Operación falló. Reintentando...`);
        }
      }
    }

    // Si llegamos aquí, todos los intentos fallaron
    throw ultimoError;
  };
}

// Función que falla aleatoriamente
let intentos = 0;
function funcionInestable() {
  intentos++;
  console.log(`Intento #${intentos}`);

  if (Math.random() < 0.9) {  // 70% de probabilidad de fallo
    throw new Error("Operación falló");
  }

  console.log("¡Éxito!");
  return "OK";
}

// Decorar
const funcionConRetry = retryDecorator(funcionInestable);

// Probar
console.log("\n=== RETRY ===");
try {
  const resultado = funcionConRetry();
  console.log("Resultado:", resultado);
} catch (error) {
  console.log("Todos los intentos fallaron:", error.message);
}
