/**
**CONSIGNA:**
Tenés un objeto `temporizador` con métodos que usan "this". El problema es que cuando pasás esos métodos a `setTimeout`, pierden el contexto.

Usá `bind()` para:
1. Crear una versión "bound" del método `contar`
2. Pasarla a setTimeout sin perder "this"
3. Ver que el temporizador funciona correctamente
 */

// ============================================
// OBJETO TEMPORIZADOR
// ============================================

const temporizador = {
  segundos: 0,
  nombre: "Timer Principal",

  contar: function () {
    this.segundos++;
    console.log(`${this.nombre}: ${this.segundos} segundo(s)`);
  },

  iniciar: function () {
    console.log(`Iniciando ${this.nombre}...`);

    // ❌ PROBLEMA: Esto pierde "this"
    // setTimeout(this.contar, 1000);

    // ============================================
    // TU CÓDIGO AQUÍ
    // ============================================
    // Usar bind() para que this.contar mantenga "this"
    // y pasarlo a setTimeout
    setTimeout(this.contar.bind(this), 1000);

  }
};

// Llamar iniciar
temporizador.iniciar();

// ============================================
// PARTE 2: Crear temporizador con nombre personalizado
// ============================================

const otroTemporizador = {
  segundos: 0,
  nombre: "Timer Secundario"
};

// TU CÓDIGO AQUÍ:
// 1. Crear una versión bound de temporizador.contar
//    pero con "this" = otroTemporizador
const nuevoTemporizador = temporizador.contar.bind(otroTemporizador);

// 2. Llamarla 3 veces para simular 3 segundos
nuevoTemporizador();
nuevoTemporizador();
nuevoTemporizador();

