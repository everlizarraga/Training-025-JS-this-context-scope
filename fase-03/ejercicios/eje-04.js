/**
**CONSIGNA:**
Creá un objeto `temporizador` que demuestre la diferencia entre regular y arrow functions:
1. Propiedad `segundos = 0`
2. Método `iniciarRegular()` que usa setInterval con función regular (NO funciona)
3. Método `iniciarArrow()` que usa setInterval con arrow function (SÍ funciona)
4. Probá ambos y observá la diferencia
 */

const temporizador = {
  segundos: 0,

  // Método 1: CON FUNCIÓN REGULAR (problema)
  iniciarRegular: function () {
    console.log("Iniciando con función regular...");

    setInterval(function () {
      // Intentar incrementar this.segundos
      // TU CÓDIGO AQUÍ
      this.segundos += 1;
      console.log("Regular - Segundos:", this.segundos);
    }, 1000);
  },

  // Método 2: CON ARROW FUNCTION (solución)
  iniciarArrow: function () {
    console.log("Iniciando con arrow function...");

    // TU CÓDIGO AQUÍ
    // Usar setInterval con arrow function
    // Incrementar this.segundos
    // Mostrar en consola
    setInterval(() => {
      this.segundos += 1;
      console.log("Arrow - Segundos", this.segundos);
    }, 1000);
  }
};

// Probar versión regular (NO funciona)
temporizador.iniciarRegular();

// Probar versión arrow (SÍ funciona)
// temporizador.iniciarArrow();
