/**
**CONSIGNA:**
Creá un objeto `auto` que demuestre "this" en métodos:
1. Propiedades: `marca`, `modelo`, `velocidad` (inicial 0)
2. Método `acelerar(cantidad)` que suma a velocidad y muestra mensaje
3. Método `frenar(cantidad)` que resta de velocidad y muestra mensaje
4. Método `mostrarInfo()` que muestra marca, modelo y velocidad actual
5. Probá "robar" el método `mostrarInfo` y usarlo en otro objeto
 */

const auto = {
  marca: "Toyota",
  modelo: "Corolla",
  velocidad: 0,

  // 1. Método acelerar
  acelerar: function (cantidad) {
    // Sumar cantidad a this.velocidad
    // Mostrar mensaje: "Acelerando... Velocidad: X km/h"
    // TU CÓDIGO AQUÍ
    this.velocidad += cantidad;
    console.log(`Acelerando... Velocidad: ${this.velocidad} km/h`);
  },

  // 2. Método frenar
  frenar: function (cantidad) {
    // Restar cantidad de this.velocidad (mínimo 0)
    // Mostrar mensaje: "Frenando... Velocidad: X km/h"
    // TU CÓDIGO AQUÍ
    this.velocidad -= Math.max(cantidad, 0);
    console.log(`Frenando... Velocidad: ${this.velocidad} km/h`);
  },

  // 3. Método mostrarInfo
  mostrarInfo: function () {
    // Mostrar marca, modelo y velocidad
    // TU CÓDIGO AQUÍ
    console.log(`
      marca: ${this.marca}
      modelo: ${this.modelo}
      velocidad: ${this.velocidad}`);
  }
};

// Probar métodos
auto.acelerar(50);
auto.acelerar(30);
auto.frenar(20);
auto.mostrarInfo();

// 4. Crear otro objeto y "robar" el método
const camion = {
  marca: "Mercedes",
  modelo: "Actros",
  velocidad: 0
};

// TU CÓDIGO AQUÍ (asignar mostrarInfo de auto a camion)
camion.mostrarInfo = auto.mostrarInfo;

// Llamar método en camion
camion.mostrarInfo();  // Debe mostrar info de camión, no de auto

