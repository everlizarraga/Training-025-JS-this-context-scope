/**
**CONSIGNA:**
Creá un sistema que demuestre el problema y sus soluciones:
1. Función `crearBotonesProblema()` con var (reproduce el problema)
2. Función `crearBotonesLet()` con let (solución simple)
3. Función `crearBotonesHelper()` con función helper (solución legacy)
4. Cada función retorna array de funciones que hacen console.log del índice
 */

// 1. CON PROBLEMA (var)
function crearBotonesProblema() {
  const botones = [];

  for (var i = 0; i < 5; i++) {
    botones.push(function () {
      console.log("Botón #" + i + " clickeado");
    });
  }

  return botones;
}

// 2. SOLUCIÓN CON LET
function crearBotonesLet() {
  const botones = [];

  // TU CÓDIGO AQUÍ (usar let en el loop)
  for (let i = 0; i < 5; i++) {
    botones.push(function () {
      console.log(`Botón #${i} clickeado`);
    });
  }
  
  return botones;
}

// 3. SOLUCIÓN CON HELPER FUNCTION
function crearBotonesHelper() {
  const botones = [];
  
  // Función helper
  function crearBoton(indice) {
    // Retornar función que hace console.log del índice
    // TU CÓDIGO AQUÍ
    return function () {
      console.log(`Botón #${indice} clickeado`);
    }
  }

  for (var i = 0; i < 5; i++) {
    // TU CÓDIGO AQUÍ (usar crearBoton)
    botones.push(crearBoton(i));
  }

  return botones;
}

// Probar las 3 versiones
console.log("--- CON PROBLEMA ---");
const botonesProblema = crearBotonesProblema();
botonesProblema[0]();
botonesProblema[2]();
botonesProblema[4]();

console.log("\n--- CON LET ---");
const botonesLet = crearBotonesLet();
botonesLet[0]();
botonesLet[2]();
botonesLet[4]();

console.log("\n--- CON HELPER ---");
const botonesHelper = crearBotonesHelper();
botonesHelper[0]();
botonesHelper[2]();
botonesHelper[4]();

