/**
**CONSIGNA:**
Creá un script que demuestre hoisting:
1. Declará una variable con `var` llamada `mensaje` y asignale "Hola"
2. ANTES de la declaración, hacé console.log de `mensaje` (va a mostrar undefined)
3. Creá una función `mostrarNumero()` que haga console.log de un número cualquiera
4. ANTES de declarar la función, llamala (debe funcionar por hoisting)
5. Creá una function expression con `var` llamada `sumar` que sume 2 + 2
6. ANTES de la asignación, intentá llamar a `sumar()` (va a dar error)
 */

// 1. Intentar usar "mensaje" antes de declararla
// TU CÓDIGO AQUÍ (console.log de mensaje)
var mensaje;
console.log('mensaje', mensaje);

// 2. Declarar y asignar "mensaje"
// TU CÓDIGO AQUÍ (var mensaje = "Hola")
mensaje = 'Hola';
console.log('mensaje', mensaje);

// 3. Llamar a "mostrarNumero" antes de declararla
// TU CÓDIGO AQUÍ (llamar a mostrarNumero())
mostrarNumero();

// 4. Declarar función "mostrarNumero"
// TU CÓDIGO AQUÍ (function mostrarNumero() {...})
function mostrarNumero() {
  console.log('fn', 1);
}

// 5. Intentar llamar a "sumar" antes de asignarla (comentar para evitar error total)
// console.log(sumar());  // Descomentar para ver el error

// 6. Asignar function expression "sumar"
// TU CÓDIGO AQUÍ (var sumar = function() {...})
var sumar = function() {
  return 2+2;
}

// 7. Llamar a "sumar" después de asignarla
// TU CÓDIGO AQUÍ (console.log(sumar()))
console.log(sumar());
