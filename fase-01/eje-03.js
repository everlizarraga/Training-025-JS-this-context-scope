/**
**CONSIGNA:**
Creá una estructura de funciones anidadas que demuestre scope chain:
1. Variable global `color = "rojo"`
2. Función `exterior()` que tenga `color = "azul"` local
3. Dentro de `exterior()`, función `interior()` que:
  - NO tenga variable `color` propia
  - Haga console.log de `color` (debe mostrar "azul" por scope chain)
4. Dentro de `interior()`, función `masProfunda()` que:
  - Tenga `color = "verde"` local
  - Haga console.log de `color` (debe mostrar "verde")
5. Llamar a todas las funciones en cascada
 */

// 1. Variable global
// TU CÓDIGO AQUÍ
let color = 'rojo';

function exterior() {
  // 2. Variable local de exterior
  // TU CÓDIGO AQUÍ
  let color = 'azul';

  function interior() {
    // 3. NO declarar "color" aquí
    // 4. Mostrar "color" (va a buscar en scope chain)
    // TU CÓDIGO AQUÍ
    console.log('color:', color);

    function masProfunda() {
      // 5. Variable local de masProfunda
      // TU CÓDIGO AQUÍ
      const color = 'verde';

      // 6. Mostrar "color"
      // TU CÓDIGO AQUÍ
      console.log('mas profundo', color);
    }

    // 7. Llamar a masProfunda
    // TU CÓDIGO AQUÍ
    masProfunda();
  }

  // 8. Llamar a interior
  // TU CÓDIGO AQUÍ
  interior();
}

// 9. Llamar a exterior
// TU CÓDIGO AQUÍ
exterior();

// 10. Mostrar color global
// TU CÓDIGO AQUÍ
console.log('Global:', color);
