# 🔥 WARMUP FASE 1: SCOPE & CONTEXT

**Duración total:** 6-8 horas (distribuido en 2-3 días)  
**Objetivo:** Dominar cómo JavaScript maneja el alcance de variables y contextos de ejecución

---

## ⚠️ INSTRUCCIONES GENERALES

### ⏱️ Governor (límites):
- **Tiempo por ejercicio:** Máximo 30 minutos
- **Si te trabás >15 min:** Ver Hint 1
- **Si te trabás >25 min:** Ver Hint 2
- **Funciona?** → NEXT. No optimizar más.

### 📝 Cómo trabajar:
1. Leer el ejemplo resuelto completo
2. Entender el "por qué" de cada línea
3. Intentar el ejercicio SIN mirar el ejemplo
4. Probar tu código en consola/navegador
5. Comparar con resultado esperado
6. Si falla → debuggear, no mirar solución
7. Usar hints solo si te trabás de verdad

### 🔧 Herramientas:
- Consola del navegador (F12)
- Node.js en terminal
- Editor de código (VS Code, etc.)

---

## 📚 EJERCICIOS

---

### Ejercicio 1: Scope Global vs Local

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Diferencia entre scope global y local
// ============================================

// 1. Variables en SCOPE GLOBAL
// Las variables declaradas fuera de funciones son globales
// Pueden ser accedidas desde cualquier parte del código
var globalVar = "Soy global con var";
let globalLet = "Soy global con let";
const globalConst = "Soy global con const";

// 2. Función que crea SCOPE LOCAL
function miFuncion() {
    // Variables declaradas DENTRO de una función son locales
    // Solo existen dentro de la función
    var localVar = "Soy local con var";
    let localLet = "Soy local con let";
    const localConst = "Soy local con const";
    
    // Dentro de la función puedo acceder a variables globales
    console.log("Dentro de función - global:", globalVar);  // ✅ Funciona
    console.log("Dentro de función - local:", localVar);    // ✅ Funciona
}

miFuncion();

// 3. Intentar acceder a variables locales desde afuera
console.log("Fuera de función - global:", globalVar);  // ✅ Funciona
// console.log("Fuera de función - local:", localVar);  // ❌ ERROR: localVar is not defined

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// 1. JavaScript crea un "scope" (alcance) para cada función
// 2. Variables dentro de la función solo viven ahí dentro
// 3. Variables fuera de funciones son "globales" (accesibles en todas partes)
// 4. Desde dentro de una función SÍ puedo acceder a variables globales
// 5. Desde fuera de una función NO puedo acceder a variables locales

// ============================================
// ANALOGÍA
// ============================================
// Pensá en una función como una habitación con paredes
// - Lo que está DENTRO de la habitación (variables locales) no se ve desde afuera
// - Lo que está FUERA (variables globales) sí se ve desde dentro
// - Si querés usar algo de adentro afuera, tenés que RETORNARLO (sacarlo por la puerta)
```

**Resultado al ejecutar:**
```
Dentro de función - global: Soy global con var
Dentro de función - local: Soy local con var
Fuera de función - global: Soy global con var
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá una función llamada `calcularArea` que:
1. Tenga una variable local `ancho = 5` y `alto = 10`
2. Calcule el área (ancho * alto) y la guarde en una variable local `area`
3. Tenga una variable global `unidad = "metros cuadrados"` (declararla ANTES de la función)
4. Dentro de la función, haga console.log del área con la unidad
5. Fuera de la función, intentá acceder a `area` (va a dar error, eso está bien)

**PLANTILLA:**
```javascript
// 1. Declarar variable global "unidad"
// TU CÓDIGO AQUÍ

function calcularArea() {
    // 2. Declarar variables locales ancho y alto
    // TU CÓDIGO AQUÍ
    
    // 3. Calcular área (ancho * alto)
    // TU CÓDIGO AQUÍ
    
    // 4. Mostrar resultado con unidad
    // TU CÓDIGO AQUÍ
}

// 5. Llamar a la función
calcularArea();

// 6. Intentar acceder a "area" (va a dar error)
// console.log(area);  // Descomentar esta línea para ver el error
```

**RESULTADO ESPERADO:**
```
El área es: 50 metros cuadrados
```

Y al descomentar la última línea:
```
ReferenceError: area is not defined
```

---

#### 💡 HINTS (solo si te trabás >15 min):

**Hint 1:** Recordá que las variables declaradas DENTRO de una función solo existen ahí dentro. La variable `unidad` debe estar FUERA de `calcularArea()`, antes de definir la función.

**Hint 2:** Para calcular el área, usá: `const area = ancho * alto;`. Para mostrar el resultado: `console.log("El área es:", area, unidad);`

**Hint 3:** El error de `area is not defined` es el comportamiento CORRECTO. Demuestra que `area` es local y no se puede acceder desde fuera.

---

---

### Ejercicio 2: Hoisting Básico

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Hoisting (elevación de declaraciones)
// ============================================

// 1. HOISTING con VAR
// JavaScript "eleva" las declaraciones al inicio del scope
console.log("Valor de x antes de declararla:", x);  // undefined (no error!)
var x = 10;
console.log("Valor de x después de asignarla:", x);  // 10

// ¿Qué pasó? JavaScript internamente hace esto:
// var x;  // ← Declaración se "eleva" (hoisting)
// console.log(x);  // undefined
// x = 10;  // ← Asignación queda en su lugar

// 2. HOISTING con LET/CONST (Temporal Dead Zone)
// let y const SÍ hacen hoisting, pero NO se pueden usar antes de declararlas
// console.log(y);  // ❌ ERROR: Cannot access 'y' before initialization
let y = 20;
console.log("Valor de y:", y);  // 20

// 3. HOISTING con FUNCIONES
// Las funciones declaradas SÍ se elevan completas (declaración + cuerpo)
saludar();  // ✅ Funciona! (aunque la función está declarada abajo)

function saludar() {
    console.log("Hola desde función hoisted!");
}

// 4. FUNCTION EXPRESSIONS NO hacen hoisting del cuerpo
// despedirse();  // ❌ ERROR: despedirse is not a function

var despedirse = function() {
    console.log("Adiós!");
};

despedirse();  // ✅ Ahora sí funciona

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// 1. JavaScript ejecuta código en 2 fases:
//    - Fase 1 (Creation): Escanea y "eleva" declaraciones
//    - Fase 2 (Execution): Ejecuta el código línea por línea
// 
// 2. Se elevan:
//    - var → se eleva con valor "undefined"
//    - let/const → se elevan pero quedan en "temporal dead zone" (no accesibles)
//    - function declarations → se elevan completas
//    - function expressions → solo se eleva la variable (como var)
//
// 3. NO se elevan las asignaciones (solo declaraciones)

// ============================================
// ANALOGÍA
// ============================================
// Es como si JavaScript hiciera una "lista de invitados" antes de la fiesta
// - var → "Juan está en la lista (pero aún no llegó)" = undefined
// - let/const → "María está en la lista (pero está en el baño)" = temporal dead zone
// - function → "Pedro ya llegó y está adentro" = disponible desde el inicio
```

**Resultado al ejecutar:**
```
Valor de x antes de declararla: undefined
Valor de x después de asignarla: 10
Hola desde función hoisted!
Valor de y: 20
Adiós!
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá un script que demuestre hoisting:
1. Declará una variable con `var` llamada `mensaje` y asignale "Hola"
2. ANTES de la declaración, hacé console.log de `mensaje` (va a mostrar undefined)
3. Creá una función `mostrarNumero()` que haga console.log de un número cualquiera
4. ANTES de declarar la función, llamala (debe funcionar por hoisting)
5. Creá una function expression con `var` llamada `sumar` que sume 2 + 2
6. ANTES de la asignación, intentá llamar a `sumar()` (va a dar error)

**PLANTILLA:**
```javascript
// 1. Intentar usar "mensaje" antes de declararla
// TU CÓDIGO AQUÍ (console.log de mensaje)

// 2. Declarar y asignar "mensaje"
// TU CÓDIGO AQUÍ (var mensaje = "Hola")

// 3. Llamar a "mostrarNumero" antes de declararla
// TU CÓDIGO AQUÍ (llamar a mostrarNumero())

// 4. Declarar función "mostrarNumero"
// TU CÓDIGO AQUÍ (function mostrarNumero() {...})

// 5. Intentar llamar a "sumar" antes de asignarla (comentar para evitar error total)
// console.log(sumar());  // Descomentar para ver el error

// 6. Asignar function expression "sumar"
// TU CÓDIGO AQUÍ (var sumar = function() {...})

// 7. Llamar a "sumar" después de asignarla
// TU CÓDIGO AQUÍ (console.log(sumar()))
```

**RESULTADO ESPERADO:**
```
undefined
42
Resultado de suma: 4
```

Y al descomentar la línea del punto 5:
```
TypeError: sumar is not a function
```

---

#### 💡 HINTS (solo si te trabás >15 min):

**Hint 1:** Recordá que `var` eleva la declaración pero NO la asignación. Por eso `console.log(mensaje)` antes de `var mensaje = "Hola"` muestra `undefined`, no error.

**Hint 2:** Las funciones declaradas con `function nombre() {}` se elevan COMPLETAS. Por eso podés llamar a `mostrarNumero()` antes de declararla.

**Hint 3:** `var sumar = function() {}` es una function expression. Solo se eleva `var sumar` (que vale `undefined`), no la función. Por eso da error "not a function".

---

---

### Ejercicio 3: Scope Chain

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Scope Chain (cadena de alcances)
// ============================================

// 1. Nivel 1: Scope Global
var nombre = "Global";

function nivel1() {
    // 2. Nivel 2: Scope de nivel1
    var nombre = "Nivel 1";
    
    function nivel2() {
        // 3. Nivel 3: Scope de nivel2
        var nombre = "Nivel 2";
        
        function nivel3() {
            // 4. Nivel 4: Scope de nivel3
            // NO tiene variable "nombre" propia
            // JavaScript busca en la cadena: nivel3 → nivel2 → nivel1 → global
            
            console.log("En nivel3, nombre es:", nombre);  // "Nivel 2"
            // ¿Por qué "Nivel 2"?
            // 1. Busca en scope de nivel3 → NO encontró
            // 2. Busca en scope de nivel2 → ✅ ENCONTRÓ "Nivel 2"
            // 3. Se detiene (no sigue buscando)
        }
        
        nivel3();
        console.log("En nivel2, nombre es:", nombre);  // "Nivel 2"
    }
    
    nivel2();
    console.log("En nivel1, nombre es:", nombre);  // "Nivel 1"
}

nivel1();
console.log("En global, nombre es:", nombre);  // "Global"

// ============================================
// EJEMPLO 2: Variable no definida en scope local
// ============================================

var edad = 30;  // Global

function mostrarEdad() {
    // NO hay variable "edad" local
    // JavaScript busca en scope chain: mostrarEdad → global
    console.log("Edad desde función:", edad);  // 30 (encontró en global)
    
    function incrementarEdad() {
        // Tampoco hay "edad" aquí
        // Busca: incrementarEdad → mostrarEdad → global
        edad = edad + 1;  // Modifica la variable GLOBAL
        console.log("Edad incrementada:", edad);  // 31
    }
    
    incrementarEdad();
}

mostrarEdad();
console.log("Edad global después:", edad);  // 31 (se modificó!)

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// 1. Cada función crea un nuevo scope (alcance)
// 2. Los scopes se "anidan" (uno dentro de otro)
// 3. Cuando JavaScript busca una variable, sigue esta cadena:
//    - Busca en scope actual
//    - Si NO la encuentra, busca en scope padre
//    - Si NO la encuentra, busca en scope abuelo
//    - ... hasta llegar al scope global
//    - Si NO la encuentra en global → ReferenceError
//
// 4. La búsqueda va de ADENTRO hacia AFUERA, nunca al revés
// 5. Se detiene en la PRIMERA coincidencia (shadowing)

// ============================================
// ANALOGÍA
// ============================================
// Es como buscar algo en tu casa:
// - Primero buscás en tu habitación (scope local)
// - Si no está, buscás en la sala (scope padre)
// - Si no está, buscás en toda la casa (scope global)
// - Cuando lo encontrás, dejás de buscar (primera coincidencia)
// - Si no está en ningún lado → "No existe" (ReferenceError)
```

**Resultado al ejecutar:**
```
En nivel3, nombre es: Nivel 2
En nivel2, nombre es: Nivel 2
En nivel1, nombre es: Nivel 1
En global, nombre es: Global
Edad desde función: 30
Edad incrementada: 31
Edad global después: 31
```

---

#### 🎯 TU TURNO:

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

**PLANTILLA:**
```javascript
// 1. Variable global
// TU CÓDIGO AQUÍ

function exterior() {
    // 2. Variable local de exterior
    // TU CÓDIGO AQUÍ
    
    function interior() {
        // 3. NO declarar "color" aquí
        // 4. Mostrar "color" (va a buscar en scope chain)
        // TU CÓDIGO AQUÍ
        
        function masProfunda() {
            // 5. Variable local de masProfunda
            // TU CÓDIGO AQUÍ
            
            // 6. Mostrar "color"
            // TU CÓDIGO AQUÍ
        }
        
        // 7. Llamar a masProfunda
        // TU CÓDIGO AQUÍ
    }
    
    // 8. Llamar a interior
    // TU CÓDIGO AQUÍ
}

// 9. Llamar a exterior
// TU CÓDIGO AQUÍ

// 10. Mostrar color global
// TU CÓDIGO AQUÍ
```

**RESULTADO ESPERADO:**
```
Color en interior: azul
Color en masProfunda: verde
Color global: rojo
```

---

#### 💡 HINTS (solo si te trabás >15 min):

**Hint 1:** La función `interior()` NO debe tener `var color` o `let color`. Cuando haga `console.log(color)`, JavaScript va a buscar en el scope padre (`exterior()`), donde SÍ hay `color = "azul"`.

**Hint 2:** La cadena de búsqueda es: `masProfunda → interior → exterior → global`. Cada función busca primero en su propio scope, luego sube.

**Hint 3:** Si una función tiene una variable con el mismo nombre, esa es la que se usa (shadowing). Si NO la tiene, busca en el scope padre.

---

---

### Ejercicio 4: Block Scope vs Function Scope

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Diferencia entre var (function scope) y let/const (block scope)
// ============================================

// 1. VAR tiene FUNCTION SCOPE (ignora bloques)
function ejemploVar() {
    var x = 1;
    
    if (true) {
        var x = 2;  // ❌ Misma variable! (sobrescribe la de afuera)
        console.log("Dentro del if, x:", x);  // 2
    }
    
    console.log("Fuera del if, x:", x);  // 2 (se modificó!)
    
    // var ignora bloques (if, for, while, {})
    // Solo respeta function scope
}

ejemploVar();

// 2. LET/CONST tienen BLOCK SCOPE (respetan bloques)
function ejemploLet() {
    let y = 1;
    
    if (true) {
        let y = 2;  // ✅ Variable DIFERENTE (nuevo scope de bloque)
        console.log("Dentro del if, y:", y);  // 2
    }
    
    console.log("Fuera del if, y:", y);  // 1 (NO se modificó!)
    
    // let/const crean nuevo scope en cada bloque {}
}

ejemploLet();

// 3. LOOPS con VAR (problema clásico)
console.log("--- Loop con VAR ---");
for (var i = 0; i < 3; i++) {
    // var i es la MISMA variable en todas las iteraciones
}
console.log("i después del loop:", i);  // 3 (i existe fuera del loop!)

// 4. LOOPS con LET (correcto)
console.log("--- Loop con LET ---");
for (let j = 0; j < 3; j++) {
    // let j crea una variable NUEVA en cada iteración
}
// console.log(j);  // ❌ ERROR: j is not defined (no existe fuera del loop)

// 5. BLOQUES ARBITRARIOS
{
    // Un bloque {} sin if, for, o function
    let bloqueLocal = "Solo vivo en este bloque";
    var bloqueVar = "Soy accesible afuera";
    console.log("Dentro del bloque:", bloqueLocal);
}

// console.log(bloqueLocal);  // ❌ ERROR: not defined
console.log("Fuera del bloque, var:", bloqueVar);  // ✅ Funciona

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// VAR:
// - Solo respeta function scope
// - Ignora if, for, while, {} bloques
// - Se "eleva" (hoisting) al inicio de la función
//
// LET/CONST:
// - Respetan block scope (cualquier par de {})
// - Crean nuevo scope en: if, for, while, {}, etc.
// - Sí hacen hoisting, pero están en "temporal dead zone"

// ============================================
// ANALOGÍA
// ============================================
// VAR es como un globo: flota hasta el techo (función)
// LET/CONST son como cajas: se quedan en la habitación (bloque) donde las pusiste
```

**Resultado al ejecutar:**
```
Dentro del if, x: 2
Fuera del if, x: 2
Dentro del if, y: 2
Fuera del if, y: 1
--- Loop con VAR ---
i después del loop: 3
--- Loop con LET ---
Dentro del bloque: Solo vivo en este bloque
Fuera del bloque, var: Soy accesible afuera
```

---

#### 🎯 TU TURNO:

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

**PLANTILLA:**
```javascript
function pruebaVar() {
    // 1. Declarar contador con var
    // TU CÓDIGO AQUÍ
    
    if (true) {
        // 2. Declarar contador con var (mismo nombre)
        // TU CÓDIGO AQUÍ
        console.log("Dentro del if (var):", contador);
    }
    
    // 3. Mostrar contador después del if
    // TU CÓDIGO AQUÍ
}

function pruebaLet() {
    // 4. Declarar contador con let
    // TU CÓDIGO AQUÍ
    
    if (true) {
        // 5. Declarar contador con let (mismo nombre)
        // TU CÓDIGO AQUÍ
        console.log("Dentro del if (let):", contador);
    }
    
    // 6. Mostrar contador después del if
    // TU CÓDIGO AQUÍ
}

pruebaVar();
pruebaLet();

// 7. Loop con var
// TU CÓDIGO AQUÍ (for con var i)

console.log("Índice con var después del loop:", i);

// 8. Loop con let
// TU CÓDIGO AQUÍ (for con let j)

// console.log(j);  // Descomentar para ver el error
```

**RESULTADO ESPERADO:**
```
Dentro del if (var): 10
Fuera del if (var): 10
Dentro del if (let): 10
Fuera del if (let): 0
Índice con var después del loop: 3
```

Y al descomentar la última línea:
```
ReferenceError: j is not defined
```

---

#### 💡 HINTS (solo si te trabás >15 min):

**Hint 1:** Con `var`, declarar la misma variable dentro de un bloque {} (como un if) sobrescribe la variable del scope de la función. Con `let`, crea una variable diferente solo para ese bloque.

**Hint 2:** En el loop `for (var i = 0; i < 3; i++)`, la variable `i` sigue existiendo después del loop. En `for (let j = 0; j < 3; j++)`, la variable `j` solo existe dentro del loop.

**Hint 3:** Recordá que `var` ignora bloques ({}) y solo respeta funciones. `let/const` respetan cualquier par de llaves {}.

---

---

### Ejercicio 5: Contexto de Ejecución Básico

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Execution Context (contexto de ejecución)
// ============================================

// 1. GLOBAL EXECUTION CONTEXT
// Cuando el script empieza, JavaScript crea el contexto global
var globalVar = "Soy global";

function mostrarContexto() {
    // 2. FUNCTION EXECUTION CONTEXT
    // Cuando se llama una función, JavaScript crea un nuevo contexto
    var localVar = "Soy local";
    
    console.log("--- Dentro de la función ---");
    console.log("Variable local:", localVar);      // Accede a su propio contexto
    console.log("Variable global:", globalVar);    // Accede al contexto global
    
    // 3. CADA LLAMADA crea un NUEVO contexto
    function interna() {
        var internaVar = "Soy más interna";
        console.log("--- Dentro de función interna ---");
        console.log("Variable interna:", internaVar);
        console.log("Variable local:", localVar);      // Accede al contexto padre
        console.log("Variable global:", globalVar);    // Accede al contexto global
    }
    
    interna();
}

mostrarContexto();

// ============================================
// EJEMPLO 2: Call Stack (pila de ejecución)
// ============================================

function primera() {
    console.log("1. Ejecutando primera()");
    segunda();
    console.log("5. Terminó primera()");
}

function segunda() {
    console.log("2. Ejecutando segunda()");
    tercera();
    console.log("4. Terminó segunda()");
}

function tercera() {
    console.log("3. Ejecutando tercera()");
    // Acá está el "fondo" del stack
}

console.log("--- Call Stack Demo ---");
primera();

// Call Stack (pila de llamadas):
// 1. Global context (base)
// 2. primera() se agrega al stack
// 3. segunda() se agrega al stack (arriba de primera)
// 4. tercera() se agrega al stack (arriba de segunda)
// 5. tercera() termina → se SACA del stack
// 6. segunda() termina → se SACA del stack
// 7. primera() termina → se SACA del stack
// 8. Solo queda global context

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// Execution Context tiene 2 fases:
//
// FASE 1: CREATION (creación)
// - Crea el scope (alcance)
// - Hace hoisting de variables y funciones
// - Asigna "this"
// - Crea el objeto "arguments"
//
// FASE 2: EXECUTION (ejecución)
// - Ejecuta el código línea por línea
// - Asigna valores a variables
// - Ejecuta funciones
//
// Call Stack:
// - Estructura LIFO (Last In, First Out)
// - Cada función crea un contexto que se apila
// - Cuando termina, se desapila
// - Si el stack crece demasiado → "Stack Overflow"

// ============================================
// ANALOGÍA
// ============================================
// El Execution Context es como un "ambiente de trabajo":
// - Cuando entrás a una oficina (función), tenés:
//   - Tu escritorio (variables locales)
//   - Acceso a la recepción (variables globales)
//   - Tus herramientas (funciones internas)
//
// El Call Stack es como una pila de platos:
// - Cada plato es una función
// - Agregás platos arriba (llamás funciones)
// - Sacás platos desde arriba (funciones terminan)
// - Si apilas demasiados platos → se cae (Stack Overflow)
```

**Resultado al ejecutar:**
```
--- Dentro de la función ---
Variable local: Soy local
Variable global: Soy global
--- Dentro de función interna ---
Variable interna: Soy más interna
Variable local: Soy local
Variable global: Soy global
--- Call Stack Demo ---
1. Ejecutando primera()
2. Ejecutando segunda()
3. Ejecutando tercera()
4. Terminó segunda()
5. Terminó primera()
```

---

#### 🎯 TU TURNO:

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

**PLANTILLA:**
```javascript
// 1. Variable global
// TU CÓDIGO AQUÍ

function nivelA() {
    // 2. Variable local nivel = "A"
    // TU CÓDIGO AQUÍ
    
    console.log("Entrando a nivelA");
    
    // 3. Llamar a nivelB
    // TU CÓDIGO AQUÍ
    
    console.log("Saliendo de nivelA");
}

function nivelB() {
    // 4. Variable local nivel = "B"
    // TU CÓDIGO AQUÍ
    
    console.log("Entrando a nivelB");
    
    // 5. Llamar a nivelC
    // TU CÓDIGO AQUÍ
    
    console.log("Saliendo de nivelB");
}

function nivelC() {
    console.log("Estoy en nivelC (fondo del stack)");
    
    // 6. Mostrar valor de "nivel"
    // TU CÓDIGO AQUÍ
}

// 7. Llamar a nivelA
// TU CÓDIGO AQUÍ
```

**RESULTADO ESPERADO:**
```
Entrando a nivelA
Entrando a nivelB
Estoy en nivelC (fondo del stack)
Nivel en nivelC: B
Saliendo de nivelB
Saliendo de nivelA
```

**Diagrama del Call Stack:**
```
[nivelC]  ← Fondo del stack (se ejecuta primero en terminar)
[nivelB]
[nivelA]
[Global]  ← Base del stack
```

---

#### 💡 HINTS (solo si te trabás >15 min):

**Hint 1:** El orden de los console.log muestra cómo funciona el call stack: primero entran todas las funciones (A → B → C), luego salen en orden inverso (C → B → A).

**Hint 2:** En `nivelC()`, cuando hacés `console.log(nivel)`, JavaScript busca en el scope chain. Como `nivelC` NO tiene variable `nivel` propia, busca en el scope donde fue llamada (dentro de `nivelB`), por eso muestra "B".

**Hint 3:** Cada función crea su propio execution context. Cuando se llama a una función, se apila en el call stack. Cuando termina, se desapila.

---

---

### Ejercicio 6: Closure Preview (Preparación para Fase 2)

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Introducción a Closures
// ============================================

// 1. FUNCIÓN QUE RETORNA FUNCIÓN (closure básico)
function crearSaludo(nombre) {
    // La variable "nombre" vive en el scope de crearSaludo
    
    // Esta función interna "recuerda" el scope donde fue creada
    return function() {
        console.log("Hola, " + nombre + "!");
    };
    
    // Cuando crearSaludo termina, normalmente "nombre" desaparecería
    // Pero como la función interna la usa, JavaScript la MANTIENE VIVA
    // Esto es un CLOSURE
}

// Crear dos saludos diferentes
const saludarJuan = crearSaludo("Juan");
const saludarMaria = crearSaludo("María");

// Aunque crearSaludo() ya terminó, las funciones retornadas
// RECUERDAN el valor de "nombre" que tenían
saludarJuan();   // "Hola, Juan!"
saludarMaria();  // "Hola, María!"

// 2. CLOSURE con DATOS PRIVADOS
function crearContador() {
    // "count" es privada (no se puede acceder desde afuera)
    let count = 0;
    
    // Retornamos un objeto con métodos que SÍ pueden acceder a "count"
    return {
        incrementar: function() {
            count++;
            console.log("Contador:", count);
        },
        decrementar: function() {
            count--;
            console.log("Contador:", count);
        },
        obtenerValor: function() {
            return count;
        }
    };
}

const miContador = crearContador();
miContador.incrementar();  // Contador: 1
miContador.incrementar();  // Contador: 2
miContador.decrementar();  // Contador: 1
console.log("Valor actual:", miContador.obtenerValor());  // 1

// NO podemos acceder directamente a "count"
// console.log(miContador.count);  // undefined
// Esta es la MAGIA de los closures: privacidad

// 3. MÚLTIPLES INSTANCIAS INDEPENDIENTES
const contador1 = crearContador();
const contador2 = crearContador();

contador1.incrementar();  // Contador: 1
contador1.incrementar();  // Contador: 2

contador2.incrementar();  // Contador: 1

// Cada instancia tiene su PROPIA copia de "count"
console.log("Contador 1:", contador1.obtenerValor());  // 2
console.log("Contador 2:", contador2.obtenerValor());  // 1

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// CLOSURE = Función + Scope donde fue creada
//
// Cuando una función "recuerda" variables de su scope padre
// incluso después de que el scope padre haya terminado
//
// 3 ingredientes de un closure:
// 1. Función externa que crea variables
// 2. Función interna que USA esas variables
// 3. La función interna se RETORNA o se GUARDA
//
// JavaScript mantiene vivas las variables que la función interna necesita
// Esto se llama "cerrar sobre" las variables (closure)

// ============================================
// ANALOGÍA
// ============================================
// Un closure es como una cápsula del tiempo:
// - La función externa es como poner cosas en la cápsula
// - La función interna es la llave para abrir la cápsula
// - Aunque pasen años (la función externa termine), 
//   la cápsula mantiene las cosas intactas
// - Cada vez que llamas a la función interna, 
//   abrís la cápsula y ves las cosas que guardaste
```

**Resultado al ejecutar:**
```
Hola, Juan!
Hola, María!
Contador: 1
Contador: 2
Contador: 1
Valor actual: 1
Contador: 1
Contador: 2
Contador: 1
Contador 1: 2
Contador 2: 1
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá una función `crearMultiplicador` que demuestre closures:
1. Recibe un parámetro `factor` (ejemplo: 5)
2. Retorna una función que recibe un `numero`
3. La función retornada multiplica `numero` por `factor`
4. Creá dos multiplicadores: uno por 2 y otro por 10
5. Probá ambos con diferentes números

**PLANTILLA:**
```javascript
function crearMultiplicador(factor) {
    // 1. Retornar una función que usa "factor"
    return function(numero) {
        // 2. Multiplicar numero por factor
        // TU CÓDIGO AQUÍ
    };
}

// 3. Crear multiplicador por 2
// TU CÓDIGO AQUÍ (const multiplicarPor2 = ...)

// 4. Crear multiplicador por 10
// TU CÓDIGO AQUÍ (const multiplicarPor10 = ...)

// 5. Probar ambos multiplicadores
console.log("5 x 2 =", multiplicarPor2(5));
console.log("5 x 10 =", multiplicarPor10(5));
console.log("7 x 2 =", multiplicarPor2(7));
console.log("3 x 10 =", multiplicarPor10(3));
```

**RESULTADO ESPERADO:**
```
5 x 2 = 10
5 x 10 = 50
7 x 2 = 14
3 x 10 = 30
```

---

#### 💡 HINTS (solo si te trabás >15 min):

**Hint 1:** La función retornada debe hacer: `return numero * factor;`. La variable `factor` viene del scope de `crearMultiplicador`, por eso es un closure.

**Hint 2:** Cada llamada a `crearMultiplicador` crea una NUEVA función con su PROPIO `factor`. Por eso `multiplicarPor2` y `multiplicarPor10` son independientes.

**Hint 3:** Esto es un closure porque la función interna "recuerda" el valor de `factor` incluso después de que `crearMultiplicador` terminó de ejecutarse.

---

---

## 🎯 CHECKLIST DE PROGRESO

Marcá cada ejercicio cuando lo completes:

- [ ] Ejercicio 1: Scope Global vs Local
- [ ] Ejercicio 2: Hoisting Básico
- [ ] Ejercicio 3: Scope Chain
- [ ] Ejercicio 4: Block Scope vs Function Scope
- [ ] Ejercicio 5: Contexto de Ejecución Básico
- [ ] Ejercicio 6: Closure Preview

---

## 🎊 AL COMPLETAR TODOS LOS EJERCICIOS

**¡Felicitaciones!** Completaste el Warmup Fase 1.

**Has dominado:**
- ✅ Scope global y local
- ✅ Hoisting (var vs let/const)
- ✅ Scope chain (búsqueda de variables)
- ✅ Block scope vs function scope
- ✅ Execution context y call stack
- ✅ Introducción a closures

**Próximo paso:** Proyecto Integrador 1 - Validador de Formulario con Scope Modular

---

## 📝 NOTAS IMPORTANTES

### ¿Qué hacer si te trabás?
1. Releé el ejemplo resuelto con MÁS atención
2. Dibujá un diagrama del scope/contexto en papel
3. Usá console.log() para ver qué está pasando
4. Probá casos más simples primero
5. Usá los hints si >15 min
6. Preguntá si >30 min

### Governor recuerda:
- ⏱️ Máximo 30 min por ejercicio
- ✅ Si funciona al 80% → NEXT
- ❌ NO iterar buscando perfección
- 🎯 Aprender > código perfecto

### Reconocimiento:
- Cada ejercicio completado = concepto dominado
- Estos conceptos son FUNDAMENTALES
- Muchos devs con años de experiencia NO los dominan
- Estás construyendo bases sólidas

---

**FIN DEL WARMUP FASE 1**

Versión: 1.0  
Fecha: Diciembre 2025  
Ejercicios: 6  
Duración estimada: 6-8 horas
