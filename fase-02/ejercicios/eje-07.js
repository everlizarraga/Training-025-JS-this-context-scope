/**
**CONSIGNA:**
Creá decorators útiles:
1. `decorarConContador(fn)` - cuenta cuántas veces se llamó la función
2. `decorarConLimite(fn, max)` - permite máximo N llamadas, después retorna null
3. Función original que decorar
4. Probá ambos decorators (individual y combinados)
 */

// 1. Decorator que cuenta llamadas
function decorarConContador(fn) {
  // Variable privada para contar
  let contador = 0;

  return function (...args) {
    // Incrementar contador
    // Mostrar cantidad de llamadas
    // Ejecutar función original
    // TU CÓDIGO AQUÍ
    contador += 1;
    console.log(`[CONTADOR] Llamada #${contador}`);
    return fn(...args);
  };
}

// 2. Decorator que limita llamadas
function decorarConLimite(fn, max) {
  // Variable privada para contar
  let llamadas = 0;

  return function (...args) {
    // Verificar si se alcanzó el límite
    // Si sí: retornar null y mostrar mensaje
    // Si no: incrementar contador y ejecutar función
    // TU CÓDIGO AQUÍ
    if(llamadas >= max) {
      console.log(`[LIMITE] Maximo de llamadas alcanzadas (${max})`);
      return null;
    }
    llamadas += 1;
    return fn(...args);
  };
}

// 3. Función original
function procesarDatos(datos) {
  console.log("Procesando:", datos);
  return datos.toUpperCase();
}

// 4. Decorar función
const procesarConContador = decorarConContador(procesarDatos);
const procesarConLimite = decorarConLimite(procesarDatos, 3);
const procesarAmbos = decorarConLimite(decorarConContador(procesarDatos), 3);

// Probar con contador
console.log("--- CON CONTADOR ---");
procesarConContador("hola");
procesarConContador("mundo");
procesarConContador("test");

// Probar con límite
console.log("\n--- CON LÍMITE (max 3) ---");
procesarConLimite("call1");
procesarConLimite("call2");
procesarConLimite("call3");
procesarConLimite("call4");  // Esta no debería ejecutarse

// Probar con ambos
console.log("\n--- CON AMBOS ---");
procesarAmbos("test1");
procesarAmbos("test2");
procesarAmbos("test3");
procesarAmbos("test4");  // Esta no debería ejecutarse

