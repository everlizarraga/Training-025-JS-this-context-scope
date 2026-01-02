/**
**CONSIGNA:**
Creá un objeto `cronometro` que cuente hacia atrás:
1. Propiedades: `tiempoRestante = 10`, `intervalo = null`
2. Método `iniciar()` que cuenta cada segundo con setInterval
3. Método `detener()` que limpia el intervalo
4. Al llegar a 0, debe detenerse automáticamente y mostrar mensaje
5. Usar arrow function para mantener "this"
 */

const cronometro = {
  tiempoRestante: 10,
  intervalo: null,
  display: null,

  iniciar: function () {
    console.log("Cronómetro iniciado...");

    // TU CÓDIGO AQUÍ
    // 1. Usar setInterval con arrow function
    // 2. Decrementar this.tiempoRestante cada segundo
    // 3. Mostrar tiempo en consola
    // 4. Si llega a 0, llamar this.detener()
    console.log(this.tiempoRestante);
    this.intervalo = setInterval(() => {
      this.tiempoRestante -= 1;
      console.log(this.tiempoRestante);
      if(this.tiempoRestante == 0) {
        this.detener();
      }
    }, 1000);
  },

  detener: function () {
    clearInterval(this.intervalo);
    console.log("¡Tiempo terminado!");
  }
};

// Iniciar cronómetro
cronometro.iniciar();

