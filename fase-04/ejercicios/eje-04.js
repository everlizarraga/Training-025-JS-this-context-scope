/**
**CONSIGNA:**
Tenés objetos que representan diferentes tipos de vehículos. Algunos tienen métodos útiles, otros no.

Usá method borrowing para:
1. Usar el método `calcularImpuesto` del auto en la moto
2. Usar el método de Array `join` en un objeto array-like
3. Convertir un NodeList (array-like) a array real usando `slice`
 */

// ============================================
// PARTE 1: Borrowing entre objetos
// ============================================

const auto = {
  tipo: "Auto",
  precio: 20000,

  calcularImpuesto: function (porcentaje) {
    const impuesto = this.precio * (porcentaje / 100);
    console.log(`Impuesto para ${this.tipo}: $${impuesto}`);
    return impuesto;
  }
};

const moto = {
  tipo: "Moto",
  precio: 5000
  // NO tiene método calcularImpuesto
};

// TU CÓDIGO AQUÍ:
// Usar calcularImpuesto del auto en la moto con 10% de impuesto
auto.calcularImpuesto.call(moto, 10);

// ============================================
// PARTE 2: Array methods en array-like
// ============================================

const datosUsuario = {
  0: "Juan",
  1: "Pérez",
  2: "30",
  3: "Argentina",
  length: 4  // ← IMPORTANTE: tiene length como un array
};

// Este objeto es "array-like" pero NO es un array
console.log("\n=== DATOS USUARIO ===");
console.log("¿Es array?", Array.isArray(datosUsuario));  // false

// TU CÓDIGO AQUÍ:
// Usar el método join() de Array en datosUsuario para unir con " - "
// Resultado esperado: "Juan - Pérez - 30 - Argentina"
const rpta = Array.prototype.join.call(datosUsuario, '-');
console.log("Resultado join:", rpta);

// ============================================
// PARTE 3: Convertir array-like a array real
// ============================================

// Simular NodeList (lo que devuelve querySelectorAll)
const fakeNodeList = {
  0: { id: 1, texto: "Elemento 1" },
  1: { id: 2, texto: "Elemento 2" },
  2: { id: 3, texto: "Elemento 3" },
  length: 3
};

console.log("\n=== NODELIST ===");
console.log("¿Es array?", Array.isArray(fakeNodeList));  // false

// TU CÓDIGO AQUÍ:
// Convertir fakeNodeList a array real usando Array.prototype.slice.call()
const lista = Array.prototype.slice.call(fakeNodeList);
console.log("Convertido a Lista:", lista);
// Verificar que es array real
console.log("Convertido, es array:", Array.isArray(lista));

// Usar forEach (método de array) en el array convertido
lista.forEach(e => {
  console.log("Elemento:", e);
});

