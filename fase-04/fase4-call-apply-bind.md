# 🎯 FASE 4: CALL, APPLY, BIND - Control Total de "this"

**Duración estimada:** 6-8 horas (2-3 días)  
**Objetivo:** Dominar las 3 herramientas para controlar explícitamente "this"

---

## 📚 ÍNDICE DE EJERCICIOS

1. [Ejercicio 1: Call Básico](#ejercicio-1-call-básico)
2. [Ejercicio 2: Apply Básico](#ejercicio-2-apply-básico)
3. [Ejercicio 3: Bind Básico](#ejercicio-3-bind-básico)
4. [Ejercicio 4: Method Borrowing](#ejercicio-4-method-borrowing)
5. [Ejercicio 5: Currying con Bind](#ejercicio-5-currying-con-bind)
6. [Ejercicio 6: Decorators y Wrappers](#ejercicio-6-decorators-y-wrappers)
7. [Ejercicio 7: Integrador Final](#ejercicio-7-integrador-final)

---

## 🎓 INTRODUCCIÓN: ¿Qué son call, apply y bind?

### **El problema que resuelven:**

Ya sabés que "this" puede perderse:

```javascript
const persona = {
    nombre: "Juan",
    saludar: function() {
        console.log("Hola, soy", this.nombre);
    }
};

const saludar = persona.saludar;
saludar();  // "Hola, soy undefined" ❌
```

**call, apply y bind** te permiten **controlar manualmente** qué es "this".

---

### **Las 3 herramientas:**

**1. call()** - Invocar función CON "this" específico
```javascript
saludar.call(persona);  // "Hola, soy Juan" ✅
```

**2. apply()** - Como call, pero argumentos en array
```javascript
funcion.apply(objeto, [arg1, arg2, arg3]);
```

**3. bind()** - Crear nueva función CON "this" pre-fijado
```javascript
const saludarJuan = saludar.bind(persona);
saludarJuan();  // "Hola, soy Juan" ✅ (siempre)
```

---

### **Analogía simple:**

**call/apply:** "Llamá a esta persona POR TELÉFONO y decile que haga algo"
- Ejecuta INMEDIATAMENTE

**bind:** "Dale a esta persona una TARJETA DE IDENTIDAD permanente"
- Crea nueva función que podés llamar después

---

## 📝 EJERCICIO 1: Call Básico

**⏱️ TIEMPO LÍMITE:** 30-40 min

---

### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Usando call() para invocar función
// ============================================

// Objeto 1
const auto1 = {
    marca: "Toyota",
    modelo: "Corolla",
    año: 2020
};

// Objeto 2
const auto2 = {
    marca: "Ford",
    modelo: "Mustang",
    año: 2022
};

// Función que describe un auto
// ⚠️ NOTA: Esta función NO está dentro de ningún objeto
function describirAuto() {
    console.log(`Auto: ${this.marca} ${this.modelo} (${this.año})`);
}

// ============================================
// USANDO CALL
// ============================================

console.log("=== SIN CALL ===");
describirAuto();
// Resultado: "Auto: undefined undefined (undefined)"
// ¿Por qué? "this" = window (no hay objeto antes del punto)

console.log("\n=== CON CALL - Auto 1 ===");
describirAuto.call(auto1);
// Resultado: "Auto: Toyota Corolla (2020)"
// ¿Por qué? call() dice: "ejecutá describirAuto con this = auto1"

console.log("\n=== CON CALL - Auto 2 ===");
describirAuto.call(auto2);
// Resultado: "Auto: Ford Mustang (2022)"
// ¿Por qué? call() dice: "ejecutá describirAuto con this = auto2"

// ============================================
// CALL CON ARGUMENTOS
// ============================================

function describirAutoCompleto(color, precio) {
    console.log(`Auto: ${this.marca} ${this.modelo}`);
    console.log(`Color: ${color}`);
    console.log(`Precio: $${precio}`);
}

console.log("\n=== CALL CON ARGUMENTOS ===");
describirAutoCompleto.call(auto1, "Rojo", 15000);
// Resultado:
// Auto: Toyota Corolla
// Color: Rojo
// Precio: $15000

// Sintaxis: funcion.call(objetoParaThis, arg1, arg2, arg3, ...)
//                         ↑               ↑
//                         "this"          argumentos separados por comas
```

**¿Cómo funciona call()?**

```
funcion.call(objeto, arg1, arg2)
           ↓
1. Toma la función
2. Le dice: "tu 'this' es este objeto"
3. La ejecuta INMEDIATAMENTE
4. Pasa los argumentos
```

---

### 🎯 TU TURNO:

**CONSIGNA:**

Tenés 3 objetos que representan productos y una función `mostrarProducto` que NO está dentro de ningún objeto.

Usá `call()` para:
1. Mostrar el producto 1
2. Mostrar el producto 2
3. Mostrar el producto 3 con descuento del 20%

**PLANTILLA:**

```javascript
// ============================================
// OBJETOS
// ============================================

const producto1 = {
    nombre: "Laptop",
    precio: 1200,
    categoria: "Electrónica"
};

const producto2 = {
    nombre: "Zapatillas",
    precio: 80,
    categoria: "Ropa"
};

const producto3 = {
    nombre: "Cafetera",
    precio: 50,
    categoria: "Hogar"
};

// ============================================
// FUNCIÓN (NO está en ningún objeto)
// ============================================

function mostrarProducto() {
    console.log(`Producto: ${this.nombre}`);
    console.log(`Categoría: ${this.categoria}`);
    console.log(`Precio: $${this.precio}`);
}

function mostrarProductoConDescuento(porcentaje) {
    const descuento = this.precio * (porcentaje / 100);
    const precioFinal = this.precio - descuento;
    
    console.log(`Producto: ${this.nombre}`);
    console.log(`Precio original: $${this.precio}`);
    console.log(`Descuento: ${porcentaje}%`);
    console.log(`Precio final: $${precioFinal}`);
}

// ============================================
// TU CÓDIGO AQUÍ
// ============================================

// 1. Llamar mostrarProducto para producto1 usando call()


// 2. Llamar mostrarProducto para producto2 usando call()


// 3. Llamar mostrarProductoConDescuento para producto3 con 20% usando call()

```

**RESULTADO ESPERADO:**

```
Producto: Laptop
Categoría: Electrónica
Precio: $1200

Producto: Zapatillas
Categoría: Ropa
Precio: $80

Producto: Cafetera
Precio original: $50
Descuento: 20%
Precio final: $40
```

---

### 💡 HINTS (solo si te trabás >15 min):

**Hint 1:** La sintaxis de call es: `funcion.call(objeto)`

**Hint 2:** Para pasar argumentos: `funcion.call(objeto, arg1, arg2)`

**Hint 3:** No confundas `funcion(objeto)` con `funcion.call(objeto)`. El primero pasa objeto como ARGUMENTO, el segundo lo usa como THIS.

---

### 🌍 CONTEXTO DE USO REAL

**¿Cuándo se usa call() en el mundo real?**

1. **Method borrowing:** Usar métodos de Array en cosas que no son arrays
```javascript
const nodelist = document.querySelectorAll('div');
Array.prototype.forEach.call(nodelist, div => {
    console.log(div);
});
```

2. **Invocar constructores padre:**
```javascript
function Animal(nombre) {
    this.nombre = nombre;
}

function Perro(nombre, raza) {
    Animal.call(this, nombre);  // Llamar constructor padre
    this.raza = raza;
}
```

3. **Testing/Mocking:** Ejecutar funciones con "this" controlado para tests

---

## 📝 EJERCICIO 2: Apply Básico

**⏱️ TIEMPO LÍMITE:** 30-40 min

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Diferencia entre call y apply
// ============================================

const calculadora = {
    marca: "Casio",
    modelo: "FX-991"
};

// Función con MÚLTIPLES argumentos
function sumar(a, b, c, d) {
    console.log(`Calculadora: ${this.marca} ${this.modelo}`);
    const resultado = a + b + c + d;
    console.log(`Suma: ${a} + ${b} + ${c} + ${d} = ${resultado}`);
    return resultado;
}

// ============================================
// CON CALL (argumentos separados)
// ============================================

console.log("=== CON CALL ===");
sumar.call(calculadora, 10, 20, 30, 40);
// Resultado:
// Calculadora: Casio FX-991
// Suma: 10 + 20 + 30 + 40 = 100

// Sintaxis: funcion.call(this, arg1, arg2, arg3, arg4)
//                             ↑    argumentos SEPARADOS por comas

// ============================================
// CON APPLY (argumentos en array)
// ============================================

console.log("\n=== CON APPLY ===");
const numeros = [10, 20, 30, 40];
sumar.apply(calculadora, numeros);
// Resultado:
// Calculadora: Casio FX-991
// Suma: 10 + 20 + 30 + 40 = 100

// Sintaxis: funcion.apply(this, [arg1, arg2, arg3, arg4])
//                              ↑   argumentos en ARRAY

// ============================================
// ¿CUÁNDO USAR APPLY?
// ============================================

// Cuando ya tenés los argumentos en un array
const numerosAleatorios = [5, 15, 25, 35];
sumar.apply(calculadora, numerosAleatorios);

// Sin apply, tendrías que hacer:
// sumar.call(calculadora, numerosAleatorios[0], numerosAleatorios[1], ...)
// ❌ Muy tedioso

// ============================================
// CASO DE USO CLÁSICO: Math.max con array
// ============================================

const numeros2 = [100, 50, 200, 75, 150];

// ❌ Esto NO funciona (Math.max espera argumentos separados)
console.log("\n=== SIN APPLY ===");
console.log(Math.max(numeros2));  // NaN (le pasaste un array, no números)

// ✅ Con apply funciona
console.log("\n=== CON APPLY ===");
const maximo = Math.max.apply(null, numeros2);
//                            ↑    null porque Math.max no usa "this"
console.log("Máximo:", maximo);  // 200

// Alternativa moderna (ES6+): spread operator
console.log("\n=== CON SPREAD (moderno) ===");
console.log("Máximo:", Math.max(...numeros2));  // 200
```

**Diferencia clave:**

```javascript
// CALL:  funcion.call(this, arg1, arg2, arg3)
// APPLY: funcion.apply(this, [arg1, arg2, arg3])
//                              ↑
//                          Array de argumentos
```

---

### 🎯 TU TURNO:

**CONSIGNA:**

Tenés un objeto `estadisticas` y funciones que calculan diferentes métricas a partir de arrays de números.

Usá `apply()` para:
1. Calcular el promedio de un array de calificaciones
2. Encontrar el valor máximo de un array de ventas
3. Calcular el total de un array de gastos

**PLANTILLA:**

```javascript
// ============================================
// OBJETO
// ============================================

const estadisticas = {
    nombre: "Estadísticas del Mes",
    mes: "Enero"
};

// ============================================
// FUNCIONES
// ============================================

function calcularPromedio(/* cantidad variable de argumentos */) {
    // arguments es un objeto parecido a array con todos los argumentos
    console.log(`${this.nombre} - ${this.mes}`);
    
    let suma = 0;
    for (let i = 0; i < arguments.length; i++) {
        suma += arguments[i];
    }
    
    const promedio = suma / arguments.length;
    console.log(`Promedio: ${promedio}`);
    return promedio;
}

function encontrarMaximo() {
    console.log(`${this.nombre} - ${this.mes}`);
    
    let max = arguments[0];
    for (let i = 1; i < arguments.length; i++) {
        if (arguments[i] > max) {
            max = arguments[i];
        }
    }
    
    console.log(`Máximo: ${max}`);
    return max;
}

function calcularTotal() {
    console.log(`${this.nombre} - ${this.mes}`);
    
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    
    console.log(`Total: $${total}`);
    return total;
}

// ============================================
// DATOS
// ============================================

const calificaciones = [8, 9, 7, 10, 8.5, 9.5];
const ventas = [1200, 1500, 980, 2100, 1750];
const gastos = [500, 300, 150, 800, 450];

// ============================================
// TU CÓDIGO AQUÍ
// ============================================

// 1. Calcular promedio de calificaciones usando apply()


// 2. Encontrar máximo de ventas usando apply()


// 3. Calcular total de gastos usando apply()

```

**RESULTADO ESPERADO:**

```
Estadísticas del Mes - Enero
Promedio: 8.666666666666666

Estadísticas del Mes - Enero
Máximo: 2100

Estadísticas del Mes - Enero
Total: $2200
```

---

### 💡 HINTS:

**Hint 1:** La sintaxis de apply es: `funcion.apply(objeto, array)`

**Hint 2:** El segundo argumento de apply SIEMPRE es un array (o algo parecido a array)

**Hint 3:** Si la función no usa "this", podés pasar `null` como primer argumento: `Math.max.apply(null, array)`

---

### 🌍 CONTEXTO DE USO REAL

**¿Cuándo se usa apply()?**

1. **Funciones con argumentos variables que vienen en array:**
```javascript
Math.max.apply(null, arrayDeNumeros);
Math.min.apply(null, arrayDeNumeros);
```

2. **Concatenar arrays (antes de ES6):**
```javascript
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
array1.push.apply(array1, array2);  // [1, 2, 3, 4, 5, 6]
```

3. **Llamar constructores con argumentos en array:**
```javascript
function crearFecha(año, mes, dia) {
    return new Date(año, mes, dia);
}

const fechaArgs = [2024, 0, 15];
// Necesitás apply para pasar el array como argumentos individuales
```

**Nota moderna:** Con ES6 spread operator (`...`), muchos usos de apply se simplifican:
```javascript
// Antes (apply):
Math.max.apply(null, array);

// Ahora (spread):
Math.max(...array);
```

Pero apply sigue siendo útil para compatibilidad y casos específicos.

---

## 📝 EJERCICIO 3: Bind Básico

**⏱️ TIEMPO LÍMITE:** 30-40 min

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: bind() crea nueva función
// ============================================

const usuario = {
    nombre: "Ana",
    edad: 28,
    pais: "Argentina"
};

// Función original
function presentarse() {
    console.log(`Hola, soy ${this.nombre}, tengo ${this.edad} años y soy de ${this.pais}`);
}

// ============================================
// SIN BIND (pierde "this")
// ============================================

console.log("=== SIN BIND ===");
const presentar = presentarse;
presentar();
// Resultado: "Hola, soy undefined, tengo undefined años y soy de undefined"
// ¿Por qué? "this" = window (no hay objeto antes del punto)

// ============================================
// CON BIND (mantiene "this")
// ============================================

console.log("\n=== CON BIND ===");
const presentarAna = presentarse.bind(usuario);
//                                     ↑
//                   "this" será SIEMPRE usuario

presentarAna();
// Resultado: "Hola, soy Ana, tengo 28 años y soy de Argentina"

// ¿Qué hace bind()?
// 1. NO ejecuta la función inmediatamente
// 2. Crea una NUEVA función
// 3. Esa nueva función tiene "this" FIJADO (bound) al objeto que pasaste
// 4. Podés llamar la nueva función cuando quieras

// ============================================
// DIFERENCIA CON CALL/APPLY
// ============================================

console.log("\n=== COMPARACIÓN ===");

// call() - Ejecuta INMEDIATAMENTE
presentarse.call(usuario);  // Se ejecuta ahora
console.log("Call ejecutó la función");

// bind() - Crea nueva función (NO ejecuta)
const nuevaFuncion = presentarse.bind(usuario);  // NO se ejecuta
console.log("Bind creó una función");
nuevaFuncion();  // Ahora sí se ejecuta

// ============================================
// BIND CON ARGUMENTOS (partial application)
// ============================================

function saludarPersonalizado(saludo, despedida) {
    console.log(`${saludo}, soy ${this.nombre}. ${despedida}!`);
}

// Crear función con "this" Y algunos argumentos pre-fijados
const saludarAnaFormal = saludarPersonalizado.bind(usuario, "Buenos días");
//                                                   ↑         ↑
//                                                  this    argumento fijo

saludarAnaFormal("Que tenga un buen día");
// Resultado: "Buenos días, soy Ana. Que tenga un buen día!"
//             ↑                      ↑
//           argumento fijo        argumento pasado al llamar

saludarAnaFormal("Hasta luego");
// Resultado: "Buenos días, soy Ana. Hasta luego!"

// ============================================
// USO EN EVENT LISTENERS (muy común)
// ============================================

const boton = {
    texto: "Click me",
    clicks: 0,
    
    handleClick: function() {
        this.clicks++;
        console.log(`Botón "${this.texto}" clickeado ${this.clicks} veces`);
    }
};

// En un elemento HTML real, harías:
// const elemento = document.getElementById('miBoton');
// elemento.addEventListener('click', boton.handleClick.bind(boton));
//                                                      ↑
//                                  Fija "this" = boton permanentemente

// Simulación:
const handleClickBound = boton.handleClick.bind(boton);
handleClickBound();  // "Botón "Click me" clickeado 1 veces"
handleClickBound();  // "Botón "Click me" clickeado 2 veces"
handleClickBound();  // "Botón "Click me" clickeado 3 veces"
```

**¿Cuándo usar cada uno?**

```javascript
// call()  → Ejecutar función YA con "this" específico
funcion.call(objeto);

// apply() → Ejecutar función YA con "this" + array de argumentos
funcion.apply(objeto, [args]);

// bind()  → Crear nueva función con "this" fijado (ejecutar DESPUÉS)
const nuevaFunc = funcion.bind(objeto);
nuevaFunc();  // Llamar cuando quieras
```

---

### 🎯 TU TURNO:

**CONSIGNA:**

Tenés un objeto `temporizador` con métodos que usan "this". El problema es que cuando pasás esos métodos a `setTimeout`, pierden el contexto.

Usá `bind()` para:
1. Crear una versión "bound" del método `contar`
2. Pasarla a setTimeout sin perder "this"
3. Ver que el temporizador funciona correctamente

**PLANTILLA:**

```javascript
// ============================================
// OBJETO TEMPORIZADOR
// ============================================

const temporizador = {
    segundos: 0,
    nombre: "Timer Principal",
    
    contar: function() {
        this.segundos++;
        console.log(`${this.nombre}: ${this.segundos} segundo(s)`);
    },
    
    iniciar: function() {
        console.log(`Iniciando ${this.nombre}...`);
        
        // ❌ PROBLEMA: Esto pierde "this"
        // setTimeout(this.contar, 1000);
        
        // ============================================
        // TU CÓDIGO AQUÍ
        // ============================================
        // Usar bind() para que this.contar mantenga "this"
        // y pasarlo a setTimeout
        
        
    }
};

// Llamar iniciar
temporizador.iniciar();

// ============================================
// PARTE 2: Crear temporizador con nombre personalizado
// ============================================

const otroTemporizador = {
    segundos: 0,
    nombre: "Timer Secundario"
};

// TU CÓDIGO AQUÍ:
// 1. Crear una versión bound de temporizador.contar
//    pero con "this" = otroTemporizador


// 2. Llamarla 3 veces para simular 3 segundos

```

**RESULTADO ESPERADO:**

```
Iniciando Timer Principal...
(después de 1 segundo)
Timer Principal: 1 segundo(s)

(para parte 2)
Timer Secundario: 1 segundo(s)
Timer Secundario: 2 segundo(s)
Timer Secundario: 3 segundo(s)
```

---

### 💡 HINTS:

**Hint 1:** bind() retorna una NUEVA función, no ejecuta la original

**Hint 2:** Para setTimeout: `setTimeout(funcion.bind(objeto), tiempo)`

**Hint 3:** Para crear función bound reutilizable: `const funcBound = funcion.bind(objeto)`

---

### 🌍 CONTEXTO DE USO REAL

**¿Cuándo se usa bind()?**

1. **Event listeners (MUY común):**
```javascript
class Component {
    constructor() {
        this.count = 0;
        this.handleClick = this.handleClick.bind(this);  // Bind en constructor
    }
    
    handleClick() {
        this.count++;
    }
}
```

2. **React class components (antes de hooks):**
```javascript
class MyComponent extends React.Component {
    constructor() {
        super();
        this.state = { count: 0 };
        this.increment = this.increment.bind(this);  // ← bind necesario
    }
    
    increment() {
        this.setState({ count: this.state.count + 1 });
    }
    
    render() {
        return <button onClick={this.increment}>Click</button>;
    }
}
```

3. **Partial application (pre-configurar argumentos):**
```javascript
function log(nivel, mensaje) {
    console.log(`[${nivel}] ${mensaje}`);
}

const logError = log.bind(null, 'ERROR');
const logInfo = log.bind(null, 'INFO');

logError('Algo falló');  // [ERROR] Algo falló
logInfo('Todo bien');    // [INFO] Todo bien
```

---

## 📝 EJERCICIO 4: Method Borrowing

**⏱️ TIEMPO LÍMITE:** 30-40 min

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Method Borrowing (prestar métodos)
// ============================================

// Objeto 1: tiene método útil
const persona1 = {
    nombre: "Carlos",
    apellido: "Gómez",
    
    nombreCompleto: function() {
        return `${this.nombre} ${this.apellido}`;
    }
};

// Objeto 2: NO tiene método nombreCompleto
const persona2 = {
    nombre: "María",
    apellido: "López"
};

// ============================================
// PROBLEMA: persona2 no tiene nombreCompleto
// ============================================

console.log("=== PERSONA 1 ===");
console.log(persona1.nombreCompleto());  // "Carlos Gómez" ✅

console.log("\n=== PERSONA 2 ===");
// console.log(persona2.nombreCompleto());  // ❌ Error: no tiene ese método

// ============================================
// SOLUCIÓN: "Prestar" el método con call()
// ============================================

console.log("\n=== METHOD BORROWING ===");
const resultado = persona1.nombreCompleto.call(persona2);
//                         ↑                    ↑
//                   método de persona1    pero con this = persona2

console.log(resultado);  // "María López" ✅

// ¿Qué pasó?
// 1. Tomamos el método de persona1
// 2. Lo ejecutamos con "this" = persona2
// 3. El método accede a this.nombre y this.apellido de persona2

// ============================================
// CASO CLÁSICO: Array methods en array-like
// ============================================

// arguments es array-like (parece array pero no lo es)
function sumarTodos() {
    console.log("\n=== ARGUMENTS ===");
    console.log("arguments:", arguments);
    console.log("¿Es array?", Array.isArray(arguments));  // false
    
    // ❌ arguments NO tiene método .reduce()
    // const suma = arguments.reduce((a, b) => a + b);  // Error
    
    // ✅ Prestar el método reduce de Array
    const suma = Array.prototype.reduce.call(arguments, (acum, num) => acum + num);
    //           ↑                            ↑
    //      método de Array            pero con this = arguments
    
    console.log("Suma:", suma);
    return suma;
}

sumarTodos(10, 20, 30, 40);  // Suma: 100

// ============================================
// OTRO EJEMPLO: Array.slice para convertir
// ============================================

function convertirAArray() {
    console.log("\n=== CONVERTIR A ARRAY ===");
    
    // arguments es array-like
    console.log("arguments:", arguments);
    console.log("¿Es array?", Array.isArray(arguments));  // false
    
    // Prestar slice para convertir a array real
    const arrayReal = Array.prototype.slice.call(arguments);
    //                ↑                          ↑
    //           método de Array          pero con this = arguments
    
    console.log("arrayReal:", arrayReal);
    console.log("¿Es array?", Array.isArray(arrayReal));  // true ✅
    
    // Ahora SÍ podemos usar métodos de array
    arrayReal.forEach(num => console.log("Número:", num));
    
    return arrayReal;
}

convertirAArray(5, 10, 15, 20);

// Alternativa moderna:
// const arrayReal = Array.from(arguments);
// const arrayReal = [...arguments];
```

**Concepto clave:**

```
Method Borrowing = Usar método de UN objeto en OTRO objeto

objeto1.metodo.call(objeto2)
       ↑            ↑
   método aquí   "this" será este
```

---

### 🎯 TU TURNO:

**CONSIGNA:**

Tenés objetos que representan diferentes tipos de vehículos. Algunos tienen métodos útiles, otros no.

Usá method borrowing para:
1. Usar el método `calcularImpuesto` del auto en la moto
2. Usar el método de Array `join` en un objeto array-like
3. Convertir un NodeList (array-like) a array real usando `slice`

**PLANTILLA:**

```javascript
// ============================================
// PARTE 1: Borrowing entre objetos
// ============================================

const auto = {
    tipo: "Auto",
    precio: 20000,
    
    calcularImpuesto: function(porcentaje) {
        const impuesto = this.precio * (porcentaje / 100);
        console.log(`Impuesto para ${this.tipo}: $${impuesto}`);
        return impuesto;
    }
};

const moto = {
    tipo: "Moto",
    precio: 5000
    // NO tiene método calcularImpuesto
};

// TU CÓDIGO AQUÍ:
// Usar calcularImpuesto del auto en la moto con 10% de impuesto


// ============================================
// PARTE 2: Array methods en array-like
// ============================================

const datosUsuario = {
    0: "Juan",
    1: "Pérez",
    2: "30",
    3: "Argentina",
    length: 4  // ← IMPORTANTE: tiene length como un array
};

// Este objeto es "array-like" pero NO es un array
console.log("\n=== DATOS USUARIO ===");
console.log("¿Es array?", Array.isArray(datosUsuario));  // false

// TU CÓDIGO AQUÍ:
// Usar el método join() de Array en datosUsuario para unir con " - "
// Resultado esperado: "Juan - Pérez - 30 - Argentina"


// ============================================
// PARTE 3: Convertir array-like a array real
// ============================================

// Simular NodeList (lo que devuelve querySelectorAll)
const fakeNodeList = {
    0: { id: 1, texto: "Elemento 1" },
    1: { id: 2, texto: "Elemento 2" },
    2: { id: 3, texto: "Elemento 3" },
    length: 3
};

console.log("\n=== NODELIST ===");
console.log("¿Es array?", Array.isArray(fakeNodeList));  // false

// TU CÓDIGO AQUÍ:
// Convertir fakeNodeList a array real usando Array.prototype.slice.call()


// Verificar que es array real


// Usar forEach (método de array) en el array convertido

```

**RESULTADO ESPERADO:**

```
Impuesto para Moto: $500

=== DATOS USUARIO ===
¿Es array? false
Resultado join: "Juan - Pérez - 30 - Argentina"

=== NODELIST ===
¿Es array? false
Convertido es array: true
Elemento: { id: 1, texto: 'Elemento 1' }
Elemento: { id: 2, texto: 'Elemento 2' }
Elemento: { id: 3, texto: 'Elemento 3' }
```

---

### 💡 HINTS:

**Hint 1:** Para prestar método: `objeto1.metodo.call(objeto2, args)`

**Hint 2:** Para métodos de Array: `Array.prototype.metodo.call(arrayLike, args)`

**Hint 3:** `arguments`, NodeList, y objetos con `length` son "array-like"

---

### 🌍 CONTEXTO DE USO REAL

**¿Cuándo se usa method borrowing?**

1. **Convertir array-like a array:**
```javascript
// arguments
const argsArray = Array.prototype.slice.call(arguments);

// NodeList
const divs = document.querySelectorAll('div');
const divsArray = Array.prototype.slice.call(divs);

// Moderno:
const argsArray = Array.from(arguments);
const divsArray = [...divs];
```

2. **Usar métodos de Object en otros objetos:**
```javascript
const obj = { a: 1 };
const tiene = Object.prototype.hasOwnProperty.call(obj, 'a');
```

3. **Debugging (toString de Object):**
```javascript
Object.prototype.toString.call([]);        // "[object Array]"
Object.prototype.toString.call({});        // "[object Object]"
Object.prototype.toString.call(new Date); // "[object Date]"
```

---

## 📝 EJERCICIO 5: Currying con Bind

**⏱️ TIEMPO LÍMITE:** 30-40 min

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Currying (partial application)
// ============================================

// Función que suma 3 números
function sumar(a, b, c) {
    console.log(`${a} + ${b} + ${c} = ${a + b + c}`);
    return a + b + c;
}

// ============================================
// USO NORMAL
// ============================================

console.log("=== USO NORMAL ===");
sumar(10, 20, 30);  // "10 + 20 + 30 = 60"

// ============================================
// CON BIND: Pre-fijar argumentos
// ============================================

console.log("\n=== CURRYING CON BIND ===");

// Crear función con primer argumento fijo (10)
const sumar10 = sumar.bind(null, 10);
//                         ↑    ↑
//                      no usa  primer argumento fijo
//                      "this"

// Ahora sumar10 espera solo 2 argumentos (b y c)
sumar10(20, 30);  // "10 + 20 + 30 = 60"
//       ↑   ↑
//       b   c  (a ya está fijo en 10)

sumar10(5, 15);   // "10 + 5 + 15 = 30"
sumar10(100, 200); // "10 + 100 + 200 = 310"

// Crear función con DOS argumentos fijos
const sumar10y20 = sumar.bind(null, 10, 20);
//                                   ↑   ↑
//                                   a   b (fijos)

// Ahora solo espera 1 argumento (c)
sumar10y20(30);  // "10 + 20 + 30 = 60"
//          ↑
//          c (a y b ya están fijos)

sumar10y20(5);   // "10 + 20 + 5 = 35"
sumar10y20(100); // "10 + 20 + 100 = 130"

// ============================================
// EJEMPLO PRÁCTICO: Funciones especializadas
// ============================================

function crearMensaje(tipo, usuario, mensaje) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] [${tipo}] ${usuario}: ${mensaje}`);
}

// Crear versiones especializadas
const logError = crearMensaje.bind(null, "ERROR");
//                                       ↑
//                                  tipo fijo en "ERROR"

const logInfo = crearMensaje.bind(null, "INFO");
const logWarning = crearMensaje.bind(null, "WARNING");

// Usar las versiones especializadas
console.log("\n=== LOGS ESPECIALIZADOS ===");
logError("Admin", "Falló la conexión a BD");
// [HH:MM:SS] [ERROR] Admin: Falló la conexión a BD

logInfo("Sistema", "Servidor iniciado correctamente");
// [HH:MM:SS] [INFO] Sistema: Servidor iniciado correctamente

logWarning("Admin", "Memoria al 80%");
// [HH:MM:SS] [WARNING] Admin: Memoria al 80%

// ============================================
// EJEMPLO: Calculadora especializada
// ============================================

function calcular(operacion, a, b) {
    let resultado;
    
    switch(operacion) {
        case 'sumar':
            resultado = a + b;
            break;
        case 'restar':
            resultado = a - b;
            break;
        case 'multiplicar':
            resultado = a * b;
            break;
        case 'dividir':
            resultado = a / b;
            break;
    }
    
    console.log(`${operacion}: ${a} y ${b} = ${resultado}`);
    return resultado;
}

// Crear calculadoras especializadas
const sumarNumeros = calcular.bind(null, 'sumar');
const restarNumeros = calcular.bind(null, 'restar');
const multiplicarNumeros = calcular.bind(null, 'multiplicar');

console.log("\n=== CALCULADORAS ESPECIALIZADAS ===");
sumarNumeros(10, 5);        // sumar: 10 y 5 = 15
restarNumeros(10, 5);       // restar: 10 y 5 = 5
multiplicarNumeros(10, 5);  // multiplicar: 10 y 5 = 50
```

**Concepto clave:**

```
Currying = Crear funciones especializadas pre-configurando algunos argumentos

funcion.bind(null, arg1, arg2)
            ↑     ↑
         no usa   argumentos pre-fijados
         "this"

La nueva función espera solo los argumentos RESTANTES
```

---

### 🎯 TU TURNO:

**CONSIGNA:**

Tenés una función genérica `aplicarDescuento` que calcula precios con descuento.

Usá bind() para crear funciones especializadas:
1. `descuento10` - Siempre aplica 10% de descuento
2. `descuento25` - Siempre aplica 25% de descuento
3. `descuentoBlackFriday` - Aplica 50% de descuento en categoría "Electrónica"

**PLANTILLA:**

```javascript
// ============================================
// FUNCIÓN GENÉRICA
// ============================================

function aplicarDescuento(porcentaje, precio, producto) {
    const descuento = precio * (porcentaje / 100);
    const precioFinal = precio - descuento;
    
    console.log(`Producto: ${producto}`);
    console.log(`Precio original: $${precio}`);
    console.log(`Descuento ${porcentaje}%: -$${descuento}`);
    console.log(`Precio final: $${precioFinal}`);
    console.log('---');
    
    return precioFinal;
}

// ============================================
// TU CÓDIGO AQUÍ - PARTE 1
// ============================================

// Crear función con 10% fijo


// Crear función con 25% fijo


// Probar las funciones especializadas
console.log("=== DESCUENTO 10% ===");
// descuento10(100, "Teclado");

console.log("\n=== DESCUENTO 25% ===");
// descuento25(100, "Mouse");

// ============================================
// PARTE 2: Función con múltiples argumentos fijos
// ============================================

function aplicarDescuentoPorCategoria(categoria, porcentaje, precio, producto) {
    console.log(`Categoría: ${categoria}`);
    
    const descuento = precio * (porcentaje / 100);
    const precioFinal = precio - descuento;
    
    console.log(`Producto: ${producto}`);
    console.log(`Precio original: $${precio}`);
    console.log(`Descuento ${porcentaje}%: -$${descuento}`);
    console.log(`Precio final: $${precioFinal}`);
    console.log('---');
    
    return precioFinal;
}

// TU CÓDIGO AQUÍ - PARTE 2:
// Crear función Black Friday: categoría "Electrónica" + 50% descuento


// Probar
console.log("\n=== BLACK FRIDAY (Electrónica 50%) ===");
// descuentoBlackFriday(1200, "Laptop");
// descuentoBlackFriday(800, "Tablet");
```

**RESULTADO ESPERADO:**

```
=== DESCUENTO 10% ===
Producto: Teclado
Precio original: $100
Descuento 10%: -$10
Precio final: $90
---

=== DESCUENTO 25% ===
Producto: Mouse
Precio original: $100
Descuento 25%: -$25
Precio final: $75
---

=== BLACK FRIDAY (Electrónica 50%) ===
Categoría: Electrónica
Producto: Laptop
Precio original: $1200
Descuento 50%: -$600
Precio final: $600
---
Categoría: Electrónica
Producto: Tablet
Precio original: $800
Descuento 50%: -$400
Precio final: $400
---
```

---

### 💡 HINTS:

**Hint 1:** Para fijar un argumento: `funcion.bind(null, valorFijo)`

**Hint 2:** Para fijar múltiples: `funcion.bind(null, valor1, valor2)`

**Hint 3:** Los argumentos fijos van en ORDEN (primeros parámetros de la función)

---

### 🌍 CONTEXTO DE USO REAL

**¿Cuándo se usa currying con bind()?**

1. **Logging especializado:**
```javascript
function log(nivel, modulo, mensaje) {
    console.log(`[${nivel}] [${modulo}] ${mensaje}`);
}

const logAuthError = log.bind(null, 'ERROR', 'Auth');
logAuthError('Login falló');  // [ERROR] [Auth] Login falló
```

2. **Event handlers con datos extra:**
```javascript
function handleClick(userId, productId, event) {
    console.log(`User ${userId} clicked product ${productId}`);
}

button1.addEventListener('click', handleClick.bind(null, 123, 456));
// Cuando se hace click, automáticamente pasa userId=123, productId=456
```

3. **Configuración de APIs:**
```javascript
function fetchData(baseUrl, endpoint, options) {
    return fetch(`${baseUrl}${endpoint}`, options);
}

const fetchFromAPI = fetchData.bind(null, 'https://api.ejemplo.com');
fetchFromAPI('/users');     // https://api.ejemplo.com/users
fetchFromAPI('/products');  // https://api.ejemplo.com/products
```

4. **Librerías funcionales (Lodash, Ramda):**
```javascript
// Partial application es MUY común en programación funcional
const add10 = _.partial(add, 10);
const multiply5 = _.partial(multiply, 5);
```

---

## 📝 EJERCICIO 6: Decorators y Wrappers

**⏱️ TIEMPO LÍMITE:** 40 min

---

### 📖 EJEMPLO RESUELTO:

```javascript
// ============================================
// EJEMPLO: Decorators (envolver funciones)
// ============================================

// Función original que queremos "decorar"
function saludar(nombre) {
    console.log(`Hola, ${nombre}!`);
}

// ============================================
// DECORATOR 1: Logging (registrar llamadas)
// ============================================

function loggingDecorator(funcion) {
    // Retornar nueva función que envuelve la original
    return function(...args) {
        console.log(`[LOG] Llamando función con argumentos:`, args);
        
        // Llamar función original con "this" y argumentos correctos
        const resultado = funcion.apply(this, args);
        
        console.log(`[LOG] Función terminó. Resultado:`, resultado);
        return resultado;
    };
}

// Decorar la función
const saludarConLog = loggingDecorator(saludar);

console.log("=== CON LOGGING ===");
saludarConLog("Ana");
// [LOG] Llamando función con argumentos: ["Ana"]
// Hola, Ana!
// [LOG] Función terminó. Resultado: undefined

// ============================================
// DECORATOR 2: Timing (medir tiempo)
// ============================================

function timingDecorator(funcion) {
    return function(...args) {
        console.log(`[TIMING] Iniciando...`);
        const inicio = Date.now();
        
        // Ejecutar función original
        const resultado = funcion.apply(this, args);
        
        const fin = Date.now();
        const duracion = fin - inicio;
        console.log(`[TIMING] Duración: ${duracion}ms`);
        
        return resultado;
    };
}

// Función que tarda un poco
function calcularFactorial(n) {
    if (n <= 1) return 1;
    return n * calcularFactorial(n - 1);
}

const factorialConTiming = timingDecorator(calcularFactorial);

console.log("\n=== CON TIMING ===");
const resultado = factorialConTiming(10);
console.log("Factorial de 10:", resultado);
// [TIMING] Iniciando...
// [TIMING] Duración: 0ms
// Factorial de 10: 3628800

// ============================================
// DECORATOR 3: Caching (memoization)
// ============================================

function cachingDecorator(funcion) {
    const cache = {};  // Closure: cache persiste
    
    return function(...args) {
        // Crear key del cache (convertir argumentos a string)
        const key = JSON.stringify(args);
        
        // Si ya está en cache, retornar
        if (key in cache) {
            console.log(`[CACHE] Hit para ${key}`);
            return cache[key];
        }
        
        // Si no, calcular y guardar
        console.log(`[CACHE] Miss para ${key}. Calculando...`);
        const resultado = funcion.apply(this, args);
        cache[key] = resultado;
        
        return resultado;
    };
}

// Función costosa
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const fibonacciCached = cachingDecorator(fibonacci);

console.log("\n=== CON CACHING ===");
console.log("Primera llamada:");
console.log(fibonacciCached(10));  // Calcula
// [CACHE] Miss para [10]. Calculando...
// 55

console.log("\nSegunda llamada (mismo argumento):");
console.log(fibonacciCached(10));  // Desde cache
// [CACHE] Hit para [10]
// 55

// ============================================
// COMBINAR DECORATORS
// ============================================

function combinarDecorators(funcion, ...decorators) {
    // Aplicar decorators de derecha a izquierda
    return decorators.reduceRight((f, decorator) => decorator(f), funcion);
}

// Función con múltiples decorators
const funcionCompleta = combinarDecorators(
    calcularFactorial,
    loggingDecorator,
    timingDecorator,
    cachingDecorator
);

console.log("\n=== DECORATORS COMBINADOS ===");
funcionCompleta(5);
// [LOG] Llamando función con argumentos: [5]
// [TIMING] Iniciando...
// [CACHE] Miss para [5]. Calculando...
// [TIMING] Duración: 0ms
// [LOG] Función terminó. Resultado: 120

funcionCompleta(5);  // Segunda vez: desde cache
// [LOG] Llamando función con argumentos: [5]
// [TIMING] Iniciando...
// [CACHE] Hit para [5]
// [TIMING] Duración: 0ms
// [LOG] Función terminó. Resultado: 120
```

**Concepto clave:**

```
Decorator = Función que toma función y retorna versión mejorada

function decorator(funcion) {
    return function(...args) {
        // ANTES de ejecutar
        // ...
        
        const resultado = funcion.apply(this, args);
        
        // DESPUÉS de ejecutar
        // ...
        
        return resultado;
    };
}
```

---

### 🎯 TU TURNO:

**CONSIGNA:**

Creá decorators para agregar funcionalidad a funciones existentes.

Implementá:
1. `validacionDecorator` - Valida que los argumentos sean números positivos
2. `retryDecorator` - Reintenta la función si falla (máximo 3 intentos)
3. Aplicar ambos decorators a una función

**PLANTILLA:**

```javascript
// ============================================
// PARTE 1: Validation Decorator
// ============================================

function validacionDecorator(funcion) {
    return function(...args) {
        // TU CÓDIGO AQUÍ:
        // 1. Verificar que todos los args sean números
        // 2. Verificar que todos sean positivos
        // 3. Si no, lanzar error
        // 4. Si sí, ejecutar función original
        
        
    };
}

// Función para probar
function dividir(a, b) {
    console.log(`Dividiendo ${a} / ${b}`);
    return a / b;
}

// Decorar
const dividirValidado = validacionDecorator(dividir);

// Probar
console.log("=== VALIDACIÓN ===");
try {
    console.log(dividirValidado(10, 2));   // Debe funcionar
    console.log(dividirValidado(10, -2));  // Debe lanzar error
} catch (error) {
    console.log("Error:", error.message);
}

// ============================================
// PARTE 2: Retry Decorator
// ============================================

function retryDecorator(funcion, maxIntentos = 3) {
    return function(...args) {
        // TU CÓDIGO AQUÍ:
        // 1. Intentar ejecutar función
        // 2. Si falla, reintentar hasta maxIntentos
        // 3. Si todos fallan, lanzar último error
        
        
    };
}

// Función que falla aleatoriamente
let intentos = 0;
function funcionInestable() {
    intentos++;
    console.log(`Intento #${intentos}`);
    
    if (Math.random() < 0.7) {  // 70% de probabilidad de fallo
        throw new Error("Operación falló");
    }
    
    console.log("¡Éxito!");
    return "OK";
}

// Decorar
const funcionConRetry = retryDecorator(funcionInestable);

// Probar
console.log("\n=== RETRY ===");
try {
    const resultado = funcionConRetry();
    console.log("Resultado:", resultado);
} catch (error) {
    console.log("Todos los intentos fallaron:", error.message);
}
```

**RESULTADO ESPERADO:**

```
=== VALIDACIÓN ===
Dividiendo 10 / 2
5
Error: Todos los argumentos deben ser números positivos

=== RETRY ===
Intento #1
Operación falló. Reintentando...
Intento #2
Operación falló. Reintentando...
Intento #3
¡Éxito!
Resultado: OK
```

---

### 💡 HINTS:

**Hint 1:** Usar `...args` para capturar todos los argumentos

**Hint 2:** Usar `funcion.apply(this, args)` para llamar función original

**Hint 3:** Usar `try/catch` para manejar errores en retry

---

### 🌍 CONTEXTO DE USO REAL

**¿Cuándo se usan decorators?**

1. **Python decorators (@decorator):**
```python
@login_required
@cache(timeout=300)
def get_user_data(user_id):
    # ...
```

2. **TypeScript/Angular decorators:**
```typescript
@Component({
    selector: 'app-root'
})
export class AppComponent { }
```

3. **Middleware en Express:**
```javascript
app.get('/api/users', 
    authenticate,    // Decorator 1
    authorize,       // Decorator 2
    rateLimit,       // Decorator 3
    getUsersHandler
);
```

4. **React Higher-Order Components (HOC):**
```javascript
const EnhancedComponent = withAuth(withLoading(MyComponent));
```

5. **Aspect-Oriented Programming (AOP):**
- Logging
- Performance monitoring
- Error handling
- Caching
- Validation

---

## 📝 EJERCICIO 7: Integrador Final

**⏱️ TIEMPO LÍMITE:** 40-50 min

---

### 🎯 CONSIGNA:

Este ejercicio integra **TODO** lo que aprendiste en las 4 fases:
- Scope y Closures (Fase 1 y 2)
- This (Fase 3)
- Call/Apply/Bind (Fase 4)

Vas a crear un **sistema de gestión de pedidos** con:
- Factory functions (closures)
- Métodos que usan "this" correctamente
- Method borrowing
- Decorators para logging y validación

---

### 📋 PLANTILLA:

```javascript
// ============================================
// SISTEMA DE GESTIÓN DE PEDIDOS
// ============================================

// ============================================
// PARTE 1: Factory de Pedidos (Closures)
// ============================================

function crearPedido(id, cliente) {
    // Estado privado (closure)
    let productos = [];
    let total = 0;
    
    return {
        // TU CÓDIGO AQUÍ:
        // Métodos públicos que necesitas implementar:
        
        agregarProducto: function(nombre, precio, cantidad) {
            // 1. Crear objeto producto
            // 2. Agregarlo a productos
            // 3. Actualizar total
            // 4. Retornar this para chaining
        },
        
        obtenerTotal: function() {
            // Retornar total
        },
        
        obtenerResumen: function() {
            // Retornar objeto con: id, cliente, productos, total
        },
        
        aplicarDescuento: function(porcentaje) {
            // Reducir total según porcentaje
            // Retornar this para chaining
        }
    };
}

// ============================================
// PARTE 2: Sistema de Envío (This)
// ============================================

const sistemaEnvio = {
    empresa: "FastShip",
    tarifaBase: 10,
    
    // TU CÓDIGO AQUÍ:
    calcularEnvio: function(peso, distancia) {
        // Formula: tarifaBase + (peso * 0.5) + (distancia * 0.1)
        // Mostrar: "Envío {empresa}: $XX"
    },
    
    generarEtiqueta: function(pedido) {
        // Usar this.empresa
        // Mostrar info del pedido
    }
};

// ============================================
// PARTE 3: Method Borrowing
// ============================================

const sistemaEnvioExpress = {
    empresa: "ExpressShip",
    tarifaBase: 20
    // NO tiene métodos, los va a "prestar" de sistemaEnvio
};

// TU CÓDIGO AQUÍ:
// Usar calcularEnvio de sistemaEnvio en sistemaEnvioExpress

// ============================================
// PARTE 4: Decorators
// ============================================

function loggingDecorator(funcion) {
    // TU CÓDIGO AQUÍ:
    // Wrapper que loggea cuando se llama la función
}

function validacionDecorator(funcion) {
    // TU CÓDIGO AQUÍ:
    // Validar que precio > 0 y cantidad > 0
}

// ============================================
// PRUEBAS
// ============================================

console.log("=== CREANDO PEDIDO ===");
const pedido1 = crearPedido(1, "Juan Pérez");

// Agregar productos (debería permitir chaining)
pedido1
    .agregarProducto("Laptop", 1200, 1)
    .agregarProducto("Mouse", 25, 2)
    .agregarProducto("Teclado", 80, 1);

console.log("Total:", pedido1.obtenerTotal());  // 1380

// Aplicar descuento
pedido1.aplicarDescuento(10);  // 10% de descuento
console.log("Total con descuento:", pedido1.obtenerTotal());  // 1242

// Resumen
console.log("\nResumen:", pedido1.obtenerResumen());

// ============================================
// Calcular envío
console.log("\n=== ENVÍO ===");
sistemaEnvio.calcularEnvio(5, 100);  // peso 5kg, distancia 100km

// Method borrowing
sistemaEnvio.calcularEnvio.call(sistemaEnvioExpress, 5, 100);

// ============================================
// Decorators
console.log("\n=== CON DECORATORS ===");
const agregarConLog = loggingDecorator(pedido1.agregarProducto.bind(pedido1));
const agregarConValidacion = validacionDecorator(agregarConLog);

agregarConValidacion("Audífonos", 50, 1);
```

**RESULTADO ESPERADO:**

```
=== CREANDO PEDIDO ===
Total: 1380
Total con descuento: 1242

Resumen: {
  id: 1,
  cliente: 'Juan Pérez',
  productos: [
    { nombre: 'Laptop', precio: 1200, cantidad: 1 },
    { nombre: 'Mouse', precio: 25, cantidad: 2 },
    { nombre: 'Teclado', precio: 80, cantidad: 1 }
  ],
  total: 1242
}

=== ENVÍO ===
Envío FastShip: $15.50
Envío ExpressShip: $25.50

=== CON DECORATORS ===
[LOG] Llamando agregarProducto con: ["Audífonos", 50, 1]
[VALIDACIÓN] OK - precio: 50, cantidad: 1
```

---

### 💡 HINTS:

**Hint 1:** Para chaining, retorná `this` en los métodos

**Hint 2:** Para method borrowing: `objeto1.metodo.call(objeto2, args)`

**Hint 3:** Los decorators deben usar `apply(this, args)` para preservar contexto

**Hint 4:** Recordá bind() si pasás métodos como callbacks

---

## ✅ CHECKLIST FINAL - FASE 4

Antes de dar por terminada la fase, verificá:

**Conceptos:**
- [ ] Entendés la diferencia entre call, apply y bind
- [ ] Sabés cuándo usar cada uno
- [ ] Entendés method borrowing
- [ ] Entendés currying/partial application
- [ ] Entendés decorators

**Práctica:**
- [ ] Completaste los 7 ejercicios
- [ ] Probaste el código y funciona
- [ ] Entendés los resultados
- [ ] Podés explicar por qué funciona cada cosa

**Aplicación:**
- [ ] Ves dónde usar esto en proyectos reales
- [ ] Entendés cómo funcionan frameworks por dentro
- [ ] Podés identificar cuándo usar bind en event listeners

---

## 🎓 RESUMEN EJECUTIVO

### **call()**
```javascript
funcion.call(objeto, arg1, arg2)
// Ejecuta AHORA con "this" = objeto
```

**Cuándo:** Ejecutar función inmediatamente con "this" específico

---

### **apply()**
```javascript
funcion.apply(objeto, [arg1, arg2])
// Como call, pero args en array
```

**Cuándo:** Ejecutar función con args que ya tenés en array

---

### **bind()**
```javascript
const nueva = funcion.bind(objeto)
// Crea nueva función con "this" fijado
```

**Cuándo:** Crear función para usar después (event listeners, callbacks)

---

### **Method Borrowing**
```javascript
objeto1.metodo.call(objeto2)
// Usar método de objeto1 en objeto2
```

**Cuándo:** Usar métodos de un objeto en otro (ej: Array methods en array-like)

---

### **Currying**
```javascript
const f2 = f.bind(null, arg1)
// Pre-fijar argumentos
```

**Cuándo:** Crear funciones especializadas

---

### **Decorators**
```javascript
function decorator(f) {
    return function(...args) {
        // antes
        const result = f.apply(this, args);
        // después
        return result;
    };
}
```

**Cuándo:** Agregar funcionalidad sin modificar función original

---

## 🚀 PRÓXIMO PASO

**Al completar esta fase:**

✅ Fase 1: Scope & Context
✅ Fase 2: Closures
✅ Fase 3: This
✅ Fase 4: Call/Apply/Bind

**SIGUIENTE:** Proyecto Final - Sistema de Plugins con API Extensible

Este será el proyecto MÁS completo que integra **TODO** lo aprendido.

---

**¡Éxito con los ejercicios!** 🎯

Recordá el Governor:
- ⏱️ 30-40 min por ejercicio
- 💡 Hints si te trabás >20 min
- ✅ 80% entendido = Suficiente

---

**FIN DE LA FASE 4**

Versión: 1.0  
Fecha: Enero 2025  
Ejercicios: 7 completos  
Duración: 6-8 horas (2-3 días)
