/**
**CONSIGNA:**
Creá un script que demuestre el call stack:
1. Variable global `nivel = "Global"`
2. Función `nivelA()` que:
  - Tenga variable local `nivel = "A"`
  - Muestre "Entrando a nivelA"
  - Llame a `nivelB()`
  - Muestre "Saliendo de nivelA"
3. Función `nivelB()` que:
  - Tenga variable local `nivel = "B"`
  - Muestre "Entrando a nivelB"
  - Llame a `nivelC()`
  - Muestre "Saliendo de nivelB"
4. Función `nivelC()` que:
  - Muestre "Estoy en nivelC (fondo del stack)"
  - Muestre el valor de `nivel` (será "B" por scope chain)
5. Llamar a `nivelA()` y observar el orden de ejecución
 */

// 1. Variable global
// TU CÓDIGO AQUÍ
let nivel = 'Global';

function nivelA() {
  // 2. Variable local nivel = "A"
  // TU CÓDIGO AQUÍ
  let nivel = "A";

  console.log("Entrando a nivelA", nivel);

  // 3. Llamar a nivelB
  // TU CÓDIGO AQUÍ
  nivelB();

  console.log("Saliendo de nivelA");
}

function nivelB() {
  // 4. Variable local nivel = "B"
  // TU CÓDIGO AQUÍ
  let nivel = 'B';

  console.log("Entrando a nivelB", nivel);

  // 5. Llamar a nivelC
  // TU CÓDIGO AQUÍ
  nivelC();

  console.log("Saliendo de nivelB");
}

function nivelC() {
  console.log("Estoy en nivelC (fondo del stack)");

  // 6. Mostrar valor de "nivel"
  // TU CÓDIGO AQUÍ
  console.log('Nivel:', nivel);
}

// 7. Llamar a nivelA
// TU CÓDIGO AQUÍ
nivelA();

