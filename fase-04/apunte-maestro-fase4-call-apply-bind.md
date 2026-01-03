# 📘 APUNTE MAESTRO - FASE 4: CALL, APPLY, BIND

**Versión:** 1.0  
**Propósito:** Guía completa y autocontenida para dominar call(), apply() y bind()  
**Para:** Mi yo del pasado (y cualquiera que quiera dominar estos conceptos)

---

## 📑 ÍNDICE

1. [¿Qué problema resuelven?](#1-qué-problema-resuelven)
2. [call() - Ejecutar con "this" específico](#2-call---ejecutar-con-this-específico)
3. [apply() - Como call pero con array](#3-apply---como-call-pero-con-array)
4. [bind() - Crear función con "this" fijado](#4-bind---crear-función-con-this-fijado)
5. [Method Borrowing](#5-method-borrowing)
6. [Partial Application (Currying)](#6-partial-application-currying)
7. [Decorators](#7-decorators)
8. [arguments (objeto especial)](#8-arguments-objeto-especial)
9. [Legacy vs Moderno](#9-legacy-vs-moderno)
10. [Tabla comparativa final](#10-tabla-comparativa-final)
11. [Casos de uso reales](#11-casos-de-uso-reales)

---

## 1. ¿QUÉ PROBLEMA RESUELVEN?

### **El problema:**

```javascript
const persona = {
    nombre: "Juan",
    saludar: function() {
        console.log("Hola, soy", this.nombre);
    }
};

const saludar = persona.saludar;
saludar();  
// Resultado: "Hola, soy undefined"
// ¿Por qué? "this" = window (no hay objeto antes del punto)
```

**call, apply y bind te permiten CONTROLAR manualmente qué es "this".**

---

### **Las 3 herramientas:**

| Método | Qué hace | Cuándo se ejecuta |
|--------|----------|-------------------|
| **call()** | Ejecuta función CON "this" específico | INMEDIATAMENTE |
| **apply()** | Como call, pero argumentos en array | INMEDIATAMENTE |
| **bind()** | Crea NUEVA función con "this" fijado | DESPUÉS (cuando la llames) |

---

### **Analogía simple:**

**call/apply:** "Llamá a esta persona por teléfono AHORA y decile que haga algo"
- Ejecuta INMEDIATAMENTE

**bind:** "Dale a esta persona una tarjeta de identidad permanente"
- Crea nueva función para usar DESPUÉS

---

## 2. call() - Ejecutar con "this" específico

### **Sintaxis:**

```javascript
funcion.call(objetoParaThis, arg1, arg2, arg3, ...)
//           ↑               ↑
//         "this"       argumentos separados
```

---

### **Ejemplo básico:**

```javascript
// ============================================
// OBJETOS
// ============================================

const auto1 = {
    marca: "Toyota",
    modelo: "Corolla"
};

const auto2 = {
    marca: "Ford",
    modelo: "Mustang"
};

// ============================================
// FUNCIÓN (NO está en ningún objeto)
// ============================================

function describirAuto() {
    console.log(`Auto: ${this.marca} ${this.modelo}`);
}

// ============================================
// SIN call()
// ============================================

describirAuto();
// Resultado: "Auto: undefined undefined"
// "this" = window (no hay objeto antes del punto)

// ============================================
// CON call()
// ============================================

describirAuto.call(auto1);
// Resultado: "Auto: Toyota Corolla"
// call() dice: "ejecutá describirAuto con this = auto1"

describirAuto.call(auto2);
// Resultado: "Auto: Ford Mustang"
// call() dice: "ejecutá describirAuto con this = auto2"
```

---

### **call() con argumentos:**

```javascript
function describirAutoCompleto(color, precio) {
    console.log(`Auto: ${this.marca} ${this.modelo}`);
    console.log(`Color: ${color}`);
    console.log(`Precio: $${precio}`);
}

describirAutoCompleto.call(auto1, "Rojo", 15000);
// Resultado:
// Auto: Toyota Corolla
// Color: Rojo
// Precio: $15000

// Sintaxis: funcion.call(this, arg1, arg2, arg3)
//                         ↑     ↑    ↑    ↑
//                       "this"  argumentos separados por comas
```

---

### **¿Cómo funciona call()?**

```
funcion.call(objeto, arg1, arg2)
           ↓
1. Toma la función
2. Le dice: "tu 'this' es este objeto"
3. La EJECUTA INMEDIATAMENTE
4. Pasa los argumentos
5. Termina (no crea nada nuevo)
```

---

### **⚠️ IMPORTANTE: call() NO modifica nada**

```javascript
const persona = {
    nombre: "Ana",
    saludar: function() {
        console.log(`Hola, soy ${this.nombre}`);
    }
};

const otroObjeto = { nombre: "Pedro" };

// Usar call 1000 veces
for (let i = 0; i < 1000; i++) {
    persona.saludar.call(otroObjeto);
}

// ¿Se modificó algo?
persona.saludar();  // "Hola, soy Ana" ✅
// El método original NO cambió

otroObjeto.saludar();  // ❌ Error: otroObjeto.saludar is not a function
// otroObjeto NO ganó el método

// ✅ call() solo EJECUTA, no modifica nada
```

---

### **Cuándo usar call():**

1. **Ejecutar función inmediatamente con "this" específico**
2. **Method borrowing** (usar método de un objeto en otro)
3. **Invocar constructores padre** (herencia)

---

## 3. apply() - Como call pero con array

### **Sintaxis:**

```javascript
funcion.apply(objetoParaThis, [arg1, arg2, arg3, ...])
//            ↑                ↑
//          "this"        argumentos en ARRAY
```

---

### **Diferencia con call():**

```javascript
function sumar(a, b, c, d) {
    console.log(`${a} + ${b} + ${c} + ${d} = ${a + b + c + d}`);
    return a + b + c + d;
}

const calculadora = {
    marca: "Casio"
};

// ============================================
// CON call() - argumentos SEPARADOS
// ============================================

sumar.call(calculadora, 10, 20, 30, 40);
// Sintaxis: funcion.call(this, arg1, arg2, arg3, arg4)
//                              ↑    ↑    ↑    ↑
//                         Separados por comas

// ============================================
// CON apply() - argumentos en ARRAY
// ============================================

const numeros = [10, 20, 30, 40];
sumar.apply(calculadora, numeros);
// Sintaxis: funcion.apply(this, [arg1, arg2, arg3, arg4])
//                               ↑
//                          Array de argumentos

// ✅ Ambos dan el mismo resultado
```

---

### **¿Cuándo usar apply()?**

**Cuando ya tenés los argumentos en un array:**

```javascript
const valores = [5, 15, 25, 35];

// ❌ Con call tendrías que hacer:
sumar.call(calculadora, valores[0], valores[1], valores[2], valores[3]);
// Tedioso y poco práctico

// ✅ Con apply:
sumar.apply(calculadora, valores);
// Limpio y directo
```

---

### **Caso de uso clásico: Math.max con array**

```javascript
const numeros = [100, 50, 200, 75, 150];

// ============================================
// PROBLEMA: Math.max espera argumentos separados
// ============================================

console.log(Math.max(numeros));  
// Resultado: NaN
// Le pasaste un ARRAY, no números

// ============================================
// SOLUCIÓN: apply() convierte array en argumentos separados
// ============================================

const maximo = Math.max.apply(null, numeros);
//                            ↑
//                      null porque Math.max no usa "this"
console.log(maximo);  // 200 ✅

// apply() hace internamente:
// Math.max(100, 50, 200, 75, 150)
```

---

### **Diferencia clave:**

```javascript
// CALL:  funcion.call(this, arg1, arg2, arg3)
//                           ↑    ↑    ↑
//                       argumentos SEPARADOS

// APPLY: funcion.apply(this, [arg1, arg2, arg3])
//                             ↑
//                        argumentos en ARRAY
```

---

### **⚠️ IMPORTANTE: apply() tampoco modifica nada**

```javascript
// apply() SOLO ejecuta la función
// NO modifica la función original
// NO modifica el prototipo
// NO crea nada permanente

Math.max.apply(null, [1, 2, 3]);  // Ejecuta y termina

// Math.max sigue siendo la misma función
Math.max(5, 10);  // Funciona normal ✅
```

---

## 4. bind() - Crear función con "this" fijado

### **Sintaxis:**

```javascript
const nuevaFuncion = funcion.bind(objetoParaThis, arg1, arg2, ...)
//    ↑                                ↑           ↑
//  nueva función              "this" fijado   args opcionales (partial)
```

---

### **Diferencia CLAVE con call/apply:**

```javascript
const persona = {
    nombre: "Ana",
    saludar: function() {
        console.log(`Hola, soy ${this.nombre}`);
    }
};

const otroObjeto = { nombre: "Pedro" };

// ============================================
// call() - Ejecuta INMEDIATAMENTE
// ============================================

persona.saludar.call(otroObjeto);  
// Se ejecuta AHORA
// Resultado: "Hola, soy Pedro"

// ============================================
// bind() - Crea nueva función (NO ejecuta)
// ============================================

const saludarPedro = persona.saludar.bind(otroObjeto);
// NO se ejecuta
// Solo crea una NUEVA función

// Ejecutar cuando quieras:
saludarPedro();  // "Hola, soy Pedro"
saludarPedro();  // "Hola, soy Pedro" (otra vez)
saludarPedro();  // "Hola, soy Pedro" (otra vez)

// ✅ Podés reutilizarla múltiples veces
```

---

### **¿Qué hace bind() por dentro?**

```javascript
// bind() crea una NUEVA función así:

const saludarPedro = persona.saludar.bind(otroObjeto);

// Es equivalente a:
const saludarPedro = function() {
    return persona.saludar.call(otroObjeto);
    //                           ↑
    //                    "this" fijado permanentemente
};
```

---

### **bind() NO modifica NADA:**

```javascript
const original = persona.saludar;
const bound = persona.saludar.bind(otroObjeto);

// ¿Se modificó la función original?
persona.saludar();  // "Hola, soy Ana" ✅
// NO, sigue igual

// ¿Se modificó el prototipo?
console.log(persona.saludar === original);  // true ✅
// NO, es la misma función

// ¿Qué es bound entonces?
console.log(bound === persona.saludar);  // false ✅
// Es una función NUEVA, independiente
```

---

### **¿bind() crea arrow functions?**

**NO.** bind() crea funciones REGULARES anónimas.

```javascript
const descuento10 = aplicarDescuento.bind(null, 10);

// ¿Qué ES descuento10?
console.log(typeof descuento10);  // "function"
console.log(descuento10.toString());  
// "function () { [native code] }"
//  ↑
// Función REGULAR (no arrow)

// Prueba: ¿Tiene prototype?
console.log(descuento10.hasOwnProperty('prototype'));  
// true ✅
// Las arrow NO tienen prototype, esta SÍ

// ✅ Es función regular, no arrow
```

**El IDE la muestra como "lambda" solo porque es anónima guardada en const, pero internamente es función regular.**

---

### **Uso típico: Event listeners**

```javascript
const boton = {
    texto: "Click me",
    clicks: 0,
    
    handleClick: function() {
        this.clicks++;
        console.log(`Clicks: ${this.clicks}`);
    }
};

// ============================================
// PROBLEMA: Pasar método directamente
// ============================================

// En HTML real:
// button.addEventListener('click', boton.handleClick);
// ❌ Pierde "this" (this = button element, no boton)

// ============================================
// SOLUCIÓN: bind()
// ============================================

// button.addEventListener('click', boton.handleClick.bind(boton));
// ✅ "this" siempre será boton

// Simulación:
const handleClickBound = boton.handleClick.bind(boton);
handleClickBound();  // Clicks: 1
handleClickBound();  // Clicks: 2
handleClickBound();  // Clicks: 3
```

---

### **⚠️ CONFUSIÓN COMÚN: call() vs bind()**

```javascript
// ❌ INCORRECTO: Pensar que necesitas call() cada vez

function procesar() {
    Array.prototype.reduce.call(arguments, (a, b) => a + b);
    Array.prototype.reduce.call(arguments, (a, b) => a + b);
    Array.prototype.reduce.call(arguments, (a, b) => a + b);
    // Repetitivo ↑
}

// ✅ CORRECTO: Usar bind() para crear función reutilizable

const reduceArguments = Array.prototype.reduce.bind(Array.prototype);
// Aunque en este caso no es tan útil porque "this" cambia (es arguments)

// Mejor ejemplo con bind():
const logError = console.log.bind(console, "[ERROR]");
logError("Falló la BD");      // [ERROR] Falló la BD
logError("Falló la API");     // [ERROR] Falló la API
logError("Falló el servidor"); // [ERROR] Falló el servidor
// ✅ Reutilizable, no repetir call() cada vez
```

---

### **Cuándo usar cada uno:**

```javascript
// call()  → Ejecutar YA con "this" específico
funcion.call(objeto, args);

// apply() → Ejecutar YA con array de argumentos
funcion.apply(objeto, [args]);

// bind()  → Crear función reutilizable
const nueva = funcion.bind(objeto);
nueva();  // Llamar cuando quieras
nueva();  // Y otra vez
nueva();  // Y otra vez
```

---

## 5. Method Borrowing

### **¿Qué es?**

**Usar método de UN objeto en OTRO objeto.**

```javascript
objeto1.metodo.call(objeto2)
       ↑            ↑
   método aquí   "this" será este
```

---

### **Ejemplo básico:**

```javascript
// ============================================
// OBJETOS
// ============================================

const persona1 = {
    nombre: "Carlos",
    apellido: "Gómez",
    
    nombreCompleto: function() {
        return `${this.nombre} ${this.apellido}`;
    }
};

const persona2 = {
    nombre: "María",
    apellido: "López"
    // NO tiene método nombreCompleto
};

// ============================================
// PROBLEMA: persona2 no tiene nombreCompleto
// ============================================

console.log(persona1.nombreCompleto());  // "Carlos Gómez" ✅
// console.log(persona2.nombreCompleto());  // ❌ Error

// ============================================
// SOLUCIÓN: "Prestar" el método con call()
// ============================================

const resultado = persona1.nombreCompleto.call(persona2);
//                         ↑                    ↑
//                   método de persona1    "this" = persona2

console.log(resultado);  // "María López" ✅

// ¿Qué pasó?
// 1. Tomamos el método de persona1
// 2. Lo ejecutamos con "this" = persona2
// 3. El método accede a this.nombre y this.apellido de persona2
```

---

### **Caso clásico: Array methods en array-like**

```javascript
// ============================================
// PROBLEMA: arguments no es array
// ============================================

function sumarTodos() {
    console.log("arguments:", arguments);
    console.log("¿Es array?", Array.isArray(arguments));  // false
    
    // ❌ arguments NO tiene método reduce
    // const suma = arguments.reduce((a, b) => a + b);  // Error
    
    // ✅ SOLUCIÓN: Prestar reduce de Array
    const suma = Array.prototype.reduce.call(arguments, (a, b) => a + b);
    //           ↑                            ↑
    //      método de Array            "this" = arguments
    
    console.log("Suma:", suma);
    return suma;
}

sumarTodos(10, 20, 30, 40);  
// Resultado: Suma: 100 ✅
```

---

### **¿Cómo funciona internamente?**

```javascript
Array.prototype.reduce.call(arguments, (a, b) => a + b)
//    ↑                      ↑
//  método                "this"

// Es como si hicieras:
arguments.reduce((a, b) => a + b)  // (si tuviera el método)

// reduce internamente hace:
function reduce(callback) {
    let result = this[0];  // ← "this" = arguments
    for (let i = 1; i < this.length; i++) {
        result = callback(result, this[i]);
    }
    return result;
}
```

---

### **Convertir array-like a array:**

```javascript
// ============================================
// FORMA LEGACY (pre-ES6)
// ============================================

const arrayReal = Array.prototype.slice.call(arguments);
//                ↑                          ↑
//           método slice             "this" = arguments

// slice sin argumentos copia todo el array
// arguments → [0, 1, 2, ...] → array real ✅

// ============================================
// FORMA MODERNA (ES6+)
// ============================================

// Opción 1: Array.from()
const arrayReal = Array.from(arguments);

// Opción 2: Spread operator
const arrayReal = [...arguments];

// ✅ Más legibles, mismo resultado
```

---

### **⚠️ IMPORTANTE: Es LEGACY**

```javascript
// ❌ LEGACY (código viejo)
Array.prototype.slice.call(arrayLike)

// ✅ MODERNO (código nuevo)
Array.from(arrayLike)
[...arrayLike]
```

**¿Por qué está en los ejercicios?**
- Para entender method borrowing (concepto importante)
- Para leer código legacy
- Para entender cómo funcionan las cosas internamente

**¿Deberías usarlo en código nuevo?**
- NO. Usá `Array.from()` o spread `[...]`

---

## 6. Partial Application (Currying)

### **¿Qué es?**

**Crear funciones especializadas pre-configurando algunos argumentos.**

```javascript
funcion.bind(null, arg1, arg2)
//           ↑     ↑
//        no usa   argumentos PRE-FIJADOS
//        "this"
```

---

### **Ejemplo básico:**

```javascript
// ============================================
// FUNCIÓN ORIGINAL
// ============================================

function sumar(a, b, c) {
    return a + b + c;
}

// Uso normal:
console.log(sumar(10, 20, 30));  // 60

// ============================================
// CON bind() - Pre-fijar primer argumento
// ============================================

const sumar10 = sumar.bind(null, 10);
//                          ↑    ↑
//                       no usa  primer argumento FIJO
//                       "this"

// ¿Qué ES sumar10?
// Es una nueva función que espera solo 2 argumentos (b y c)
// porque "a" ya está fijado en 10

console.log(sumar10(20, 30));  // 60
//                   ↑   ↑
//                   b   c  (a = 10 ya está fijado)

console.log(sumar10(5, 15));   // 30  (10 + 5 + 15)
console.log(sumar10(100, 200)); // 310 (10 + 100 + 200)

// ✅ Función reutilizable con primer argumento pre-fijado
```

---

### **¿Cómo funciona bind() con partial application?**

**bind() crea una nueva función que "recuerda" los argumentos usando CLOSURES:**

```javascript
// ============================================
// LO QUE bind() HACE INTERNAMENTE
// ============================================

Function.prototype.miBind = function(contexto, ...argsFijos) {
    const funcionOriginal = this;  // La función sobre la que llamaste bind
    
    // Retornar NUEVA función
    return function(...argsNuevos) {
        // ✅ Combinar argumentos fijos + nuevos
        const todosLosArgs = [...argsFijos, ...argsNuevos];
        
        // Ejecutar función original con todos los argumentos
        return funcionOriginal.apply(contexto, todosLosArgs);
    };
};

// ============================================
// EJEMPLO
// ============================================

function sumar(a, b, c) {
    console.log(`${a} + ${b} + ${c} = ${a + b + c}`);
    return a + b + c;
}

const sumar10 = sumar.miBind(null, 10);

// ¿Qué pasa cuando llamas sumar10(20, 30)?
// 1. argsFijos = [10]  (guardado en closure)
// 2. argsNuevos = [20, 30]  (cuando llamas)
// 3. todosLosArgs = [10, 20, 30]  (combinados)
// 4. funcionOriginal.apply(null, [10, 20, 30])
// 5. sumar(10, 20, 30) se ejecuta
// Resultado: 60 ✅
```

---

### **¿Cómo "recuerda" bind() los argumentos fijos?**

**¡CLOSURES!**

```javascript
function miBind(contexto, ...argsFijos) {
    const funcionOriginal = this;
    
    // Nueva función que tiene CLOSURE sobre:
    // - funcionOriginal
    // - argsFijos
    // - contexto
    
    return function(...argsNuevos) {
        // ✅ Puede acceder a argsFijos (closure)
        const todos = [...argsFijos, ...argsNuevos];
        
        // ✅ Puede acceder a funcionOriginal (closure)
        return funcionOriginal.apply(contexto, todos);
    };
}

// La función retornada "recuerda" argsFijos
// Cada vez que la llamás, usa esos argumentos fijos
```

---

### **Ejemplo práctico: Logging especializado**

```javascript
function log(nivel, mensaje) {
    console.log(`[${nivel}] ${mensaje}`);
}

// ============================================
// SIN bind() - Repetitivo
// ============================================

log("ERROR", "Falló la BD");
log("ERROR", "Falló la API");
log("ERROR", "Falló el servidor");
// ↑ Repetir "ERROR" cada vez

// ============================================
// CON bind() - Crear funciones especializadas
// ============================================

const logError = log.bind(null, "ERROR");
const logInfo = log.bind(null, "INFO");
const logWarning = log.bind(null, "WARNING");

// Usar las funciones especializadas
logError("Falló la BD");        // [ERROR] Falló la BD
logInfo("Servidor iniciado");   // [INFO] Servidor iniciado
logWarning("Memoria al 80%");   // [WARNING] Memoria al 80%

// ✅ Más limpio, no repetir el nivel cada vez
```

---

### **Fijar múltiples argumentos:**

```javascript
function crearMensaje(tipo, usuario, mensaje) {
    return `[${tipo}] ${usuario}: ${mensaje}`;
}

// ============================================
// Fijar 1 argumento
// ============================================

const logError = crearMensaje.bind(null, "ERROR");
console.log(logError("Admin", "Falló la conexión"));
// [ERROR] Admin: Falló la conexión

// ============================================
// Fijar 2 argumentos
// ============================================

const logErrorAdmin = crearMensaje.bind(null, "ERROR", "Admin");
console.log(logErrorAdmin("Falló la conexión"));
// [ERROR] Admin: Falló la conexión

// ============================================
// Fijar 3 argumentos (todos)
// ============================================

const mensajeFijo = crearMensaje.bind(null, "INFO", "Sistema", "Servidor iniciado");
console.log(mensajeFijo());
// [INFO] Sistema: Servidor iniciado
```

---

### **⚠️ CONFUSIÓN RESUELTA: bind() innecesario**

```javascript
// ❌ INNECESARIO: bind() dentro de función
function retryDecorator(funcion, maxIntentos = 3) {
  return function (...args) {
    const fn = funcion.bind(null, ...args);  // ← Paso extra innecesario
    
    while(maxIntentos > 0) {
      try {
        return fn();  // Ejecutar
      } catch (error) {
        maxIntentos--;
      }
    }
  };
}

// ¿Por qué es innecesario?
// Estás creando fn solo para usarla UNA vez
// Es más simple ejecutar directamente

// ✅ MEJOR: Ejecutar directamente
function retryDecorator(funcion, maxIntentos = 3) {
  return function (...args) {
    while(maxIntentos > 0) {
      try {
        return funcion.apply(this, args);  // Directo
      } catch (error) {
        maxIntentos--;
      }
    }
  };
}
```

**bind() es útil cuando querés REUTILIZAR la función bound, no cuando la usás una sola vez.**

---

## 7. Decorators

### **¿Qué es un decorator?**

**Función que toma función y retorna versión mejorada.**

```javascript
function decorator(funcion) {
    return function(...args) {
        // ANTES de ejecutar
        console.log("Antes");
        
        const resultado = funcion.apply(this, args);
        
        // DESPUÉS de ejecutar
        console.log("Después");
        
        return resultado;
    };
}
```

---

### **Ejemplo: Logging decorator**

```javascript
// ============================================
// FUNCIÓN ORIGINAL
// ============================================

function saludar(nombre) {
    console.log(`Hola, ${nombre}!`);
    return `Saludo enviado a ${nombre}`;
}

// ============================================
// DECORATOR
// ============================================

function loggingDecorator(funcion) {
    // Retornar nueva función que envuelve la original
    return function(...args) {
        console.log(`[LOG] Llamando función con:`, args);
        
        // Llamar función original con "this" y args correctos
        const resultado = funcion.apply(this, args);
        
        console.log(`[LOG] Función terminó. Resultado:`, resultado);
        return resultado;
    };
}

// ============================================
// DECORAR LA FUNCIÓN
// ============================================

const saludarConLog = loggingDecorator(saludar);

// ============================================
// USAR LA FUNCIÓN DECORADA
// ============================================

saludarConLog("Ana");

// Resultado:
// [LOG] Llamando función con: ["Ana"]
// Hola, Ana!
// [LOG] Función terminó. Resultado: Saludo enviado a Ana
```

---

### **¿Cómo funciona?**

```javascript
// Esto:
const decorada = decorator(original);

// Es equivalente a:
const decorada = function(...args) {
    // Código antes
    const resultado = original.apply(this, args);
    // Código después
    return resultado;
};
```

---

### **Decorator de validación:**

```javascript
function validacionDecorator(funcion) {
    return function(nombre, precio, cantidad) {
        // ✅ VALIDAR ANTES de ejecutar
        if (precio <= 0) {
            throw new Error("Precio debe ser mayor a 0");
        }
        if (cantidad <= 0) {
            throw new Error("Cantidad debe ser mayor a 0");
        }
        
        console.log(`[VALIDACIÓN] OK - precio: ${precio}, cantidad: ${cantidad}`);
        
        // ✅ Si pasa validación, ejecutar función original
        return funcion.apply(this, [nombre, precio, cantidad]);
    };
}

// Usar
function agregarProducto(nombre, precio, cantidad) {
    console.log(`Agregando: ${nombre} - $${precio} x${cantidad}`);
    return { nombre, precio, cantidad };
}

const agregarValidado = validacionDecorator(agregarProducto);

// Probar
agregarValidado("Laptop", 1200, 1);
// [VALIDACIÓN] OK - precio: 1200, cantidad: 1
// Agregando: Laptop - $1200 x1

agregarValidado("Mouse", -50, 1);
// ❌ Error: Precio debe ser mayor a 0
```

---

### **Combinar decorators:**

```javascript
function timingDecorator(funcion) {
    return function(...args) {
        const inicio = Date.now();
        const resultado = funcion.apply(this, args);
        const duracion = Date.now() - inicio;
        console.log(`[TIMING] Duración: ${duracion}ms`);
        return resultado;
    };
}

// ============================================
// APLICAR MÚLTIPLES DECORATORS
// ============================================

let miFuncion = calcular;
miFuncion = loggingDecorator(miFuncion);
miFuncion = timingDecorator(miFuncion);
miFuncion = validacionDecorator(miFuncion);

// Ahora miFuncion tiene:
// - Logging
// - Timing
// - Validación
// Todo sin modificar la función original
```

---

### **⚠️ IMPORTANTE: Preservar "this"**

```javascript
// ❌ MAL: No preserva "this"
function decorator(funcion) {
    return function(...args) {
        return funcion(...args);  // ❌ "this" se pierde
    };
}

// ✅ BIEN: Preserva "this"
function decorator(funcion) {
    return function(...args) {
        return funcion.apply(this, args);  // ✅ "this" se preserva
    };
}
```

---

### **Casos de uso reales:**

1. **Logging** - Registrar llamadas a funciones
2. **Timing** - Medir performance
3. **Caching** - Memoization
4. **Validación** - Verificar inputs
5. **Retry** - Reintentar en caso de error
6. **Authentication** - Verificar permisos
7. **Rate limiting** - Controlar frecuencia de llamadas

---

## 8. arguments (objeto especial)

### **¿Qué es arguments?**

**Objeto especial que existe AUTOMÁTICAMENTE dentro de toda función regular.**

```javascript
function miFuncion() {
    // ✅ "arguments" existe AUTOMÁTICAMENTE aquí
    console.log(arguments);
}

miFuncion(10, 20, 30);
// arguments: { 0: 10, 1: 20, 2: 30, length: 3 }
```

---

### **NO lo definís vos, JavaScript lo crea:**

```javascript
function mostrarArgumentos() {
    // NO definimos parámetros en la firma
    // PERO "arguments" existe igual
    
    console.log("¿Cuántos argumentos?", arguments.length);
    console.log("arguments:", arguments);
    console.log("Primer argumento:", arguments[0]);
}

mostrarArgumentos("Hola", 42, true);

// Resultado:
// ¿Cuántos argumentos? 3
// arguments: { 0: "Hola", 1: 42, 2: true }
// Primer argumento: Hola
```

---

### **Función CON parámetros vs arguments:**

```javascript
function sumar(a, b) {
    console.log("a:", a);
    console.log("b:", b);
    console.log("arguments:", arguments);
    
    return a + b;
}

sumar(10, 20, 30, 40);

// Resultado:
// a: 10
// b: 20
// arguments: { 0: 10, 1: 20, 2: 30, 3: 40 }
//            ↑
//         Contiene TODOS los argumentos, no solo a y b
```

---

### **Uso práctico: Cantidad variable de argumentos**

```javascript
function sumarTodos() {
    console.log("Argumentos recibidos:", arguments);
    
    let suma = 0;
    for (let i = 0; i < arguments.length; i++) {
        suma += arguments[i];
    }
    
    return suma;
}

console.log(sumarTodos(1, 2, 3));           // 6
console.log(sumarTodos(10, 20, 30, 40));    // 100
console.log(sumarTodos(5));                 // 5
```

---

### **⚠️ IMPORTANTE: arguments NO es array**

```javascript
function demo() {
    console.log("arguments:", arguments);
    console.log("¿Es array?", Array.isArray(arguments));  // false
    
    // ❌ NO tiene métodos de array
    // arguments.map(x => x * 2);  // Error: arguments.map is not a function
    
    // ✅ Pero SÍ tiene:
    console.log("length:", arguments.length);      // ✅ Funciona
    console.log("arguments[0]:", arguments[0]);    // ✅ Funciona
    
    // ✅ Para usar métodos de array, convertir primero:
    const arrayReal = Array.from(arguments);
    const dobles = arrayReal.map(x => x * 2);
    console.log("dobles:", dobles);
}

demo(5, 10, 15);

// Resultado:
// arguments: { 0: 5, 1: 10, 2: 15 }
// ¿Es array? false
// length: 3
// arguments[0]: 5
// dobles: [10, 20, 30]
```

---

### **arguments vs rest parameters**

```javascript
// ============================================
// FORMA ANTIGUA: arguments
// ============================================

function sumarAntigua() {
    console.log("¿Es array?", Array.isArray(arguments));  // false
    
    let suma = 0;
    for (let i = 0; i < arguments.length; i++) {
        suma += arguments[i];
    }
    return suma;
}

// ============================================
// FORMA MODERNA: rest parameters
// ============================================

function sumarModerna(...numeros) {
    console.log("¿Es array?", Array.isArray(numeros));  // true ✅
    
    // Podemos usar métodos de array directamente
    return numeros.reduce((a, b) => a + b, 0);
}

console.log(sumarAntigua(1, 2, 3));   // 6
console.log(sumarModerna(1, 2, 3));   // 6
```

---

### **⚠️ Arrow functions NO tienen arguments**

```javascript
// ❌ CON ARROW FUNCTION
const arrow = () => {
    console.log(arguments);  // ❌ Error o arguments del scope padre
};

arrow(1, 2, 3);  // Error

// ✅ CON REGULAR FUNCTION
function regular() {
    console.log(arguments);  // ✅ Funciona
}

regular(1, 2, 3);  // { 0: 1, 1: 2, 2: 3 }

// ✅ ALTERNATIVA MODERNA: arrow + rest
const arrow2 = (...args) => {
    console.log(args);  // ✅ Funciona (es array real)
};

arrow2(1, 2, 3);  // [1, 2, 3]
```

---

### **Tabla comparativa:**

| Característica | `arguments` | `...rest` |
|----------------|-------------|-----------|
| **Disponible en** | Regular functions | Cualquier función |
| **¿Es array?** | ❌ NO (array-like) | ✅ SÍ (array real) |
| **Métodos de array** | ❌ NO | ✅ SÍ |
| **En arrow functions** | ❌ NO | ✅ SÍ |
| **Uso moderno** | ⚠️ Legacy | ✅ Recomendado |

---

### **¿Por qué está en los ejercicios?**

- Para entender código legacy
- Para usar con apply() (array de argumentos)
- Para comprender cómo funcionaban las cosas antes de ES6

**¿Deberías usarlo hoy?**
- NO. Usá rest parameters (`...args`)

---

## 9. Legacy vs Moderno

### **Convertir array-like a array:**

```javascript
const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 };

// ❌ LEGACY (pre-ES6)
const array1 = Array.prototype.slice.call(arrayLike);

// ✅ MODERNO - Opción 1: Array.from()
const array2 = Array.from(arrayLike);

// ✅ MODERNO - Opción 2: Spread
const array3 = [...arrayLike];

// Todos dan: ['a', 'b', 'c']
```

---

### **Funciones con argumentos variables:**

```javascript
// ❌ LEGACY
function suma() {
    const args = Array.prototype.slice.call(arguments);
    return args.reduce((a, b) => a + b);
}

// ✅ MODERNO
function suma(...args) {
    return args.reduce((a, b) => a + b);
}
```

---

### **Method borrowing:**

```javascript
// ❌ LEGACY
Array.prototype.forEach.call(nodeList, elemento => {
    console.log(elemento);
});

// ✅ MODERNO
[...nodeList].forEach(elemento => {
    console.log(elemento);
});

// O mejor:
Array.from(nodeList).forEach(elemento => {
    console.log(elemento);
});
```

---

### **Partial application:**

```javascript
// ❌ LEGACY (solo bind)
const sumar10 = sumar.bind(null, 10);

// ✅ MODERNO (arrow function más clara)
const sumar10 = (b, c) => sumar(10, b, c);

// Ambos funcionan, pero arrow es más explícito
```

---

### **Tabla: ¿Qué usar hoy?**

| Legacy | Moderno | ¿Usar hoy? |
|--------|---------|------------|
| `Array.prototype.slice.call()` | `Array.from()` / `[...]` | ✅ Moderno |
| `arguments` | `...rest` | ✅ Moderno |
| `funcion.apply(this, args)` | `funcion(...args)` | ✅ Moderno (si no necesitas "this") |
| `funcion.call(this, a, b)` | `funcion.call(this, a, b)` | ✅ Sigue siendo necesario |
| `funcion.bind(this)` | `funcion.bind(this)` | ✅ Sigue siendo necesario |

**call(), apply() y bind() siguen siendo relevantes porque:**
- Controlan "this" explícitamente (no hay alternativa moderna)
- Method borrowing sigue siendo útil
- Decorators y patterns avanzados los usan

---

## 10. Tabla Comparativa Final

### **call() vs apply() vs bind()**

| | **call()** | **apply()** | **bind()** |
|---|---|---|---|
| **¿Ejecuta inmediatamente?** | ✅ SÍ | ✅ SÍ | ❌ NO (crea función) |
| **Argumentos** | Separados | Array | Separados (partial) |
| **Sintaxis** | `f.call(this, a, b)` | `f.apply(this, [a, b])` | `f.bind(this, a)` |
| **Retorna** | Resultado de función | Resultado de función | Nueva función |
| **Reutilizable** | ❌ NO | ❌ NO | ✅ SÍ |
| **Modifica original** | ❌ NO | ❌ NO | ❌ NO |
| **Modifica prototipo** | ❌ NO | ❌ NO | ❌ NO |
| **Cuándo usar** | Ejecutar YA | Ejecutar YA con array | Crear función reutilizable |

---

### **¿Cuándo usar cada uno?**

**call():**
- Ejecutar función inmediatamente con "this" específico
- Method borrowing simple
- Invocar constructores padre

```javascript
funcion.call(objeto, arg1, arg2);
```

---

**apply():**
- Ejecutar función con argumentos en array
- Math.max/min con arrays
- Funciones con argumentos variables que vienen en array

```javascript
funcion.apply(objeto, [arg1, arg2]);
```

---

**bind():**
- Event listeners (preservar "this")
- Crear funciones reutilizables
- Partial application (pre-fijar argumentos)
- Cuando querés usar la función DESPUÉS

```javascript
const nueva = funcion.bind(objeto, arg1);
nueva();  // Llamar cuando quieras
```

---

## 11. Casos de Uso Reales

### **1. React Class Components**

```javascript
class MiComponente extends React.Component {
    constructor(props) {
        super(props);
        
        // ✅ bind() en constructor (una sola vez)
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event) {
        console.log(this.props.nombre);
    }
    
    render() {
        return (
            <button onClick={this.handleClick}>
                Click me
            </button>
        );
    }
}
```

---

### **2. Node.js - Cambiar contexto de "this"**

```javascript
const server = {
    puerto: 3000,
    nombre: "API Server",
    
    iniciar: function() {
        console.log(`Servidor ${this.nombre} en puerto ${this.puerto}`);
    }
};

// Usar el método en otro contexto
const otroServidor = { puerto: 8080, nombre: "Backup Server" };
server.iniciar.call(otroServidor);
// "Servidor Backup Server en puerto 8080"
```

---

### **3. Testing - Spies y Mocks**

```javascript
// Spy en función para testear
const originalLog = console.log;
const logSpy = [];

console.log = function(...args) {
    logSpy.push(args);
    originalLog.apply(console, args);  // ✅ Preservar comportamiento
};

// Ejecutar código
miFuncion();

// Verificar logs
assert(logSpy.length === 3);
assert(logSpy[0][0] === "Mensaje esperado");
```

---

### **4. Functional Programming - Compose/Pipe**

```javascript
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

// Partial application
const add10 = add.bind(null, 10);
const multiplyBy5 = multiply.bind(null, 5);

const result = multiplyBy5(add10(20));  // (20 + 10) * 5 = 150
```

---

### **5. Event Delegation**

```javascript
function delegarEventos(selector, evento, handler) {
    document.addEventListener(evento, function(e) {
        const target = e.target.closest(selector);
        if (target) {
            handler.call(target, e);  // ✅ "this" = elemento clickeado
        }
    });
}

delegarEventos('.btn', 'click', function(e) {
    console.log(this.textContent);  // "this" = botón clickeado
});
```

---

### **6. jQuery-style Plugin**

```javascript
$.fn.miPlugin = function(opciones) {
    return this.each(function() {
        // "this" = elemento DOM actual
        const $elemento = $(this);
        
        // Usar call/apply para pasar contexto
        inicializar.call(this, opciones);
    });
};
```

---

### **7. Decorators en TypeScript/Angular**

```javascript
function LogMethod(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args) {
        console.log(`Llamando ${propertyKey} con:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`${propertyKey} retornó:`, result);
        return result;
    };
    
    return descriptor;
}

class MiClase {
    @LogMethod
    metodo(a, b) {
        return a + b;
    }
}
```

---

## 📝 RESUMEN EJECUTIVO

### **Conceptos clave que dominaste:**

1. **call()** - Ejecutar función YA con "this" específico
2. **apply()** - Como call, pero argumentos en array
3. **bind()** - Crear función reutilizable con "this" fijado
4. **Method borrowing** - Usar métodos de un objeto en otro
5. **Partial application** - Pre-configurar argumentos con bind()
6. **Decorators** - Envolver funciones para agregar funcionalidad
7. **arguments** - Objeto especial en funciones regulares
8. **Legacy vs Moderno** - Qué usar hoy y qué evitar

---

### **Reglas de oro:**

1. **call/apply/bind NO modifican NADA** (ni función ni prototipo)
2. **call/apply ejecutan YA, bind crea función NUEVA**
3. **bind() usa closures** para recordar "this" y argumentos
4. **arguments es legacy**, usá rest parameters (`...args`)
5. **Array.prototype.slice.call() es legacy**, usá `Array.from()` o `[...]`
6. **Preservá "this" en decorators** con `apply(this, args)`
7. **bind() NO crea arrow functions**, crea regulares anónimas

---

### **Decisión rápida:**

```
¿Necesitas ejecutar YA?
  ├─ ¿Argumentos en array? → apply()
  └─ ¿Argumentos separados? → call()

¿Necesitas función para DESPUÉS?
  └─ bind()
```

---

## 🎯 EJERCICIOS DE CONSOLIDACIÓN

### **Ejercicio mental 1:**

```javascript
const obj = { nombre: "Ana" };
function saludar() { console.log(this.nombre); }

// ¿Qué muestra cada uno?
saludar();                    // ?
saludar.call(obj);            // ?
const s = saludar.bind(obj);
s();                          // ?
```

**Respuestas:**
```
undefined  (this = window)
Ana        (this = obj)
Ana        (this = obj permanente)
```

---

### **Ejercicio mental 2:**

```javascript
function suma(a, b, c) { return a + b + c; }
const suma10 = suma.bind(null, 10);

// ¿Qué retorna?
suma10(20, 30)  // ?
```

**Respuesta:** `60` (10 + 20 + 30)

---

### **Ejercicio mental 3:**

```javascript
// ¿Cuál funciona?
const array = [1, 2, 3];

// Opción A
Math.max(array)

// Opción B
Math.max.apply(null, array)

// Opción C
Math.max(...array)
```

**Respuestas:**
```
A: NaN  (le pasas array, no números)
B: 3    (apply convierte a argumentos)
C: 3    (spread convierte a argumentos)
```

---

## 🎓 CONCLUSIÓN

Has dominado **call, apply y bind** - las 3 herramientas más poderosas para controlar "this" en JavaScript.

**Ahora podés:**
- ✅ Ejecutar funciones con "this" específico
- ✅ Prestar métodos entre objetos
- ✅ Crear funciones especializadas
- ✅ Implementar decorators profesionales
- ✅ Entender código legacy
- ✅ Debuggear problemas de "this"
- ✅ Usar patterns avanzados de la industria

**Próximo paso:** Proyecto Final que integra TODO (Closures + This + Call/Apply/Bind)

---

**FIN DEL APUNTE MAESTRO - FASE 4**

Versión: 1.0  
Fecha: Enero 2025  
Líneas: ~2,000  
Ejemplos ejecutables: 50+  
Conceptos cubiertos: 100%  

**Este apunte es autocontenido. Tu "yo del pasado" puede leerlo y dominar call/apply/bind sin idas y vueltas.** 🎯
