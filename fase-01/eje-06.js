/**
**CONSIGNA:**
Creá una función `crearMultiplicador` que demuestre closures:
1. Recibe un parámetro `factor` (ejemplo: 5)
2. Retorna una función que recibe un `numero`
3. La función retornada multiplica `numero` por `factor`
4. Creá dos multiplicadores: uno por 2 y otro por 10
5. Probá ambos con diferentes números
 */

function crearMultiplicador(factor) {
  // 1. Retornar una función que usa "factor"
  return function (numero) {
    // 2. Multiplicar numero por factor
    // TU CÓDIGO AQUÍ
    return numero * factor;
  };
}

// 3. Crear multiplicador por 2
// TU CÓDIGO AQUÍ (const multiplicarPor2 = ...)
const multiplicarPor2 = crearMultiplicador(2);

// 4. Crear multiplicador por 10
// TU CÓDIGO AQUÍ (const multiplicarPor10 = ...)
const multiplicarPor10 = crearMultiplicador(10);

// 5. Probar ambos multiplicadores
console.log("5 x 2 =", multiplicarPor2(5));
console.log("5 x 10 =", multiplicarPor10(5));
console.log("7 x 2 =", multiplicarPor2(7));
console.log("3 x 10 =", multiplicarPor10(3));
