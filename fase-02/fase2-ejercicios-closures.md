# 🔥 SERIE DE EJERCICIOS FASE 2: CLOSURES

**Duración total:** 8-10 horas (distribuido en 3-4 días)  
**Objetivo:** Dominar closures desde lo básico hasta casos avanzados - crear datos privados, factories, memoization y decorators

---

## ⚠️ INSTRUCCIONES GENERALES

### ⏱️ Governor (límites):
- **Tiempo por ejercicio:** Máximo 30-40 minutos
- **Si te trabás >20 min:** Ver Hint 1
- **Si te trabás >30 min:** Ver Hint 2
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

### Ejercicio 1: Closure Básico

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Closure Básico
// ============================================

// 1. FUNCIÓN QUE RETORNA FUNCIÓN
function crearSaludo(saludo) {
    // "saludo" vive en el scope de crearSaludo
    
    // Esta función interna "recuerda" el scope donde fue creada
    return function(nombre) {
        // Usa la variable "saludo" del scope padre
        // Aunque crearSaludo ya terminó, "saludo" sigue viva
        console.log(saludo + ", " + nombre + "!");
    };
}

// Crear diferentes saludos
const saludarHola = crearSaludo("Hola");
const saludarBuenos = crearSaludo("Buenos días");
const saludarChau = crearSaludo("Chau");

// Cada función "recuerda" SU PROPIO valor de "saludo"
saludarHola("Juan");        // "Hola, Juan!"
saludarBuenos("María");     // "Buenos días, María!"
saludarChau("Pedro");       // "Chau, Pedro!"

// ============================================
// EJEMPLO 2: Por qué es un CLOSURE
// ============================================

function crearMultiplicador(factor) {
    console.log("Creando multiplicador con factor:", factor);
    
    // Cuando esta función retorna, normalmente "factor" desaparecería
    // Pero como la función interna la usa, JavaScript la MANTIENE VIVA
    
    return function(numero) {
        console.log("Multiplicando", numero, "por", factor);
        return numero * factor;
    };
}

const multiplicarPor5 = crearMultiplicador(5);
// En este punto, crearMultiplicador() YA TERMINÓ
// Pero "factor = 5" sigue viva en memoria

console.log(multiplicarPor5(10));  // 50
console.log(multiplicarPor5(7));   // 35

const multiplicarPor10 = crearMultiplicador(10);
console.log(multiplicarPor10(3));  // 30

// Cada instancia tiene su PROPIO "factor" en memoria
// multiplicarPor5 recuerda factor = 5
// multiplicarPor10 recuerda factor = 10

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// CLOSURE = Función + Scope donde fue creada
//
// 3 ingredientes de un closure:
// 1. Función EXTERNA que define variables
// 2. Función INTERNA que USA esas variables
// 3. La función interna se RETORNA o se GUARDA
//
// JavaScript mantiene vivas las variables que la función interna necesita
// Esto se llama "cerrar sobre" las variables (closure = cierre)
//
// Cada vez que llamas a la función externa, creas un NUEVO closure
// con su PROPIA copia de las variables

// ============================================
// ANALOGÍA
// ============================================
// Un closure es como una MOCHILA:
// - La función externa "empaca" variables en la mochila
// - La función interna "lleva" la mochila
// - Cada función interna tiene su PROPIA mochila
// - Incluso cuando la función externa termina, 
//   la mochila sigue con la función interna
// - Cada vez que llamas a la función interna, 
//   "abre su mochila" y usa las variables que guardó
```

**Resultado al ejecutar:**
```
Creando multiplicador con factor: 5
Multiplicando 10 por 5
50
Multiplicando 7 por 5
35
Creando multiplicador con factor: 10
Multiplicando 3 por 10
30
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá una función `crearSumador` que demuestre closures:
1. Recibe un parámetro `valorInicial`
2. Retorna una función que recibe `incremento`
3. La función retornada suma `valorInicial + incremento`
4. Creá dos sumadores: uno con valor inicial 100, otro con 1000
5. Probá ambos con diferentes incrementos

**PLANTILLA:**
```javascript
function crearSumador(valorInicial) {
    // 1. Retornar función que recibe "incremento"
    return function(incremento) {
        // 2. Sumar valorInicial + incremento
        // TU CÓDIGO AQUÍ
    };
}

// 3. Crear sumador con valor inicial 100
// TU CÓDIGO AQUÍ (const sumar100 = ...)

// 4. Crear sumador con valor inicial 1000
// TU CÓDIGO AQUÍ (const sumar1000 = ...)

// 5. Probar ambos
console.log("100 + 5 =", sumar100(5));
console.log("1000 + 5 =", sumar1000(5));
console.log("100 + 25 =", sumar100(25));
console.log("1000 + 50 =", sumar1000(50));
```

**RESULTADO ESPERADO:**
```
100 + 5 = 105
1000 + 5 = 1005
100 + 25 = 125
1000 + 50 = 1050
```

---

#### 💡 HINTS (solo si te trabás >20 min):

**Hint 1:** La función retornada debe hacer: `return valorInicial + incremento;`. La variable `valorInicial` viene del scope de `crearSumador`, por eso es un closure.

**Hint 2:** Cada llamada a `crearSumador` crea una NUEVA función con su PROPIO `valorInicial`. Son independientes.

**Hint 3:** Esto es un closure porque la función interna "recuerda" `valorInicial` incluso después de que `crearSumador` terminó.

---

---

### Ejercicio 2: Contador Privado

⏱️ **TIEMPO LÍMITE:** 40 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Contador Privado con Closures
// ============================================

// 1. FUNCIÓN QUE CREA UN CONTADOR
function crearContador() {
    // Variable PRIVADA (no accesible desde afuera)
    let count = 0;
    
    // Retornamos un OBJETO con métodos que SÍ pueden acceder a "count"
    return {
        // Método para incrementar
        incrementar: function() {
            count++;  // Usa la variable privada "count"
            console.log("Contador:", count);
            return count;
        },
        
        // Método para decrementar
        decrementar: function() {
            count--;
            console.log("Contador:", count);
            return count;
        },
        
        // Método para obtener valor
        obtenerValor: function() {
            return count;
        },
        
        // Método para resetear
        resetear: function() {
            count = 0;
            console.log("Contador reseteado");
            return count;
        }
    };
}

// Crear un contador
const miContador = crearContador();

// Usar los métodos públicos
miContador.incrementar();  // Contador: 1
miContador.incrementar();  // Contador: 2
miContador.incrementar();  // Contador: 3
miContador.decrementar();  // Contador: 2

console.log("Valor actual:", miContador.obtenerValor());  // 2

// NO podemos acceder directamente a "count"
console.log(miContador.count);  // undefined (es privada!)

// Intentar modificar count directamente NO funciona
miContador.count = 999;
console.log("Después de asignar 999:", miContador.obtenerValor());  // Sigue siendo 2

miContador.resetear();  // Contador reseteado
console.log("Después de reset:", miContador.obtenerValor());  // 0

// ============================================
// EJEMPLO 2: Múltiples Instancias Independientes
// ============================================

const contador1 = crearContador();
const contador2 = crearContador();

contador1.incrementar();  // Contador: 1
contador1.incrementar();  // Contador: 2
contador1.incrementar();  // Contador: 3

contador2.incrementar();  // Contador: 1
contador2.incrementar();  // Contador: 2

// Cada contador tiene su PROPIA variable "count"
console.log("Contador 1:", contador1.obtenerValor());  // 3
console.log("Contador 2:", contador2.obtenerValor());  // 2

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// DATOS PRIVADOS con Closures:
//
// 1. La variable "count" vive en el scope de crearContador
// 2. Los métodos retornados "cierran sobre" esa variable
// 3. Solo los métodos pueden acceder/modificar "count"
// 4. Desde afuera NO hay forma de tocar "count" directamente
// 5. Esto es ENCAPSULACIÓN (ocultar datos internos)
//
// Cada instancia (cada llamada a crearContador) tiene:
// - Su PROPIA copia de "count"
// - Sus PROPIOS métodos que apuntan a ESA copia
// - Son completamente independientes

// ============================================
// ANALOGÍA
// ============================================
// El contador es como una CAJA FUERTE:
// - El dinero (count) está DENTRO de la caja fuerte
// - Solo podés acceder al dinero usando los botones (métodos)
// - No podés abrir la caja y tocar el dinero directamente
// - Cada persona tiene su PROPIA caja fuerte (instancias independientes)
// - Los botones (incrementar, decrementar) son la ÚNICA forma de interactuar
```

**Resultado al ejecutar:**
```
Contador: 1
Contador: 2
Contador: 3
Contador: 2
Valor actual: 2
undefined
Después de asignar 999: 2
Contador reseteado
Después de reset: 0
Contador: 1
Contador: 2
Contador: 3
Contador: 1
Contador: 2
Contador 1: 3
Contador 2: 2
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá una función `crearBanco` que simule una cuenta bancaria con datos privados:
1. Variable privada `saldo = 0`
2. Método `depositar(monto)` que suma al saldo
3. Método `retirar(monto)` que resta del saldo (solo si hay suficiente)
4. Método `verSaldo()` que retorna el saldo actual
5. Probá crear 2 cuentas independientes

**PLANTILLA:**
```javascript
function crearBanco() {
    // 1. Variable privada "saldo"
    // TU CÓDIGO AQUÍ
    
    return {
        // 2. Método depositar
        depositar: function(monto) {
            // Sumar monto al saldo
            // Mostrar mensaje
            // TU CÓDIGO AQUÍ
        },
        
        // 3. Método retirar
        retirar: function(monto) {
            // Verificar si hay suficiente saldo
            // Si hay: restar monto
            // Si no hay: mostrar error
            // TU CÓDIGO AQUÍ
        },
        
        // 4. Método verSaldo
        verSaldo: function() {
            // Retornar saldo
            // TU CÓDIGO AQUÍ
        }
    };
}

// 5. Crear dos cuentas
const cuenta1 = crearBanco();
const cuenta2 = crearBanco();

// Probar cuenta1
cuenta1.depositar(100);
cuenta1.depositar(50);
cuenta1.retirar(30);
console.log("Saldo cuenta1:", cuenta1.verSaldo());

// Probar cuenta2
cuenta2.depositar(500);
cuenta2.retirar(600);  // Error: insuficiente
console.log("Saldo cuenta2:", cuenta2.verSaldo());

// Verificar que son independientes
console.log("Cuenta1 final:", cuenta1.verSaldo());
```

**RESULTADO ESPERADO:**
```
Depositado: $100. Saldo: $100
Depositado: $50. Saldo: $150
Retirado: $30. Saldo: $120
Saldo cuenta1: 120
Depositado: $500. Saldo: $500
Error: Saldo insuficiente
Saldo cuenta2: 500
Cuenta1 final: 120
```

---

#### 💡 HINTS (solo si te trabás >20 min):

**Hint 1:** En `depositar`, hacé: `saldo += monto; console.log("Depositado: $" + monto + ". Saldo: $" + saldo);`

**Hint 2:** En `retirar`, usá un `if`: `if (monto <= saldo) { saldo -= monto; ... } else { console.log("Error..."); }`

**Hint 3:** La variable `saldo` es privada porque está DENTRO de `crearBanco()` pero FUERA de los métodos. Los métodos la pueden usar (closure), pero desde afuera no se puede acceder.

---

---

### Ejercicio 3: Factory Functions

⏱️ **TIEMPO LÍMITE:** 40 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Factory Functions con Closures
// ============================================

// 1. FACTORY QUE CREA OBJETOS "Usuario"
function crearUsuario(nombre, edad) {
    // Datos privados
    let _nombre = nombre;      // _ indica "privado" por convención
    let _edad = edad;
    let _email = null;
    
    // Retornamos objeto con métodos públicos
    return {
        // Getter de nombre
        getNombre: function() {
            return _nombre;
        },
        
        // Setter de nombre (con validación)
        setNombre: function(nuevoNombre) {
            if (nuevoNombre.length >= 3) {
                _nombre = nuevoNombre;
                console.log("Nombre actualizado:", _nombre);
            } else {
                console.log("Error: Nombre muy corto");
            }
        },
        
        // Getter de edad
        getEdad: function() {
            return _edad;
        },
        
        // Método que usa datos privados
        cumplirAnios: function() {
            _edad++;
            console.log(_nombre + " cumplió " + _edad + " años!");
        },
        
        // Setter de email
        setEmail: function(email) {
            _email = email;
            console.log("Email guardado para " + _nombre);
        },
        
        // Método que muestra info completa
        mostrarInfo: function() {
            console.log("--- Usuario ---");
            console.log("Nombre:", _nombre);
            console.log("Edad:", _edad);
            console.log("Email:", _email || "No especificado");
        }
    };
}

// Crear usuarios
const usuario1 = crearUsuario("Juan", 25);
const usuario2 = crearUsuario("María", 30);

// Usar métodos
usuario1.mostrarInfo();
// --- Usuario ---
// Nombre: Juan
// Edad: 25
// Email: No especificado

usuario1.setEmail("juan@email.com");
usuario1.cumplirAnios();
usuario1.mostrarInfo();

usuario2.cumplirAnios();
usuario2.setNombre("María González");

// Intentar acceder a datos privados directamente
console.log(usuario1._nombre);  // undefined (es privado!)

// Intentar modificar edad directamente NO funciona
usuario1._edad = 100;
console.log("Edad después de asignar 100:", usuario1.getEdad());  // Sigue siendo 26

// ============================================
// CONTEXTO DE USO REAL
// ============================================
// Este pattern lo ves en:
// - React hooks (useState, useEffect) usan closures para mantener estado
// - Librerías como Lodash/Ramda para crear funciones configuradas
// - Módulos que necesitan privacidad sin usar clases ES6
//
// Antes de las clases ES6 (class), este era el ÚNICO way de tener:
// - Datos privados
// - Métodos públicos
// - Instancias independientes

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// FACTORY FUNCTION:
// - Función que CREA y RETORNA objetos
// - NO usa "new" ni "this"
// - Usa closures para datos privados
// - Cada llamada crea un objeto NUEVO independiente
//
// Ventajas:
// - Más simple que clases/prototypes
// - Datos privados reales (no _propiedades por convención)
// - No hay problemas con "this"
// - Más fácil de testear

// ============================================
// ANALOGÍA
// ============================================
// Una factory function es como una FÁBRICA de juguetes:
// - Cada vez que llamas a la factory, sale un juguete NUEVO
// - Cada juguete tiene sus PROPIAS piezas internas (datos privados)
// - Solo podés interactuar con el juguete por sus botones (métodos públicos)
// - No podés abrir el juguete y tocar las piezas directamente
```

**Resultado al ejecutar:**
```
--- Usuario ---
Nombre: Juan
Edad: 25
Email: No especificado
Email guardado para Juan
Juan cumplió 26 años!
--- Usuario ---
Nombre: Juan
Edad: 26
Email: juan@email.com
María cumplió 31 años!
Nombre actualizado: María González
undefined
Edad después de asignar 100: 26
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá una factory function `crearProducto` que simule un producto con stock:
1. Parámetros: `nombre`, `precio`, `stockInicial`
2. Datos privados: `_nombre`, `_precio`, `_stock`
3. Métodos públicos:
   - `vender(cantidad)` - reduce stock si hay suficiente
   - `reabastecer(cantidad)` - aumenta stock
   - `verStock()` - retorna stock actual
   - `verPrecio()` - retorna precio
   - `verInfo()` - muestra toda la info
4. Creá 2 productos y probá los métodos

**PLANTILLA:**
```javascript
function crearProducto(nombre, precio, stockInicial) {
    // 1. Datos privados
    // TU CÓDIGO AQUÍ
    
    return {
        // 2. Método vender
        vender: function(cantidad) {
            // Verificar si hay stock suficiente
            // Si hay: restar del stock y mostrar mensaje
            // Si no: mostrar error
            // TU CÓDIGO AQUÍ
        },
        
        // 3. Método reabastecer
        reabastecer: function(cantidad) {
            // Sumar cantidad al stock
            // Mostrar mensaje
            // TU CÓDIGO AQUÍ
        },
        
        // 4. Método verStock
        verStock: function() {
            // Retornar stock
            // TU CÓDIGO AQUÍ
        },
        
        // 5. Método verPrecio
        verPrecio: function() {
            // Retornar precio
            // TU CÓDIGO AQUÍ
        },
        
        // 6. Método verInfo
        verInfo: function() {
            // Mostrar nombre, precio y stock
            // TU CÓDIGO AQUÍ
        }
    };
}

// 7. Crear dos productos
const laptop = crearProducto("Laptop", 1000, 5);
const mouse = crearProducto("Mouse", 20, 50);

// Probar métodos
laptop.verInfo();
laptop.vender(2);
laptop.vender(10);  // Error: no hay stock
laptop.reabastecer(10);
console.log("Stock actual de laptop:", laptop.verStock());

mouse.vender(30);
mouse.verInfo();
```

**RESULTADO ESPERADO:**
```
Producto: Laptop | Precio: $1000 | Stock: 5
Vendido: 2 unidades de Laptop. Stock restante: 3
Error: Stock insuficiente. Solo hay 3 unidades de Laptop
Reabastecido: 10 unidades de Laptop. Stock: 13
Stock actual de laptop: 13
Vendido: 30 unidades de Mouse. Stock restante: 20
Producto: Mouse | Precio: $20 | Stock: 20
```

---

#### 💡 HINTS (solo si te trabás >20 min):

**Hint 1:** Estructura de `vender`: `if (cantidad <= _stock) { _stock -= cantidad; console.log(...); } else { console.log("Error..."); }`

**Hint 2:** En `verInfo`, usá: `console.log("Producto: " + _nombre + " | Precio: $" + _precio + " | Stock: " + _stock);`

**Hint 3:** Los datos privados (`_nombre`, `_precio`, `_stock`) están en el scope de `crearProducto`. Los métodos hacen closure sobre ellos y pueden acceder/modificar, pero desde afuera no.

---

**🎯 CONTEXTO DE USO REAL (Ejercicio 3):**

Este pattern de Factory Functions lo verás en:
- **React Hooks:** `useState()` internamente usa closures para mantener el estado
- **Redux:** Action creators son factories
- **Testing:** Mocks y stubs se crean con factories
- **Librerías funcionales:** Lodash, Ramda usan factories para funciones configuradas

---

---

### Ejercicio 4: Loop y Closures (Problema Clásico)

⏱️ **TIEMPO LÍMITE:** 40 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Problema Clásico de Closures en Loops
// ============================================

// 1. EL PROBLEMA (comportamiento inesperado)
console.log("--- PROBLEMA ---");

function crearFuncionesProblema() {
    const funciones = [];
    
    // Loop con VAR (problema clásico)
    for (var i = 0; i < 3; i++) {
        funciones.push(function() {
            console.log("El valor de i es:", i);
        });
    }
    
    return funciones;
}

const funcionesProblema = crearFuncionesProblema();

// ¿Qué esperarías? 0, 1, 2
// ¿Qué pasa en realidad? 3, 3, 3
funcionesProblema[0]();  // El valor de i es: 3
funcionesProblema[1]();  // El valor de i es: 3
funcionesProblema[2]();  // El valor de i es: 3

// ¿POR QUÉ?
// - var tiene FUNCTION SCOPE (no block scope)
// - Las 3 funciones cierran sobre la MISMA variable "i"
// - Cuando las funciones se ejecutan, el loop YA TERMINÓ
// - En ese momento, i = 3
// - Las 3 funciones ven i = 3

// ============================================
// SOLUCIÓN 1: Usar LET (block scope)
// ============================================
console.log("\n--- SOLUCIÓN 1: LET ---");

function crearFuncionesLet() {
    const funciones = [];
    
    // Loop con LET
    for (let i = 0; i < 3; i++) {
        // let crea una NUEVA variable "i" en cada iteración
        funciones.push(function() {
            console.log("El valor de i es:", i);
        });
    }
    
    return funciones;
}

const funcionesLet = crearFuncionesLet();

funcionesLet[0]();  // El valor de i es: 0
funcionesLet[1]();  // El valor de i es: 1
funcionesLet[2]();  // El valor de i es: 2

// ¿POR QUÉ FUNCIONA?
// - let tiene BLOCK SCOPE
// - Cada iteración del loop crea un NUEVO scope
// - Cada función cierra sobre SU PROPIA copia de "i"

// ============================================
// SOLUCIÓN 2: IIFE (Immediately Invoked Function Expression)
// ============================================
console.log("\n--- SOLUCIÓN 2: IIFE ---");

function crearFuncionesIIFE() {
    const funciones = [];
    
    for (var i = 0; i < 3; i++) {
        // IIFE crea un nuevo scope que "captura" el valor de i
        funciones.push((function(valorActual) {
            return function() {
                console.log("El valor es:", valorActual);
            };
        })(i));  // ← Pasamos i como argumento AHORA
    }
    
    return funciones;
}

const funcionesIIFE = crearFuncionesIIFE();

funcionesIIFE[0]();  // El valor es: 0
funcionesIIFE[1]();  // El valor es: 1
funcionesIIFE[2]();  // El valor es: 2

// ¿POR QUÉ FUNCIONA?
// - La IIFE se ejecuta INMEDIATAMENTE en cada iteración
// - Crea un nuevo scope con su propio parámetro "valorActual"
// - "valorActual" captura el valor de "i" EN ESE MOMENTO
// - La función retornada cierra sobre "valorActual", no sobre "i"

// ============================================
// SOLUCIÓN 3: Helper Function
// ============================================
console.log("\n--- SOLUCIÓN 3: HELPER FUNCTION ---");

function crearFuncionesHelper() {
    const funciones = [];
    
    // Función helper que "captura" el valor
    function crearFuncion(valor) {
        return function() {
            console.log("El valor es:", valor);
        };
    }
    
    for (var i = 0; i < 3; i++) {
        // Cada llamada a crearFuncion crea un nuevo scope
        funciones.push(crearFuncion(i));
    }
    
    return funciones;
}

const funcionesHelper = crearFuncionesHelper();

funcionesHelper[0]();  // El valor es: 0
funcionesHelper[1]();  // El valor es: 1
funcionesHelper[2]();  // El valor es: 2

// ¿POR QUÉ FUNCIONA?
// - Cada llamada a crearFuncion() crea un nuevo scope
// - El parámetro "valor" captura el valor de "i" EN ESE MOMENTO
// - La función retornada cierra sobre "valor", no sobre "i"

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// EL PROBLEMA:
// - var tiene function scope (ignora el bloque del loop)
// - Todas las funciones cierran sobre la MISMA variable
// - Cuando las funciones se ejecutan, ven el valor FINAL de la variable
//
// LAS SOLUCIONES:
// 1. let → Crea nuevo scope por iteración (más simple)
// 2. IIFE → Crea nuevo scope manualmente (legacy)
// 3. Helper → Crea nuevo scope con función (más legible)

// ============================================
// ANALOGÍA
// ============================================
// Es como escribir en una PIZARRA:
// 
// PROBLEMA (var):
// - Hay UNA sola pizarra
// - Escribís 0, luego lo borrás y escribís 1, luego 2, luego 3
// - 3 personas leen la pizarra al final → todas ven 3
//
// SOLUCIÓN (let):
// - Hay 3 pizarras diferentes (una por iteración)
// - Escribís 0 en pizarra 1, 1 en pizarra 2, 2 en pizarra 3
// - Cada persona lee SU pizarra → ven 0, 1, 2
```

**Resultado al ejecutar:**
```
--- PROBLEMA ---
El valor de i es: 3
El valor de i es: 3
El valor de i es: 3

--- SOLUCIÓN 1: LET ---
El valor de i es: 0
El valor de i es: 1
El valor de i es: 2

--- SOLUCIÓN 2: IIFE ---
El valor es: 0
El valor es: 1
El valor es: 2

--- SOLUCIÓN 3: HELPER FUNCTION ---
El valor es: 0
El valor es: 1
El valor es: 2
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá un sistema que demuestre el problema y sus soluciones:
1. Función `crearBotonesProblema()` con var (reproduce el problema)
2. Función `crearBotonesLet()` con let (solución simple)
3. Función `crearBotonesHelper()` con función helper (solución legacy)
4. Cada función retorna array de funciones que hacen console.log del índice

**PLANTILLA:**
```javascript
// 1. CON PROBLEMA (var)
function crearBotonesProblema() {
    const botones = [];
    
    for (var i = 0; i < 5; i++) {
        botones.push(function() {
            console.log("Botón #" + i + " clickeado");
        });
    }
    
    return botones;
}

// 2. SOLUCIÓN CON LET
function crearBotonesLet() {
    const botones = [];
    
    // TU CÓDIGO AQUÍ (usar let en el loop)
    
    return botones;
}

// 3. SOLUCIÓN CON HELPER FUNCTION
function crearBotonesHelper() {
    const botones = [];
    
    // Función helper
    function crearBoton(indice) {
        // Retornar función que hace console.log del índice
        // TU CÓDIGO AQUÍ
    }
    
    for (var i = 0; i < 5; i++) {
        // TU CÓDIGO AQUÍ (usar crearBoton)
    }
    
    return botones;
}

// Probar las 3 versiones
console.log("--- CON PROBLEMA ---");
const botonesProblema = crearBotonesProblema();
botonesProblema[0]();
botonesProblema[2]();
botonesProblema[4]();

console.log("\n--- CON LET ---");
const botonesLet = crearBotonesLet();
botonesLet[0]();
botonesLet[2]();
botonesLet[4]();

console.log("\n--- CON HELPER ---");
const botonesHelper = crearBotonesHelper();
botonesHelper[0]();
botonesHelper[2]();
botonesHelper[4]();
```

**RESULTADO ESPERADO:**
```
--- CON PROBLEMA ---
Botón #5 clickeado
Botón #5 clickeado
Botón #5 clickeado

--- CON LET ---
Botón #0 clickeado
Botón #2 clickeado
Botón #4 clickeado

--- CON HELPER ---
Botón #0 clickeado
Botón #2 clickeado
Botón #4 clickeado
```

---

#### 💡 HINTS (solo si te trabás >20 min):

**Hint 1:** En `crearBotonesLet()`, solo cambiá `var i` por `let i` en el loop.

**Hint 2:** En `crearBoton(indice)`, retorná: `return function() { console.log("Botón #" + indice + " clickeado"); };`

**Hint 3:** En `crearBotonesHelper()`, dentro del loop hacé: `botones.push(crearBoton(i));`

---

**🎯 CONTEXTO DE USO REAL (Ejercicio 4):**

Este problema aparece CONSTANTEMENTE en:
- **Event listeners en loops:** Agregar click handlers a botones
- **Async code:** setTimeout/setInterval dentro de loops
- **React (antiguo):** Agregar event handlers en listas
- **Cualquier callback en loop:** fetch, promises, etc.

Es uno de los bugs MÁS comunes en JavaScript.

---

---

### Ejercicio 5: Partial Application

⏱️ **TIEMPO LÍMITE:** 40 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Partial Application con Closures
// ============================================

// 1. FUNCIÓN ORIGINAL (recibe todos los parámetros)
function sumar(a, b, c) {
    return a + b + c;
}

console.log(sumar(1, 2, 3));  // 6

// 2. PARTIAL APPLICATION (pre-configurar algunos argumentos)
function crearSumadorParcial(a) {
    // "a" queda "fijado" en este closure
    return function(b, c) {
        // Solo pedimos b y c, "a" ya está capturado
        return a + b + c;
    };
}

const sumarCon10 = crearSumadorParcial(10);  // "a" = 10
console.log(sumarCon10(2, 3));  // 10 + 2 + 3 = 15
console.log(sumarCon10(5, 7));  // 10 + 5 + 7 = 22

const sumarCon100 = crearSumadorParcial(100);  // "a" = 100
console.log(sumarCon100(1, 1));  // 100 + 1 + 1 = 102

// ============================================
// EJEMPLO 2: Aplicación Parcial en 2 Niveles
// ============================================

function multiplicar(a, b, c) {
    return a * b * c;
}

// Aplicación parcial que retorna otra función parcial
function crearMultiplicador(a) {
    return function(b) {
        return function(c) {
            return a * b * c;
        };
    };
}

const multiplicarPor2 = crearMultiplicador(2);
const multiplicarPor2y3 = multiplicarPor2(3);
console.log(multiplicarPor2y3(4));  // 2 * 3 * 4 = 24

// O todo en una línea:
console.log(crearMultiplicador(2)(5)(10));  // 2 * 5 * 10 = 100

// ============================================
// EJEMPLO 3: Caso de Uso Real - Logger
// ============================================

function crearLogger(nivel) {
    // "nivel" queda fijado
    return function(mensaje) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${nivel}] ${timestamp} - ${mensaje}`);
    };
}

const logInfo = crearLogger("INFO");
const logError = crearLogger("ERROR");
const logWarning = crearLogger("WARNING");

logInfo("Aplicación iniciada");
logError("Conexión fallida");
logWarning("Memoria baja");

// ============================================
// EJEMPLO 4: Caso de Uso Real - Configuración
// ============================================

function crearEnviador(tipo) {
    return function(destinatario) {
        return function(mensaje) {
            console.log(`Enviando ${tipo} a ${destinatario}: ${mensaje}`);
        };
    };
}

const enviarEmail = crearEnviador("EMAIL");
const enviarSMS = crearEnviador("SMS");

const emailAJuan = enviarEmail("juan@email.com");
emailAJuan("Hola Juan!");
emailAJuan("Recordatorio de pago");

enviarSMS("555-1234")("Código de verificación: 1234");

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// PARTIAL APPLICATION (Aplicación Parcial):
// - Tomar una función con N parámetros
// - Crear una nueva función con ALGUNOS parámetros ya "fijados"
// - La nueva función solo necesita los parámetros restantes
//
// Ventajas:
// - Reutilización de código
// - Funciones pre-configuradas
// - Código más expresivo
// - Evita repetir argumentos comunes
//
// Diferencia con Currying:
// - Partial: Fija ALGUNOS argumentos, retorna función que espera los RESTANTES
// - Currying: TODOS los argumentos se pasan de a UNO

// ============================================
// CONTEXTO DE USO REAL
// ============================================
// Partial Application se usa en:
// - Librerías funcionales: Lodash (_.partial), Ramda (R.partial)
// - Event handlers con parámetros extra
// - Callbacks pre-configurados
// - React: Pasar parámetros extra a event handlers
// - Redux: Action creators con datos pre-configurados

// ============================================
// ANALOGÍA
// ============================================
// Partial application es como preparar una RECETA:
// - Receta original: "Mezclar harina + azúcar + huevos + leche"
// - Partial: "Ya mezclé harina + azúcar" → Solo te falta agregar huevos + leche
// - Es como tener ingredientes pre-mezclados
// - Reduces pasos cada vez que cocinas
```

**Resultado al ejecutar:**
```
6
15
22
102
100
24
[INFO] 14:30:45 - Aplicación iniciada
[ERROR] 14:30:45 - Conexión fallida
[WARNING] 14:30:45 - Memoria baja
Enviando EMAIL a juan@email.com: Hola Juan!
Enviando EMAIL a juan@email.com: Recordatorio de pago
Enviando SMS a 555-1234: Código de verificación: 1234
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá funciones con partial application:
1. `crearDescuento(porcentaje)` que retorna función que aplica ese descuento a un precio
2. `crearImpuesto(pais)` que retorna función que aplica impuesto según país:
   - Argentina: 21%
   - USA: 8%
   - España: 21%
3. Probá crear funciones pre-configuradas y usarlas

**PLANTILLA:**
```javascript
// 1. Función para descuentos
function crearDescuento(porcentaje) {
    return function(precio) {
        // Calcular precio con descuento
        // TU CÓDIGO AQUÍ
    };
}

// 2. Función para impuestos
function crearImpuesto(pais) {
    return function(precio) {
        // Determinar tasa según país
        // Calcular precio con impuesto
        // TU CÓDIGO AQUÍ
    };
}

// 3. Crear funciones pre-configuradas
const descuento10 = crearDescuento(10);
const descuento25 = crearDescuento(25);

const impuestoAR = crearImpuesto("Argentina");
const impuestoUSA = crearImpuesto("USA");

// 4. Probar
console.log("$100 con 10% descuento:", descuento10(100));
console.log("$200 con 25% descuento:", descuento25(200));

console.log("$100 con impuesto AR:", impuestoAR(100));
console.log("$100 con impuesto USA:", impuestoUSA(100));
```

**RESULTADO ESPERADO:**
```
$100 con 10% descuento: 90
$200 con 25% descuento: 150
$100 con impuesto AR: 121
$100 con impuesto USA: 108
```

---

#### 💡 HINTS (solo si te trabás >20 min):

**Hint 1:** En `crearDescuento`: `return precio - (precio * porcentaje / 100);`

**Hint 2:** En `crearImpuesto`, usá un objeto con las tasas: `const tasas = { "Argentina": 21, "USA": 8, "España": 21 };`

**Hint 3:** Para aplicar impuesto: `return precio + (precio * tasa / 100);`

---

**🎯 CONTEXTO DE USO REAL (Ejercicio 5):**

Partial application se usa en:
- **Lodash:** `_.partial()` para pre-configurar funciones
- **React:** Event handlers con parámetros: `onClick={() => handleClick(id)}`
- **Redux:** Action creators con datos fijos
- **Callbacks pre-configurados:** `fetch(url, configFija)`
- **Functional programming:** Compose, pipe, map con funciones parciales

---

---

### Ejercicio 6: Memoization Básica

⏱️ **TIEMPO LÍMITE:** 40 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Memoization con Closures
// ============================================

// 1. FUNCIÓN SIN MEMOIZATION (lenta si se llama muchas veces)
function fibonacci(n) {
    console.log("Calculando fibonacci(" + n + ")");
    
    if (n <= 1) return n;
    
    // Esto es LENTO porque recalcula valores repetidos
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("--- SIN MEMOIZATION ---");
console.log("Resultado:", fibonacci(5));
// Se llama fibonacci(3) DOS VECES, fibonacci(2) TRES VECES, etc.

// 2. CON MEMOIZATION (cachea resultados)
function crearFibonacciMemoizado() {
    // Caché privado (objeto que guarda resultados)
    const cache = {};
    
    return function fibonacci(n) {
        // Si ya lo calculamos antes, retornar del caché
        if (n in cache) {
            console.log("Retornando fibonacci(" + n + ") del caché");
            return cache[n];
        }
        
        console.log("Calculando fibonacci(" + n + ")");
        
        // Caso base
        if (n <= 1) {
            cache[n] = n;
            return n;
        }
        
        // Calcular y GUARDAR en caché
        cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
        return cache[n];
    };
}

const fibMemoizado = crearFibonacciMemoizado();

console.log("\n--- CON MEMOIZATION ---");
console.log("Resultado:", fibMemoizado(5));
console.log("\nSegunda llamada (del caché):");
console.log("Resultado:", fibMemoizado(5));

// ============================================
// EJEMPLO 2: Memoization Genérica
// ============================================

// Función que hace CUALQUIER función memoizable
function memoizar(fn) {
    const cache = {};
    
    return function(...args) {
        // Crear key única del caché usando los argumentos
        const key = JSON.stringify(args);
        
        // Si está en caché, retornar
        if (key in cache) {
            console.log("Retornando del caché:", key);
            return cache[key];
        }
        
        // Si no, calcular y guardar
        console.log("Calculando:", key);
        const resultado = fn(...args);
        cache[key] = resultado;
        return resultado;
    };
}

// Función costosa de ejemplo
function sumaLenta(a, b) {
    // Simular operación costosa
    let suma = 0;
    for (let i = 0; i < 100000000; i++) {
        suma += 0.0000001;
    }
    return a + b;
}

const sumaMemoizada = memoizar(sumaLenta);

console.log("\n--- SUMA MEMOIZADA ---");
console.time("Primera llamada");
console.log(sumaMemoizada(5, 3));
console.timeEnd("Primera llamada");

console.time("Segunda llamada (caché)");
console.log(sumaMemoizada(5, 3));
console.timeEnd("Segunda llamada (caché)");

// ============================================
// EJEMPLO 3: Caso de Uso Real - API Calls
// ============================================

function crearFetchMemoizado() {
    const cache = {};
    
    return async function(url) {
        if (url in cache) {
            console.log("Retornando del caché:", url);
            return cache[url];
        }
        
        console.log("Haciendo fetch:", url);
        const response = await fetch(url);
        const data = await response.json();
        
        cache[url] = data;
        return data;
    };
}

// const fetchMemoizado = crearFetchMemoizado();
// await fetchMemoizado("https://api.example.com/users");  // Fetch real
// await fetchMemoizado("https://api.example.com/users");  // Del caché

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// MEMOIZATION:
// - Técnica de optimización
// - Cachea (guarda) resultados de funciones costosas
// - Si se llama con los MISMOS argumentos, retorna resultado cacheado
// - Evita recalcular lo mismo múltiples veces
//
// Usos del Closure:
// - Variable "cache" es PRIVADA (vive en el closure)
// - Solo la función tiene acceso al cache
// - Cada instancia memoizada tiene su PROPIO cache
//
// Cuándo usar:
// - Funciones PURAS (mismo input → mismo output)
// - Cálculos costosos que se repiten
// - API calls que no cambian
// - Operaciones recursivas (fibonacci, factorial)

// ============================================
// CONTEXTO DE USO REAL
// ============================================
// Memoization se usa en:
// - React: useMemo(), React.memo() hacen memoization
// - Vue: computed properties tienen memoization built-in
// - Lodash: _.memoize() es esta técnica
// - GraphQL: DataLoader memoiza queries
// - Algoritmos: DP (Dynamic Programming) es memoization avanzado

// ============================================
// ANALOGÍA
// ============================================
// Memoization es como un CUADERNO DE RESPUESTAS:
// - La primera vez que resuelves un problema, lo calculas (lento)
// - Anotas la respuesta en el cuaderno
// - La próxima vez que aparece el MISMO problema, mirás el cuaderno (rápido)
// - No hace falta recalcular, ya sabés la respuesta
```

**Resultado al ejecutar (sin simular tiempo):**
```
--- SIN MEMOIZATION ---
Calculando fibonacci(5)
Calculando fibonacci(4)
Calculando fibonacci(3)
Calculando fibonacci(2)
Calculando fibonacci(1)
Calculando fibonacci(0)
Calculando fibonacci(1)
Calculando fibonacci(2)
Calculando fibonacci(1)
Calculando fibonacci(0)
Calculando fibonacci(3)
Calculando fibonacci(2)
Calculando fibonacci(1)
Calculando fibonacci(0)
Calculando fibonacci(1)
Resultado: 5

--- CON MEMOIZATION ---
Calculando fibonacci(5)
Calculando fibonacci(4)
Calculando fibonacci(3)
Calculando fibonacci(2)
Calculando fibonacci(1)
Calculando fibonacci(0)
Retornando fibonacci(1) del caché
Retornando fibonacci(2) del caché
Retornando fibonacci(3) del caché
Resultado: 5

Segunda llamada (del caché):
Retornando fibonacci(5) del caché
Resultado: 5
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá una función memoizada que calcule factoriales:
1. Función `crearFactorialMemoizado()` que retorna función memoizada
2. La función debe cachear resultados previos
3. Mostrar cuándo calcula vs cuándo usa caché
4. Probá llamarla varias veces con mismos/diferentes valores

**PLANTILLA:**
```javascript
function crearFactorialMemoizado() {
    // 1. Crear caché privado
    // TU CÓDIGO AQUÍ
    
    return function factorial(n) {
        // 2. Si está en caché, retornar
        // TU CÓDIGO AQUÍ
        
        // 3. Mostrar que se está calculando
        console.log("Calculando factorial(" + n + ")");
        
        // 4. Caso base
        if (n <= 1) {
            // TU CÓDIGO AQUÍ (guardar en caché y retornar)
        }
        
        // 5. Caso recursivo
        // Calcular factorial(n-1) * n
        // Guardar en caché
        // Retornar
        // TU CÓDIGO AQUÍ
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
```

**RESULTADO ESPERADO:**
```
Calculando factorial(5)
Calculando factorial(4)
Calculando factorial(3)
Calculando factorial(2)
Calculando factorial(1)
Resultado: 120

Segunda llamada (debe usar caché):
Retornando factorial(5) del caché
Resultado: 120

Tercera llamada con valor más grande:
Calculando factorial(6)
Retornando factorial(5) del caché
Resultado: 720
```

---

#### 💡 HINTS (solo si te trabás >20 min):

**Hint 1:** Estructura del caché: `if (n in cache) { console.log("Retornando..."); return cache[n]; }`

**Hint 2:** Caso base: `cache[n] = 1; return 1;`

**Hint 3:** Caso recursivo: `cache[n] = factorial(n - 1) * n; return cache[n];`

---

**🎯 CONTEXTO DE USO REAL (Ejercicio 6):**

Memoization se usa en:
- **React:** `useMemo()` para cachear cálculos costosos
- **React:** `React.memo()` para cachear componentes
- **Vue:** `computed` properties tienen memoization automático
- **Lodash:** `_.memoize()` hace cualquier función memoizable
- **GraphQL:** DataLoader cachea queries a la DB

---

---

### Ejercicio 7: Decorators con Closures

⏱️ **TIEMPO LÍMITE:** 40 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Decorators con Closures
// ============================================

// 1. FUNCIÓN ORIGINAL (sin decorar)
function saludar(nombre) {
    return "Hola, " + nombre + "!";
}

console.log(saludar("Juan"));  // Hola, Juan!

// 2. DECORATOR QUE AGREGA LOGS
function decorarConLog(fn) {
    // Retornamos una NUEVA función que "envuelve" la original
    return function(...args) {
        console.log("[LOG] Llamando función con argumentos:", args);
        
        // Ejecutar función original
        const resultado = fn(...args);
        
        console.log("[LOG] Resultado:", resultado);
        return resultado;
    };
}

const saludarConLog = decorarConLog(saludar);
console.log("\n--- CON DECORATOR LOG ---");
console.log(saludarConLog("María"));

// 3. DECORATOR QUE MIDE TIEMPO
function decorarConTiempo(fn) {
    return function(...args) {
        console.log("[TIMER] Iniciando medición...");
        const inicio = Date.now();
        
        const resultado = fn(...args);
        
        const fin = Date.now();
        console.log("[TIMER] Tiempo: " + (fin - inicio) + "ms");
        
        return resultado;
    };
}

function operacionLenta(n) {
    let suma = 0;
    for (let i = 0; i < n; i++) {
        suma += i;
    }
    return suma;
}

const operacionConTiempo = decorarConTiempo(operacionLenta);
console.log("\n--- CON DECORATOR TIEMPO ---");
console.log("Resultado:", operacionConTiempo(10000000));

// 4. COMBINAR MÚLTIPLES DECORATORS
const saludarDecorado = decorarConTiempo(decorarConLog(saludar));
console.log("\n--- CON MÚLTIPLES DECORATORS ---");
console.log(saludarDecorado("Pedro"));

// 5. DECORATOR QUE CACHEA (memoization decorator)
function decorarConCache(fn) {
    const cache = {};
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (key in cache) {
            console.log("[CACHE] Retornando del caché");
            return cache[key];
        }
        
        console.log("[CACHE] Calculando...");
        const resultado = fn(...args);
        cache[key] = resultado;
        return resultado;
    };
}

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Decorar fibonacci con caché
const fibConCache = decorarConCache(fibonacci);

console.log("\n--- CON DECORATOR CACHE ---");
console.log("Primera llamada:", fibConCache(10));
console.log("Segunda llamada:", fibConCache(10));
console.log("Tercera llamada:", fibConCache(15));

// 6. DECORATOR QUE VALIDA ARGUMENTOS
function decorarConValidacion(fn, validador) {
    return function(...args) {
        // Ejecutar función validadora
        const esValido = validador(...args);
        
        if (!esValido) {
            console.log("[VALIDACIÓN] Argumentos inválidos");
            return null;
        }
        
        console.log("[VALIDACIÓN] Argumentos válidos");
        return fn(...args);
    };
}

function dividir(a, b) {
    return a / b;
}

function validarDivision(a, b) {
    return b !== 0;  // No dividir por 0
}

const dividirSeguro = decorarConValidacion(dividir, validarDivision);

console.log("\n--- CON DECORATOR VALIDACIÓN ---");
console.log("10 / 2 =", dividirSeguro(10, 2));
console.log("10 / 0 =", dividirSeguro(10, 0));

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// DECORATOR PATTERN:
// - Tomar una función
// - "Envolverla" en otra función que agrega funcionalidad extra
// - Retornar la función envuelta
// - La función original NO se modifica
//
// Usos del Closure:
// - La función decoradora "cierra sobre" la función original
// - Puede agregar variables privadas (como caché)
// - Mantiene referencia a la función original
//
// Ventajas:
// - Agregar funcionalidad sin modificar código original
// - Reutilizar decorators en múltiples funciones
// - Composición (combinar múltiples decorators)
// - Separation of Concerns (logs, timing, validación separados)

// ============================================
// CONTEXTO DE USO REAL
// ============================================
// Decorators se usan en:
// - Python: @decorator syntax
// - TypeScript/JavaScript: @decorator (experimental)
// - Express: Middleware es un tipo de decorator
// - React: HOCs (Higher Order Components) son decorators
// - Redux: connect() es un decorator
// - Testing: Spies, mocks, stubs son decorators

// ============================================
// ANALOGÍA
// ============================================
// Un decorator es como REGALO ENVUELTO:
// - El regalo original es la función
// - El papel de regalo es el decorator (agrega algo visual)
// - Puedes envolver el regalo en MÚLTIPLES capas (múltiples decorators)
// - Cada capa agrega algo (moño, tarjeta, etc.)
// - El regalo original sigue siendo el mismo adentro
// - Cuando lo usas, "desenvolves" cada capa automáticamente
```

**Resultado al ejecutar:**
```
Hola, Juan!

--- CON DECORATOR LOG ---
[LOG] Llamando función con argumentos: [ 'María' ]
[LOG] Resultado: Hola, María!
Hola, María!

--- CON DECORATOR TIEMPO ---
[TIMER] Iniciando medición...
[TIMER] Tiempo: 2ms
Resultado: 49999995000000

--- CON MÚLTIPLES DECORATORS ---
[TIMER] Iniciando medición...
[LOG] Llamando función con argumentos: [ 'Pedro' ]
[LOG] Resultado: Hola, Pedro!
[TIMER] Tiempo: 0ms
Hola, Pedro!

--- CON DECORATOR CACHE ---
[CACHE] Calculando...
Primera llamada: 55
[CACHE] Retornando del caché
Segunda llamada: 55
[CACHE] Calculando...
Tercera llamada: 610

--- CON DECORATOR VALIDACIÓN ---
[VALIDACIÓN] Argumentos válidos
10 / 2 = 5
[VALIDACIÓN] Argumentos inválidos
10 / 0 = null
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá decorators útiles:
1. `decorarConContador(fn)` - cuenta cuántas veces se llamó la función
2. `decorarConLimite(fn, max)` - permite máximo N llamadas, después retorna null
3. Función original que decorar
4. Probá ambos decorators (individual y combinados)

**PLANTILLA:**
```javascript
// 1. Decorator que cuenta llamadas
function decorarConContador(fn) {
    // Variable privada para contar
    let contador = 0;
    
    return function(...args) {
        // Incrementar contador
        // Mostrar cantidad de llamadas
        // Ejecutar función original
        // TU CÓDIGO AQUÍ
    };
}

// 2. Decorator que limita llamadas
function decorarConLimite(fn, max) {
    // Variable privada para contar
    let llamadas = 0;
    
    return function(...args) {
        // Verificar si se alcanzó el límite
        // Si sí: retornar null y mostrar mensaje
        // Si no: incrementar contador y ejecutar función
        // TU CÓDIGO AQUÍ
    };
}

// 3. Función original
function procesarDatos(datos) {
    console.log("Procesando:", datos);
    return datos.toUpperCase();
}

// 4. Decorar función
const procesarConContador = decorarConContador(procesarDatos);
const procesarConLimite = decorarConLimite(procesarDatos, 3);
const procesarAmbos = decorarConLimite(decorarConContador(procesarDatos), 3);

// Probar con contador
console.log("--- CON CONTADOR ---");
procesarConContador("hola");
procesarConContador("mundo");
procesarConContador("test");

// Probar con límite
console.log("\n--- CON LÍMITE (max 3) ---");
procesarConLimite("call1");
procesarConLimite("call2");
procesarConLimite("call3");
procesarConLimite("call4");  // Esta no debería ejecutarse

// Probar con ambos
console.log("\n--- CON AMBOS ---");
procesarAmbos("test1");
procesarAmbos("test2");
procesarAmbos("test3");
procesarAmbos("test4");  // Esta no debería ejecutarse
```

**RESULTADO ESPERADO:**
```
--- CON CONTADOR ---
[CONTADOR] Llamada #1
Procesando: hola
[CONTADOR] Llamada #2
Procesando: mundo
[CONTADOR] Llamada #3
Procesando: test

--- CON LÍMITE (max 3) ---
Procesando: call1
Procesando: call2
Procesando: call3
[LÍMITE] Máximo de llamadas alcanzado (3)

--- CON AMBOS ---
[CONTADOR] Llamada #1
Procesando: test1
[CONTADOR] Llamada #2
Procesando: test2
[CONTADOR] Llamada #3
Procesando: test3
[LÍMITE] Máximo de llamadas alcanzado (3)
```

---

#### 💡 HINTS (solo si te trabás >20 min):

**Hint 1:** En `decorarConContador`: `contador++; console.log("[CONTADOR] Llamada #" + contador); return fn(...args);`

**Hint 2:** En `decorarConLimite`: `if (llamadas >= max) { console.log("[LÍMITE] ..."); return null; } llamadas++; return fn(...args);`

**Hint 3:** Para combinar decorators, "envolvés" uno en otro: `decorarConLimite(decorarConContador(fn), 3)`

---

**🎯 CONTEXTO DE USO REAL (Ejercicio 7):**

Decorators se usan en:
- **Express.js:** Middleware functions son decorators de routes
- **React:** Higher Order Components (HOCs) como `withRouter`, `connect`
- **Python:** `@decorator` syntax en funciones
- **TypeScript:** `@Injectable`, `@Component` en Angular
- **Testing:** Spies (`sinon.spy()`), mocks (`jest.fn()`)
- **AOP:** Aspect-Oriented Programming para logging, timing, etc.

---

---

## 🎯 CHECKLIST DE PROGRESO

Marcá cada ejercicio cuando lo completes:

- [ ] Ejercicio 1: Closure Básico
- [ ] Ejercicio 2: Contador Privado
- [ ] Ejercicio 3: Factory Functions
- [ ] Ejercicio 4: Loop y Closures (problema clásico)
- [ ] Ejercicio 5: Partial Application
- [ ] Ejercicio 6: Memoization Básica
- [ ] Ejercicio 7: Decorators con Closures

---

## 🎊 AL COMPLETAR TODOS LOS EJERCICIOS

**¡Felicitaciones!** Completaste la Serie de Ejercicios Fase 2.

**Has dominado:**
- ✅ Closures básicos (función retornando función)
- ✅ Datos privados con closures
- ✅ Factory functions para crear objetos
- ✅ Problema clásico de closures en loops (y sus soluciones)
- ✅ Partial application (pre-configurar funciones)
- ✅ Memoization (cachear resultados)
- ✅ Decorators (agregar funcionalidad sin modificar código)

**Próximo paso:** Proyecto Integrador 2 - Sistema de Gestión de Tareas con Closures (TODO App)

---

## 📝 NOTAS IMPORTANTES

### ¿Qué hacer si te trabás?
1. Releé el ejemplo resuelto con MÁS atención
2. Dibujá un diagrama del closure en papel
3. Usá console.log() para ver qué variables están vivas
4. Probá casos más simples primero
5. Usá los hints si >20 min
6. Preguntá si >30 min

### Governor recuerda:
- ⏱️ Máximo 30-40 min por ejercicio
- ✅ Si funciona al 80% → NEXT
- ❌ NO iterar buscando perfección
- 🎯 Aprender > código perfecto

### Reconocimiento:
- Estos ejercicios son nivel INTERMEDIO-AVANZADO
- Closures son uno de los conceptos más difíciles de JS
- Muchos devs con años NO dominan closures
- Estás construyendo superpoderes reales

---

**FIN DE LA SERIE DE EJERCICIOS FASE 2**

Versión: 1.0  
Fecha: Diciembre 2025  
Ejercicios: 7  
Duración estimada: 8-10 horas
