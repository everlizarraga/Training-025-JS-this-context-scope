/**
**CONSIGNA:**
Creá una función memoizada que calcule factoriales:
1. Función `crearFactorialMemoizado()` que retorna función memoizada
2. La función debe cachear resultados previos
3. Mostrar cuándo calcula vs cuándo usa caché
4. Probá llamarla varias veces con mismos/diferentes valores
 */

function crearFactorialMemoizado() {
  // 1. Crear caché privado
  // TU CÓDIGO AQUÍ
  const cache = {};

  return function factorial(n) {
    // 2. Si está en caché, retornar
    // TU CÓDIGO AQUÍ
    if(n in cache) {
      console.log(`Retornado de caché: ${n}> ${cache[n]}`);
      return cache[n];
    }

    // 3. Mostrar que se está calculando
    console.log("Calculando factorial(" + n + ")");

    // 4. Caso base
    if (n <= 1) {
      // TU CÓDIGO AQUÍ (guardar en caché y retornar)
      cache[n] = 1;
      return 1;
    }

    // 5. Caso recursivo
    // Calcular factorial(n-1) * n
    // Guardar en caché
    // Retornar
    // TU CÓDIGO AQUÍ
    const factor = factorial(n-1) * n;
    cache[n] = factor;
    console.log('Calculado:', factor);
    return factor;
  };
}

// Crear función memoizada
const factorialMemo = crearFactorialMemoizado();

// Probar
console.log("Resultado:", factorialMemo(5));  // 120
console.log("\nSegunda llamada (debe usar caché):");
console.log("Resultado:", factorialMemo(5));  // 120

console.log("\nTercera llamada con valor más grande:");
console.log("Resultado:", factorialMemo(6));  // 720 (usa caché de 5)

