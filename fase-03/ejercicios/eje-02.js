/**
**CONSIGNA:**
Creá un objeto que demuestre el problema de "this" en funciones internas:
1. Objeto `contador` con propiedad `cuenta = 0`
2. Método `iniciarLoop()` que usa setTimeout con función regular (pierde this)
3. Método `iniciarLoopFixed()` que usa la técnica "self" para mantener this
4. Probá ambos métodos y observá la diferencia
 */

const contador = {
  cuenta: 0,

  // Método 1: CON PROBLEMA (pierde this)
  iniciarLoop: function () {
    console.log("Iniciando loop (CON PROBLEMA)...");

    setTimeout(function () {
      // Intentar incrementar this.cuenta
      this.cuenta++;  // ❌ this = window (no funciona)
      console.log("Loop 1 - Cuenta:", this.cuenta);
    }, 1000);
  },

  // Método 2: CON SOLUCIÓN (usa self)
  iniciarLoopFixed: function () {
    console.log("Iniciando loop (FIXED)...");

    // TU CÓDIGO AQUÍ
    // 1. Guardar "this" en variable "self"
    // 2. Usar setTimeout con función que use "self.cuenta"
    const self = this;
    setTimeout(function() {
      self.cuenta += 1;
      console.log("Loop 2 - Cuenta:", self.cuenta);
    }, 1000);
  }
};

// Probar método con problema
contador.iniciarLoop();

// Esperar 1.5 segundos y probar versión fixed
setTimeout(() => {
  contador.iniciarLoopFixed();
}, 1500);

