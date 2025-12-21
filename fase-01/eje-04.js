/**
**CONSIGNA:**
Creá un script que demuestre la diferencia entre `var` y `let`:
1. Función `pruebaVar()` que:
  - Declara `var contador = 0` al inicio
  - Tiene un if que declara `var contador = 10` dentro
  - Muestra el valor de `contador` después del if (será 10, no 0)
2. Función `pruebaLet()` que:
  - Declara `let contador = 0` al inicio
  - Tiene un if que declara `let contador = 10` dentro
  - Muestra el valor de `contador` después del if (será 0, no 10)
3. Un loop `for` con `var` que muestre el índice después del loop
4. Un loop `for` con `let` que NO permita acceder al índice después (comentar para evitar error)
 */

function pruebaVar() {
  // 1. Declarar contador con var
  // TU CÓDIGO AQUÍ
  var contador = 0;

  if (true) {
    // 2. Declarar contador con var (mismo nombre)
    // TU CÓDIGO AQUÍ
    var contador = 10;
    console.log("Dentro del if (var):", contador);
  }
  
  // 3. Mostrar contador después del if
  // TU CÓDIGO AQUÍ
  console.log("Despues del if (var):", contador);
}

function pruebaLet() {
  // 4. Declarar contador con let
  // TU CÓDIGO AQUÍ
  let contador = 0;

  if (true) {
    // 5. Declarar contador con let (mismo nombre)
    // TU CÓDIGO AQUÍ
    let contador = 10;
    console.log("Dentro del if (let):", contador);
  }

  // 6. Mostrar contador después del if
  // TU CÓDIGO AQUÍ
  console.log("Despues del if (let)", contador);
}

pruebaVar();
pruebaLet();

// 7. Loop con var
// TU CÓDIGO AQUÍ (for con var i)
for (var i = 0; i < 3; i++) {}
console.log("Índice con var después del loop:", i);

// 8. Loop con let
// TU CÓDIGO AQUÍ (for con let j)
for(let j = 0; j < 3; j++){}
// console.log(j);  // Descomentar para ver el error


