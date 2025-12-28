function crearSumador(valorInicial) {
  // 1. Retornar función que recibe "incremento"
  return function (incremento) {
    // 2. Sumar valorInicial + incremento
    // TU CÓDIGO AQUÍ
    return valorInicial + incremento;
  };
}

// 3. Crear sumador con valor inicial 100
// TU CÓDIGO AQUÍ (const sumar100 = ...)
const sumar100 = crearSumador(100);

// 4. Crear sumador con valor inicial 1000
// TU CÓDIGO AQUÍ (const sumar1000 = ...)
const sumar1000 = crearSumador(1000);

// 5. Probar ambos
console.log("100 + 5 =", sumar100(5));
console.log("1000 + 5 =", sumar1000(5));
console.log("100 + 25 =", sumar100(25));
console.log("1000 + 50 =", sumar1000(50));
