# 🔥 SERIE DE EJERCICIOS FASE 3: THIS

**Duración total:** 8-10 horas (distribuido en 3-4 días)  
**Objetivo:** Dominar "this" en todos sus contextos - desde objetos literales hasta las 4 reglas de binding

---

## ⚠️ INSTRUCCIONES GENERALES

### ⏱️ Governor (límites):
- **Tiempo por ejercicio:** Máximo 30-40 minutos
- **Si te trabás >20 min:** Ver Hint 1
- **Si te trabás >30 min:** Ver Hint 2
- **Funciona?** → NEXT. No optimizar más.

### 📝 Cómo trabajar:
1. Leer el ejemplo resuelto completo
2. Entender el "por qué" de cada comportamiento de "this"
3. Intentar el ejercicio SIN mirar el ejemplo
4. Probar tu código en consola/navegador
5. Comparar con resultado esperado
6. Si falla → debuggear con console.log(this)
7. Usar hints solo si te trabás de verdad

### 🔧 Herramientas:
- Consola del navegador (F12)
- Node.js en terminal (algunos ejercicios)
- Editor de código (VS Code, etc.)

---

## 📚 EJERCICIOS

---

### Ejercicio 1: This en Métodos de Objetos

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: This en Objetos Literales
// ============================================

// 1. THIS en métodos de objetos
const persona = {
    nombre: "Juan",
    edad: 30,
    
    // Método que usa "this"
    saludar: function() {
        // "this" apunta al objeto que llama al método
        console.log("Hola, soy " + this.nombre);
        console.log("Tengo " + this.edad + " años");
    },
    
    // Método que accede a otro método con "this"
    presentarse: function() {
        console.log("Mi nombre es " + this.nombre);
        this.saludar();  // Llamar a otro método del mismo objeto
    }
};

persona.saludar();      // "this" = persona
// Hola, soy Juan
// Tengo 30 años

persona.presentarse();
// Mi nombre es Juan
// Hola, soy Juan
// Tengo 30 años

// 2. THIS cambia según QUIÉN llama al método
const otraPersona = {
    nombre: "María",
    edad: 25
};

// "Robar" el método de persona y usarlo en otraPersona
otraPersona.saludar = persona.saludar;

otraPersona.saludar();  // "this" = otraPersona
// Hola, soy María
// Tengo 25 años

// 3. PERDER EL CONTEXTO (problema clásico)
const saludarSuelto = persona.saludar;  // Guardar referencia a la función

saludarSuelto();  // ❌ "this" = window (o undefined en strict mode)
// Hola, soy undefined
// Tengo undefined años

// ¿POR QUÉ?
// - Cuando llamas a una función sin objeto (sin punto), "this" es window/global
// - "saludarSuelto()" NO tiene objeto antes del punto
// - Por eso "this" no apunta a persona

// 4. OBJETO ANIDADO
const empresa = {
    nombre: "TechCorp",
    empleado: {
        nombre: "Carlos",
        mostrarNombre: function() {
            console.log("Empleado:", this.nombre);
            // "this" apunta a "empleado", NO a "empresa"
        }
    },
    mostrarNombreEmpresa: function() {
        console.log("Empresa:", this.nombre);
        // "this" apunta a "empresa"
    }
};

empresa.empleado.mostrarNombre();      // Empleado: Carlos
empresa.mostrarNombreEmpresa();        // Empresa: TechCorp

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// REGLA DE THIS EN MÉTODOS:
// "this" apunta al objeto que está ANTES del punto al llamar al método
//
// Ejemplos:
// persona.saludar()       → this = persona
// otraPersona.saludar()   → this = otraPersona
// saludarSuelto()         → this = window (sin objeto antes del punto)
// empresa.empleado.foo()  → this = empleado (el último objeto antes del punto)

// ============================================
// ANALOGÍA
// ============================================
// "this" es como la palabra "YO":
// - Cuando Juan dice "Yo tengo 30 años" → YO = Juan
// - Cuando María dice "Yo tengo 25 años" → YO = María
// - "YO" cambia según QUIÉN está hablando
// - "this" cambia según QUIÉN llama al método

// ============================================
// REGLA NEMOTÉCNICA
// ============================================
// "this" = el objeto que está JUSTO ANTES del punto cuando llamas al método
// 
// objeto.metodo()  → this = objeto
// a.b.metodo()     → this = b (el último objeto)
// metodo()         → this = window (sin objeto)
```

**Resultado al ejecutar:**
```
Hola, soy Juan
Tengo 30 años
Mi nombre es Juan
Hola, soy Juan
Tengo 30 años
Hola, soy María
Tengo 25 años
Hola, soy undefined
Tengo undefined años
Empleado: Carlos
Empresa: TechCorp
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá un objeto `auto` que demuestre "this" en métodos:
1. Propiedades: `marca`, `modelo`, `velocidad` (inicial 0)
2. Método `acelerar(cantidad)` que suma a velocidad y muestra mensaje
3. Método `frenar(cantidad)` que resta de velocidad y muestra mensaje
4. Método `mostrarInfo()` que muestra marca, modelo y velocidad actual
5. Probá "robar" el método `mostrarInfo` y usarlo en otro objeto

**PLANTILLA:**
```javascript
const auto = {
    marca: "Toyota",
    modelo: "Corolla",
    velocidad: 0,
    
    // 1. Método acelerar
    acelerar: function(cantidad) {
        // Sumar cantidad a this.velocidad
        // Mostrar mensaje: "Acelerando... Velocidad: X km/h"
        // TU CÓDIGO AQUÍ
    },
    
    // 2. Método frenar
    frenar: function(cantidad) {
        // Restar cantidad de this.velocidad (mínimo 0)
        // Mostrar mensaje: "Frenando... Velocidad: X km/h"
        // TU CÓDIGO AQUÍ
    },
    
    // 3. Método mostrarInfo
    mostrarInfo: function() {
        // Mostrar marca, modelo y velocidad
        // TU CÓDIGO AQUÍ
    }
};

// Probar métodos
auto.acelerar(50);
auto.acelerar(30);
auto.frenar(20);
auto.mostrarInfo();

// 4. Crear otro objeto y "robar" el método
const camion = {
    marca: "Mercedes",
    modelo: "Actros",
    velocidad: 0
};

// TU CÓDIGO AQUÍ (asignar mostrarInfo de auto a camion)

// Llamar método en camion
camion.mostrarInfo();  // Debe mostrar info de camión, no de auto
```

**RESULTADO ESPERADO:**
```
Acelerando... Velocidad: 50 km/h
Acelerando... Velocidad: 80 km/h
Frenando... Velocidad: 60 km/h
Auto: Toyota Corolla - Velocidad: 60 km/h
Auto: Mercedes Actros - Velocidad: 0 km/h
```

---

#### 💡 HINTS (solo si te trabás >20 min):

**Hint 1:** En `acelerar`, hacé: `this.velocidad += cantidad; console.log("Acelerando... Velocidad: " + this.velocidad + " km/h");`

**Hint 2:** Para "robar" el método: `camion.mostrarInfo = auto.mostrarInfo;` - Cuando llames `camion.mostrarInfo()`, "this" será camion.

**Hint 3:** En `frenar`, usá `Math.max(0, this.velocidad - cantidad)` para evitar velocidades negativas.

---

---

### Ejercicio 2: This en Funciones Regulares

⏱️ **TIEMPO LÍMITE:** 30 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: This en Funciones Regulares
// ============================================

// 1. EN NON-STRICT MODE (JavaScript normal)
function mostrarThis() {
    console.log("this es:", this);
}

mostrarThis();  // this = window (en navegador) o global (en Node)

// ¿POR QUÉ?
// - Función sin objeto antes del punto
// - En non-strict mode, "this" = window/global por defecto

// 2. EN STRICT MODE
"use strict";

function mostrarThisStrict() {
    console.log("this es:", this);
}

mostrarThisStrict();  // this = undefined

// ¿POR QUÉ?
// - En strict mode, "this" NO se convierte automáticamente en window
// - Queda como undefined (más seguro)

// 3. FUNCIÓN DENTRO DE MÉTODO (problema clásico)
const objeto = {
    nombre: "Objeto Principal",
    
    metodo: function() {
        console.log("En metodo, this.nombre:", this.nombre);  // ✅ "Objeto Principal"
        
        // Función interna (no es método)
        function funcionInterna() {
            console.log("En funcionInterna, this.nombre:", this.nombre);  // ❌ undefined
            console.log("En funcionInterna, this es:", this);  // window o undefined
        }
        
        funcionInterna();  // Llamada sin objeto
    }
};

objeto.metodo();
// En metodo, this.nombre: Objeto Principal
// En funcionInterna, this.nombre: undefined
// En funcionInterna, this es: Window (o undefined en strict)

// ¿POR QUÉ funcionInterna pierde "this"?
// - funcionInterna() NO tiene objeto antes del punto
// - Se llama como función regular, no como método
// - Por eso "this" NO es "objeto"

// 4. SOLUCIÓN CLÁSICA: Guardar "this" en variable
const objeto2 = {
    nombre: "Objeto Con Solución",
    
    metodo: function() {
        const self = this;  // ✅ Guardar referencia a "this"
        
        function funcionInterna() {
            console.log("Usando self.nombre:", self.nombre);  // ✅ Funciona
        }
        
        funcionInterna();
    }
};

objeto2.metodo();
// Usando self.nombre: Objeto Con Solución

// 5. COMPARACIÓN: Método vs Función Regular
const ejemplo = {
    valor: 42,
    
    metodo: function() {
        console.log("Método - this.valor:", this.valor);  // ✅ 42
    }
};

const funcionSuelta = function() {
    console.log("Función suelta - this.valor:", this.valor);  // ❌ undefined
};

ejemplo.metodo();        // this = ejemplo
funcionSuelta();         // this = window/undefined

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// THIS EN FUNCIONES REGULARES:
// 
// 1. Si se llama como MÉTODO (objeto.funcion()):
//    → this = objeto
//
// 2. Si se llama como FUNCIÓN (funcion()):
//    → Non-strict: this = window/global
//    → Strict mode: this = undefined
//
// 3. Funciones internas dentro de métodos:
//    → Pierden "this" (se comportan como funciones regulares)
//    → Solución: Guardar "this" en variable (self, that, _this)

// ============================================
// ANALOGÍA
// ============================================
// Es como estar en una reunión:
// - Si te presentan formalmente (objeto.método) → sabés quién sos
// - Si te llaman sin contexto (función()) → no sabés a quién te referís
// - "self" es como escribir tu nombre en un papel antes de entrar a otra sala

// ============================================
// CONTEXTO DE USO REAL
// ============================================
// Antes de arrow functions, este era el MAYOR problema de JavaScript:
// - jQuery plugins usaban "self" o "that"
// - Callbacks perdían "this" constantemente
// - Era fuente de bugs infinitos
//
// Arrow functions solucionaron este problema (Ejercicio 4)
```

**Resultado al ejecutar:**
```
this es: Window {...}
this es: undefined
En metodo, this.nombre: Objeto Principal
En funcionInterna, this.nombre: undefined
En funcionInterna, this es: Window
Usando self.nombre: Objeto Con Solución
Método - this.valor: 42
Función suelta - this.valor: undefined
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá un objeto que demuestre el problema de "this" en funciones internas:
1. Objeto `contador` con propiedad `cuenta = 0`
2. Método `iniciarLoop()` que usa setTimeout con función regular (pierde this)
3. Método `iniciarLoopFixed()` que usa la técnica "self" para mantener this
4. Probá ambos métodos y observá la diferencia

**PLANTILLA:**
```javascript
const contador = {
    cuenta: 0,
    
    // Método 1: CON PROBLEMA (pierde this)
    iniciarLoop: function() {
        console.log("Iniciando loop (CON PROBLEMA)...");
        
        setTimeout(function() {
            // Intentar incrementar this.cuenta
            this.cuenta++;  // ❌ this = window (no funciona)
            console.log("Loop 1 - Cuenta:", this.cuenta);
        }, 1000);
    },
    
    // Método 2: CON SOLUCIÓN (usa self)
    iniciarLoopFixed: function() {
        console.log("Iniciando loop (FIXED)...");
        
        // TU CÓDIGO AQUÍ
        // 1. Guardar "this" en variable "self"
        // 2. Usar setTimeout con función que use "self.cuenta"
    }
};

// Probar método con problema
contador.iniciarLoop();

// Esperar 1.5 segundos y probar versión fixed
setTimeout(() => {
    contador.iniciarLoopFixed();
}, 1500);
```

**RESULTADO ESPERADO:**
```
Iniciando loop (CON PROBLEMA)...
Loop 1 - Cuenta: NaN  // (undefined + 1 = NaN)
Iniciando loop (FIXED)...
Loop 2 - Cuenta: 1  // ✅ Funciona
```

---

#### 💡 HINTS (solo si te trabás >20 min):

**Hint 1:** En `iniciarLoopFixed`, antes del setTimeout hacé: `const self = this;`

**Hint 2:** Dentro del setTimeout, usá `self` en lugar de `this`: `self.cuenta++; console.log("Loop 2 - Cuenta:", self.cuenta);`

**Hint 3:** La función del setTimeout NO es un método (no tiene objeto.funcion()), por eso pierde "this".

---

---

### Ejercicio 3: This en Constructores

⏱️ **TIEMPO LÍMITE:** 40 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: This en Constructores (con "new")
// ============================================

// 1. FUNCIÓN CONSTRUCTORA
function Persona(nombre, edad) {
    // Cuando se usa "new", JavaScript hace esto automáticamente:
    // 1. Crea un objeto vacío: const this = {};
    // 2. Ejecuta el código del constructor
    // 3. Retorna "this" automáticamente
    
    this.nombre = nombre;
    this.edad = edad;
    
    this.saludar = function() {
        console.log("Hola, soy " + this.nombre);
    };
    
    // No hace falta "return this" (se hace automáticamente con "new")
}

// Usar constructor con "new"
const persona1 = new Persona("Juan", 30);
const persona2 = new Persona("María", 25);

console.log(persona1.nombre);  // Juan
console.log(persona2.nombre);  // María

persona1.saludar();  // Hola, soy Juan
persona2.saludar();  // Hola, soy María

// Cada instancia tiene SU PROPIO "this"
console.log(persona1 === persona2);  // false (objetos diferentes)

// 2. SIN "new" (ERROR COMÚN)
const persona3 = Persona("Pedro", 40);  // ❌ Olvidé "new"

console.log(persona3);  // undefined
console.log(window.nombre);  // "Pedro" (se creó variable global!)

// ¿QUÉ PASÓ?
// - Sin "new", la función se ejecuta como función regular
// - "this" = window
// - this.nombre = window.nombre (contaminó el scope global)
// - La función no retorna nada → undefined

// 3. VERIFICAR SI SE USÓ "new"
function PersonaSegura(nombre, edad) {
    // Verificar si se llamó con "new"
    if (!(this instanceof PersonaSegura)) {
        console.log("ERROR: Debe usar 'new PersonaSegura()'");
        return;
    }
    
    this.nombre = nombre;
    this.edad = edad;
}

const p1 = new PersonaSegura("Ana", 28);  // ✅ Funciona
console.log(p1.nombre);  // Ana

const p2 = PersonaSegura("Luis", 35);  // ❌ Error detectado
// ERROR: Debe usar 'new PersonaSegura()'

// 4. MÉTODOS EN PROTOTYPE (más eficiente)
function Animal(tipo) {
    this.tipo = tipo;
}

// Método en prototype (compartido por todas las instancias)
Animal.prototype.mostrarTipo = function() {
    console.log("Soy un " + this.tipo);
};

const perro = new Animal("perro");
const gato = new Animal("gato");

perro.mostrarTipo();  // Soy un perro
gato.mostrarTipo();   // Soy un gato

// Las dos instancias COMPARTEN el mismo método
console.log(perro.mostrarTipo === gato.mostrarTipo);  // true

// 5. "new" PASO A PASO
function explicarNew(valor) {
    // Cuando usas "new", JavaScript hace:
    
    // PASO 1: Crear objeto vacío
    // const nuevoObjeto = {};
    
    // PASO 2: Asignar prototype
    // nuevoObjeto.__proto__ = explicarNew.prototype;
    
    // PASO 3: Hacer que "this" apunte al nuevo objeto
    // this = nuevoObjeto;
    
    // PASO 4: Ejecutar código del constructor
    this.valor = valor;
    
    // PASO 5: Retornar "this" automáticamente
    // return this;
}

const obj = new explicarNew(42);
console.log(obj.valor);  // 42

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// THIS EN CONSTRUCTORES:
//
// CON "new":
// 1. Se crea objeto vacío
// 2. "this" apunta a ese objeto
// 3. Se ejecuta el constructor
// 4. Se retorna "this" automáticamente
//
// SIN "new":
// - Se ejecuta como función regular
// - "this" = window/undefined
// - Contamina scope global
// - No retorna nada (undefined)

// ============================================
// ANALOGÍA
// ============================================
// "new" es como un molde de galletas:
// - El constructor es el molde (Persona)
// - "new" presiona el molde y crea una galleta nueva
// - Cada galleta (instancia) es independiente
// - Todas tienen la misma forma (propiedades/métodos)
// - Pero son objetos diferentes

// ============================================
// CONTEXTO DE USO REAL
// ============================================
// Antes de ES6 classes, TODOS los "objetos con clase" se hacían así:
// - jQuery usa constructores internamente
// - Frameworks viejos (Backbone, AngularJS)
// - Librerías como Moment.js, Date, Array, Object, etc.
//
// Hoy usamos ES6 classes, pero POR DENTRO siguen siendo constructores:
// class Persona { ... }  // ES6
// ↓ Se transpila a:
// function Persona() { ... }  // Constructor clásico
```

**Resultado al ejecutar:**
```
Juan
María
Hola, soy Juan
Hola, soy María
false
undefined
Pedro
Ana
ERROR: Debe usar 'new PersonaSegura()'
Soy un perro
Soy un gato
true
42
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá un constructor `CuentaBancaria` que demuestre "new" y "this":
1. Recibe `titular` y `saldoInicial`
2. Método `depositar(monto)` que suma al saldo
3. Método `retirar(monto)` que resta si hay fondos
4. Método `verSaldo()` que retorna el saldo
5. Creá 2 instancias y probá que son independientes

**PLANTILLA:**
```javascript
function CuentaBancaria(titular, saldoInicial) {
    // 1. Propiedades
    // TU CÓDIGO AQUÍ (this.titular, this.saldo)
    
    // 2. Método depositar
    this.depositar = function(monto) {
        // TU CÓDIGO AQUÍ
    };
    
    // 3. Método retirar
    this.retirar = function(monto) {
        // Verificar si hay fondos suficientes
        // TU CÓDIGO AQUÍ
    };
    
    // 4. Método verSaldo
    this.verSaldo = function() {
        // TU CÓDIGO AQUÍ
    };
}

// 5. Crear dos cuentas
const cuenta1 = new CuentaBancaria("Juan", 1000);
const cuenta2 = new CuentaBancaria("María", 500);

// Probar cuenta1
cuenta1.depositar(500);
cuenta1.retirar(200);
console.log("Saldo Juan:", cuenta1.verSaldo());

// Probar cuenta2
cuenta2.depositar(100);
cuenta2.retirar(700);  // No debería permitir (fondos insuficientes)
console.log("Saldo María:", cuenta2.verSaldo());

// Verificar que son independientes
console.log("¿Son la misma cuenta?", cuenta1 === cuenta2);
```

**RESULTADO ESPERADO:**
```
Depositado: $500. Saldo: $1500
Retirado: $200. Saldo: $1300
Saldo Juan: 1300
Depositado: $100. Saldo: $600
Error: Fondos insuficientes
Saldo María: 600
¿Son la misma cuenta? false
```

---

#### 💡 HINTS (solo si te trabás >20 min):

**Hint 1:** En el constructor: `this.titular = titular; this.saldo = saldoInicial;`

**Hint 2:** En `retirar`: `if (monto <= this.saldo) { this.saldo -= monto; ... } else { console.log("Error: Fondos insuficientes"); }`

**Hint 3:** Recordá que cada instancia creada con "new" tiene SU PROPIO "this" (su propio objeto).

---

---

### Ejercicio 4: Arrow Functions y This

⏱️ **TIEMPO LÍMITE:** 40 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Arrow Functions NO tienen "this" propio
// ============================================

// 1. ARROW FUNCTION vs REGULAR FUNCTION
const objeto = {
    nombre: "Mi Objeto",
    
    // Método con función regular
    metodoRegular: function() {
        console.log("Regular - this.nombre:", this.nombre);  // ✅ "Mi Objeto"
    },
    
    // Método con arrow function
    metodoArrow: () => {
        console.log("Arrow - this.nombre:", this.nombre);  // ❌ undefined
        console.log("Arrow - this:", this);  // Window (o global)
    }
};

objeto.metodoRegular();  // Regular - this.nombre: Mi Objeto
objeto.metodoArrow();    // Arrow - this.nombre: undefined
                         // Arrow - this: Window

// ¿POR QUÉ?
// - Arrow functions NO tienen "this" propio
// - Heredan "this" del scope DONDE FUERON DEFINIDAS (lexical this)
// - metodoArrow fue definida en scope global
// - Por eso "this" = window

// 2. ARROW FUNCTIONS HEREDAN "THIS" DEL PADRE
const objeto2 = {
    nombre: "Objeto 2",
    
    metodo: function() {
        console.log("En método, this.nombre:", this.nombre);  // ✅ "Objeto 2"
        
        // Arrow function DENTRO de método
        const arrowInterna = () => {
            console.log("En arrow interna, this.nombre:", this.nombre);  // ✅ "Objeto 2"
        };
        
        arrowInterna();
    }
};

objeto2.metodo();
// En método, this.nombre: Objeto 2
// En arrow interna, this.nombre: Objeto 2

// ¿POR QUÉ FUNCIONA?
// - arrowInterna está DENTRO de metodo()
// - Hereda "this" de metodo() (que es "objeto2")

// 3. SOLUCIÓN AL PROBLEMA CLÁSICO (Ejercicio 2)
const contador = {
    cuenta: 0,
    
    // CON FUNCIÓN REGULAR (problema)
    iniciarLoopRegular: function() {
        setTimeout(function() {
            this.cuenta++;  // ❌ this = window
            console.log("Regular - Cuenta:", this.cuenta);  // NaN
        }, 100);
    },
    
    // CON ARROW FUNCTION (solución)
    iniciarLoopArrow: function() {
        setTimeout(() => {
            this.cuenta++;  // ✅ this = contador (heredado)
            console.log("Arrow - Cuenta:", this.cuenta);  // 1
        }, 200);
    }
};

contador.iniciarLoopRegular();  // Regular - Cuenta: NaN
contador.iniciarLoopArrow();    // Arrow - Cuenta: 1

// 4. CUANDO NO USAR ARROW FUNCTIONS
const objeto3 = {
    valor: 42,
    
    // ❌ NO usar arrow function como método
    metodo: () => {
        console.log(this.valor);  // undefined (this = window)
    }
};

objeto3.metodo();  // undefined

// REGLA: NO uses arrow functions para MÉTODOS DE OBJETOS

// 5. COMPARACIÓN COMPLETA
const comparacion = {
    nombre: "Comparación",
    
    // ✅ Función regular como método
    regular: function() {
        console.log("Regular:", this.nombre);  // ✅ Funciona
        
        // ❌ Función regular interna (pierde this)
        setTimeout(function() {
            console.log("Regular interna:", this.nombre);  // undefined
        }, 100);
    },
    
    // ✅ Arrow function EN CALLBACKS
    conArrow: function() {
        console.log("Con arrow:", this.nombre);  // ✅ Funciona
        
        // ✅ Arrow function mantiene this
        setTimeout(() => {
            console.log("Arrow interna:", this.nombre);  // ✅ Funciona
        }, 200);
    }
};

comparacion.regular();
comparacion.conArrow();

// 6. CASOS DE USO REAL
const componenteReact = {
    estado: { contador: 0 },
    
    // ❌ Handler con función regular (problema)
    handleClickMal: function() {
        setTimeout(function() {
            this.estado.contador++;  // ❌ Error: this = undefined
        }, 100);
    },
    
    // ✅ Handler con arrow function (solución)
    handleClickBien: function() {
        setTimeout(() => {
            this.estado.contador++;  // ✅ Funciona
            console.log("Contador:", this.estado.contador);
        }, 100);
    }
};

componenteReact.handleClickBien();

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// ARROW FUNCTIONS Y THIS:
//
// 1. NO tienen "this" propio
// 2. Heredan "this" del scope DONDE FUERON DEFINIDAS (lexical this)
// 3. NO se puede cambiar su "this" con call/apply/bind
//
// CUÁNDO USAR:
// ✅ Callbacks (setTimeout, addEventListener, map, filter, etc.)
// ✅ Funciones internas que necesitan mantener "this"
// ❌ Métodos de objetos
// ❌ Constructores (no funcionan con "new")

// ============================================
// ANALOGÍA
// ============================================
// Regular function: Tiene su propia identidad (cambia según contexto)
// Arrow function: Usa la identidad de su padre (hereda contexto)
//
// Es como:
// - Regular: Un actor que cambia de personaje según la escena
// - Arrow: Un narrador que siempre habla desde el mismo punto de vista

// ============================================
// CONTEXTO DE USO REAL
// ============================================
// Arrow functions SOLUCIONARON el problema #1 de JavaScript:
// - Antes: "self = this" en todos lados
// - Ahora: Arrow functions en callbacks
//
// React (antes de hooks):
// class Component {
//   handleClick = () => {  // Arrow function mantiene "this"
//     this.setState(...)
//   }
// }
//
// Array methods:
// array.map(item => item * this.multiplicador)  // ✅ Funciona
```

**Resultado al ejecutar:**
```
Regular - this.nombre: Mi Objeto
Arrow - this.nombre: undefined
Arrow - this: Window
En método, this.nombre: Objeto 2
En arrow interna, this.nombre: Objeto 2
undefined
Regular: Comparación
Con arrow: Comparación
Regular interna: undefined
Arrow interna: Comparación
Contador: 1
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá un objeto `temporizador` que demuestre la diferencia entre regular y arrow functions:
1. Propiedad `segundos = 0`
2. Método `iniciarRegular()` que usa setInterval con función regular (NO funciona)
3. Método `iniciarArrow()` que usa setInterval con arrow function (SÍ funciona)
4. Probá ambos y observá la diferencia

**PLANTILLA:**
```javascript
const temporizador = {
    segundos: 0,
    
    // Método 1: CON FUNCIÓN REGULAR (problema)
    iniciarRegular: function() {
        console.log("Iniciando con función regular...");
        
        setInterval(function() {
            // Intentar incrementar this.segundos
            // TU CÓDIGO AQUÍ
            console.log("Regular - Segundos:", this.segundos);
        }, 1000);
    },
    
    // Método 2: CON ARROW FUNCTION (solución)
    iniciarArrow: function() {
        console.log("Iniciando con arrow function...");
        
        // TU CÓDIGO AQUÍ
        // Usar setInterval con arrow function
        // Incrementar this.segundos
        // Mostrar en consola
    }
};

// Probar versión regular (NO funciona)
// temporizador.iniciarRegular();

// Probar versión arrow (SÍ funciona)
temporizador.iniciarArrow();
```

**RESULTADO ESPERADO:**
```
Iniciando con función regular...
Regular - Segundos: NaN
Regular - Segundos: NaN
Regular - Segundos: NaN
...

Iniciando con arrow function...
Arrow - Segundos: 1
Arrow - Segundos: 2
Arrow - Segundos: 3
...
```

---

#### 💡 HINTS (solo si te trabás >20 min):

**Hint 1:** En `iniciarArrow`, usá: `setInterval(() => { this.segundos++; console.log("Arrow - Segundos:", this.segundos); }, 1000);`

**Hint 2:** La arrow function HEREDA "this" de `iniciarArrow()`, por eso funciona.

**Hint 3:** En `iniciarRegular`, la función regular tiene su propio "this" (window), por eso NO funciona.

---

**🎯 CONTEXTO DE USO REAL (Ejercicio 4):**

Arrow functions en callbacks es el caso de uso MÁS COMÚN:
- **Event listeners:** `button.addEventListener('click', () => this.handleClick())`
- **Array methods:** `items.map(item => this.processItem(item))`
- **Async code:** `setTimeout(() => this.update(), 1000)`
- **React:** `onClick={() => this.setState(...)}`

---

---

### Ejercicio 5: This en Event Listeners

⏱️ **TIEMPO LÍMITE:** 40 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: This en Event Listeners
// ============================================

// HTML necesario:
// <button id="btn1">Botón 1</button>
// <button id="btn2">Botón 2</button>
// <button id="btn3">Botón 3</button>

// 1. THIS en event listener apunta al ELEMENTO
const btn1 = document.getElementById('btn1');

btn1.addEventListener('click', function() {
    console.log("this:", this);  // <button id="btn1">
    console.log("this.textContent:", this.textContent);  // "Botón 1"
    this.style.backgroundColor = 'blue';  // Cambia color del botón
});

// ¿POR QUÉ?
// - En event listeners, "this" apunta al elemento que disparó el evento
// - Es equivalente a "event.currentTarget"

// 2. PROBLEMA: Método de objeto como handler
const contador = {
    cuenta: 0,
    
    incrementar: function() {
        this.cuenta++;
        console.log("Cuenta:", this.cuenta);
    }
};

const btn2 = document.getElementById('btn2');

// ❌ INCORRECTO: Pasar método directamente
btn2.addEventListener('click', contador.incrementar);
// Al hacer click: "this" = btn2 (no "contador")
// Error: btn2.cuenta++ (crea propiedad en el botón!)

// 3. SOLUCIÓN 1: Wrapper function
btn2.addEventListener('click', function() {
    contador.incrementar();  // ✅ Llamar con punto
});
// Ahora "this" dentro de incrementar = contador

// 4. SOLUCIÓN 2: Arrow function (más simple)
const btn3 = document.getElementById('btn3');

btn3.addEventListener('click', () => {
    contador.incrementar();  // ✅ Arrow hereda "this" del scope
});

// 5. CASO REAL: Objeto con múltiples botones
const app = {
    contador: 0,
    boton: null,
    display: null,
    
    init: function() {
        this.boton = document.getElementById('miBoton');
        this.display = document.getElementById('miDisplay');
        
        // ❌ INCORRECTO
        // this.boton.addEventListener('click', this.handleClick);
        // "this" dentro de handleClick = boton (no app)
        
        // ✅ CORRECTO: Usar arrow function
        this.boton.addEventListener('click', () => {
            this.handleClick();
        });
        
        // O usar bind (Ejercicio 7)
        // this.boton.addEventListener('click', this.handleClick.bind(this));
    },
    
    handleClick: function() {
        this.contador++;
        this.display.textContent = `Clicks: ${this.contador}`;
        console.log("Contador app:", this.contador);
    }
};

// app.init();

// 6. ACCEDER AL ELEMENTO Y AL OBJETO
const app2 = {
    nombre: "Mi App",
    
    init: function() {
        const boton = document.getElementById('miBoton2');
        
        // Pasar el evento como parámetro
        boton.addEventListener('click', (event) => {
            // "this" = app2 (arrow function hereda)
            // "event.currentTarget" = botón
            console.log("Objeto:", this.nombre);  // "Mi App"
            console.log("Botón:", event.currentTarget.textContent);  // Texto del botón
            
            event.currentTarget.style.backgroundColor = 'green';
        });
    }
};

// app2.init();

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// THIS EN EVENT LISTENERS:
//
// Con función regular:
// - "this" = elemento que disparó el evento
// - element.addEventListener('click', function() { this = element })
//
// Con arrow function:
// - "this" = heredado del scope padre
// - element.addEventListener('click', () => { this = scope padre })
//
// Problema común:
// - Pasar método de objeto directamente pierde "this"
// - Solución: Wrapper con arrow function o bind()

// ============================================
// ANALOGÍA
// ============================================
// Event listener es como un empleado que atiende llamadas:
// - Función regular: "this" = el teléfono que sonó
// - Arrow function: "this" = la oficina donde trabaja (scope padre)
// - Si necesitas info del teléfono Y de la oficina, usa arrow + event

// ============================================
// CONTEXTO DE USO REAL
// ============================================
// Este es el problema #1 en vanilla JS y jQuery:
// 
// jQuery (función regular):
// $('button').click(function() {
//   $(this).hide();  // "this" = botón clickeado
// });
//
// React (class components):
// <button onClick={this.handleClick}>  // ❌ Pierde this
// <button onClick={() => this.handleClick()}>  // ✅ Mantiene this
//
// Vanilla JS moderno:
// button.addEventListener('click', () => this.handleClick());
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá un objeto `galeria` que maneje clicks en múltiples imágenes:
1. Propiedad `imagenActual = null`
2. Método `init()` que agrega event listeners a todas las imágenes
3. Método `seleccionar(imagen)` que actualiza imagenActual y aplica clase CSS
4. Usar arrow function para mantener "this" correcto

**HTML necesario:**
```html
<div id="galeria">
    <img src="img1.jpg" class="imagen" alt="Imagen 1">
    <img src="img2.jpg" class="imagen" alt="Imagen 2">
    <img src="img3.jpg" class="imagen" alt="Imagen 3">
</div>
<p id="info">Ninguna imagen seleccionada</p>

<style>
    .imagen { border: 2px solid gray; cursor: pointer; }
    .seleccionada { border: 4px solid blue; }
</style>
```

**PLANTILLA:**
```javascript
const galeria = {
    imagenActual: null,
    infoDisplay: null,
    
    init: function() {
        const imagenes = document.querySelectorAll('.imagen');
        this.infoDisplay = document.getElementById('info');
        
        // Agregar event listener a cada imagen
        imagenes.forEach((img) => {
            // TU CÓDIGO AQUÍ
            // Usar arrow function para mantener "this" = galeria
            // Llamar a this.seleccionar(img)
        });
    },
    
    seleccionar: function(imagen) {
        // 1. Quitar clase "seleccionada" de la imagen anterior
        if (this.imagenActual) {
            this.imagenActual.classList.remove('seleccionada');
        }
        
        // 2. Agregar clase a la nueva imagen
        // TU CÓDIGO AQUÍ
        
        // 3. Actualizar imagenActual
        // TU CÓDIGO AQUÍ
        
        // 4. Actualizar display de info
        // TU CÓDIGO AQUÍ
        this.infoDisplay.textContent = `Seleccionada: ${imagen.alt}`;
    }
};

// Inicializar al cargar página
// document.addEventListener('DOMContentLoaded', () => {
//     galeria.init();
// });
```

**RESULTADO ESPERADO:**
- Al hacer click en una imagen, se marca con borde azul
- Las demás vuelven a gris
- El texto muestra "Seleccionada: Imagen X"

---

#### 💡 HINTS (solo si te trabás >20 min):

**Hint 1:** En `init`, dentro del forEach: `img.addEventListener('click', () => { this.seleccionar(img); });`

**Hint 2:** En `seleccionar`: `imagen.classList.add('seleccionada'); this.imagenActual = imagen;`

**Hint 3:** Si usás función regular en el listener, "this" será la imagen, no el objeto galeria.

---

---

### Ejercicio 6: This en Callbacks y Timers

⏱️ **TIEMPO LÍMITE:** 40 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: This en setTimeout/setInterval
// ============================================

// 1. PROBLEMA CLÁSICO con setTimeout
const objeto = {
    nombre: "Mi Objeto",
    
    metodo: function() {
        console.log("Inicio - this.nombre:", this.nombre);  // ✅ "Mi Objeto"
        
        setTimeout(function() {
            console.log("Timeout - this.nombre:", this.nombre);  // ❌ undefined
            console.log("Timeout - this:", this);  // Window
        }, 1000);
    }
};

objeto.metodo();
// Inicio - this.nombre: Mi Objeto
// (después de 1 seg)
// Timeout - this.nombre: undefined

// ¿POR QUÉ?
// - El callback de setTimeout se ejecuta FUERA del contexto del objeto
// - Se ejecuta en el contexto global
// - "this" = window

// 2. SOLUCIÓN: Arrow function
const objeto2 = {
    nombre: "Objeto con Arrow",
    
    metodo: function() {
        console.log("Inicio - this.nombre:", this.nombre);  // ✅
        
        setTimeout(() => {
            console.log("Timeout Arrow - this.nombre:", this.nombre);  // ✅
        }, 1000);
    }
};

objeto2.metodo();
// Inicio - this.nombre: Objeto con Arrow
// (después de 1 seg)
// Timeout Arrow - this.nombre: Objeto con Arrow

// 3. PROBLEMA con setInterval (temporizador)
const reloj = {
    segundos: 0,
    
    iniciarMal: function() {
        setInterval(function() {
            this.segundos++;  // ❌ this = window
            console.log("Segundos (mal):", this.segundos);  // NaN
        }, 1000);
    },
    
    iniciarBien: function() {
        setInterval(() => {
            this.segundos++;  // ✅ this = reloj
            console.log("Segundos (bien):", this.segundos);  // 1, 2, 3...
        }, 1000);
    }
};

// reloj.iniciarBien();

// 4. CALLBACK en Array methods
const app = {
    multiplicador: 2,
    
    // ❌ INCORRECTO: función regular
    procesarMal: function(numeros) {
        return numeros.map(function(n) {
            return n * this.multiplicador;  // ❌ this = undefined
        });
    },
    
    // ✅ CORRECTO: arrow function
    procesarBien: function(numeros) {
        return numeros.map(n => n * this.multiplicador);  // ✅
    }
};

console.log(app.procesarMal([1, 2, 3]));   // [NaN, NaN, NaN]
console.log(app.procesarBien([1, 2, 3]));  // [2, 4, 6]

// 5. DETENER interval y mantener "this"
const contador = {
    cuenta: 0,
    intervalo: null,
    
    iniciar: function() {
        this.intervalo = setInterval(() => {
            this.cuenta++;
            console.log("Cuenta:", this.cuenta);
            
            if (this.cuenta >= 5) {
                this.detener();
            }
        }, 1000);
    },
    
    detener: function() {
        clearInterval(this.intervalo);
        console.log("Contador detenido en:", this.cuenta);
    }
};

// contador.iniciar();

// 6. CALLBACKS en fetch/promises
const api = {
    baseUrl: "https://api.example.com",
    
    // ❌ INCORRECTO
    fetchMal: function() {
        fetch(this.baseUrl + "/data")
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                this.procesarDatos(data);  // ❌ this = undefined
            });
    },
    
    // ✅ CORRECTO
    fetchBien: function() {
        fetch(this.baseUrl + "/data")
            .then(response => response.json())
            .then(data => {
                this.procesarDatos(data);  // ✅ this = api
            });
    },
    
    procesarDatos: function(data) {
        console.log("Datos procesados:", data);
    }
};

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// THIS EN CALLBACKS/TIMERS:
//
// setTimeout/setInterval con función regular:
// - El callback se ejecuta en contexto global
// - "this" = window/undefined
//
// setTimeout/setInterval con arrow function:
// - Arrow hereda "this" del scope padre
// - "this" = objeto que definió el callback
//
// REGLA GENERAL:
// - SIEMPRE usa arrow functions en callbacks
// - Especialmente: setTimeout, setInterval, map, filter, then, etc.

// ============================================
// ANALOGÍA
// ============================================
// Callback es como enviar un mensaje:
// - Función regular: El mensaje olvida quién lo envió
// - Arrow function: El mensaje recuerda quién lo envió
//
// Es como:
// - Regular: "Ejecutá esto" (sin contexto)
// - Arrow: "Ejecutá esto en MI nombre" (con contexto)

// ============================================
// CONTEXTO DE USO REAL
// ============================================
// Este problema es OMNIPRESENTE en JavaScript:
//
// React (antes de hooks):
// setTimeout(() => {
//   this.setState({ count: this.state.count + 1 })
// }, 1000);
//
// Fetch/AJAX:
// fetch(url)
//   .then(res => res.json())
//   .then(data => this.updateUI(data));
//
// Event handlers con delay:
// button.addEventListener('click', () => {
//   setTimeout(() => this.handleClick(), 300);
// });
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá un objeto `cronometro` que cuente hacia atrás:
1. Propiedades: `tiempoRestante = 10`, `intervalo = null`
2. Método `iniciar()` que cuenta cada segundo con setInterval
3. Método `detener()` que limpia el intervalo
4. Al llegar a 0, debe detenerse automáticamente y mostrar mensaje
5. Usar arrow function para mantener "this"

**PLANTILLA:**
```javascript
const cronometro = {
    tiempoRestante: 10,
    intervalo: null,
    display: null,
    
    iniciar: function() {
        console.log("Cronómetro iniciado...");
        
        // TU CÓDIGO AQUÍ
        // 1. Usar setInterval con arrow function
        // 2. Decrementar this.tiempoRestante cada segundo
        // 3. Mostrar tiempo en consola
        // 4. Si llega a 0, llamar this.detener()
    },
    
    detener: function() {
        clearInterval(this.intervalo);
        console.log("¡Tiempo terminado!");
    }
};

// Iniciar cronómetro
cronometro.iniciar();
```

**RESULTADO ESPERADO:**
```
Cronómetro iniciado...
Tiempo restante: 10
Tiempo restante: 9
Tiempo restante: 8
...
Tiempo restante: 1
Tiempo restante: 0
¡Tiempo terminado!
```

---

#### 💡 HINTS (solo si te trabás >20 min):

**Hint 1:** `this.intervalo = setInterval(() => { this.tiempoRestante--; console.log("Tiempo restante:", this.tiempoRestante); if (this.tiempoRestante === 0) this.detener(); }, 1000);`

**Hint 2:** Si usás función regular en setInterval, "this" será window, no cronometro.

**Hint 3:** Guardá la referencia del interval en `this.intervalo` para poder limpiarlo después.

---

---

### Ejercicio 7: Las 4 Reglas de Binding (Integrador)

⏱️ **TIEMPO LÍMITE:** 40 min

---

#### 📖 EJEMPLO RESUELTO (estudiá esto primero):

```javascript
// ============================================
// EJEMPLO: Las 4 Reglas de Binding de "this"
// ============================================

// REGLA 1: DEFAULT BINDING (función suelta)
function mostrarThis() {
    console.log("Default binding - this:", this);
}

mostrarThis();  // window (o undefined en strict mode)

// ¿CUÁNDO?: Función llamada SIN objeto antes del punto

// ============================================

// REGLA 2: IMPLICIT BINDING (método de objeto)
const objeto = {
    nombre: "Mi Objeto",
    metodo: function() {
        console.log("Implicit binding - this.nombre:", this.nombre);
    }
};

objeto.metodo();  // "Mi Objeto"

// ¿CUÁNDO?: Función llamada CON objeto.metodo()
// "this" = objeto antes del punto

// ============================================

// REGLA 3: EXPLICIT BINDING (call/apply/bind)
function saludar(saludo) {
    console.log(saludo + ", soy " + this.nombre);
}

const persona1 = { nombre: "Juan" };
const persona2 = { nombre: "María" };

// call: Invocar función con "this" específico
saludar.call(persona1, "Hola");    // Hola, soy Juan
saludar.call(persona2, "Buenos días");  // Buenos días, soy María

// apply: Igual que call, pero argumentos en array
saludar.apply(persona1, ["Hola"]);  // Hola, soy Juan

// bind: Crear NUEVA función con "this" fijado
const saludarJuan = saludar.bind(persona1);
saludarJuan("Hola");  // Hola, soy Juan
saludarJuan("Chau");  // Chau, soy Juan

// ¿CUÁNDO?: Cuando querés FORZAR qué es "this"

// ============================================

// REGLA 4: NEW BINDING (constructores)
function Persona(nombre) {
    this.nombre = nombre;
    this.saludar = function() {
        console.log("New binding - Hola, soy " + this.nombre);
    };
}

const p1 = new Persona("Carlos");
p1.saludar();  // Hola, soy Carlos

// ¿CUÁNDO?: Función llamada con "new"
// "this" = nuevo objeto creado

// ============================================

// PRECEDENCIA DE LAS REGLAS (de mayor a menor):
// 1. NEW binding (new Funcion())
// 2. EXPLICIT binding (call/apply/bind)
// 3. IMPLICIT binding (objeto.metodo())
// 4. DEFAULT binding (funcion())

// Ejemplos de precedencia:

// NEW > EXPLICIT
function Vehiculo(tipo) {
    this.tipo = tipo;
}

const obj = {};
const VehiculoConBind = Vehiculo.bind(obj);  // Explicit binding
new VehiculoConBind("auto");  // NEW gana
console.log(obj.tipo);  // undefined (new creó objeto nuevo)

// EXPLICIT > IMPLICIT
const objeto2 = {
    valor: 42,
    metodo: function() {
        console.log(this.valor);
    }
};

const objeto3 = { valor: 100 };

objeto2.metodo();  // 42 (implicit)
objeto2.metodo.call(objeto3);  // 100 (explicit gana)

// IMPLICIT > DEFAULT
const objeto4 = {
    valor: 123,
    metodo: function() {
        console.log(this.valor);
    }
};

objeto4.metodo();  // 123 (implicit)
const metodoSuelto = objeto4.metodo;
metodoSuelto();  // undefined (default, perdió contexto)

// ============================================

// CASO ESPECIAL: ARROW FUNCTIONS (no siguen las reglas)
const objetoConArrow = {
    valor: 42,
    
    metodoRegular: function() {
        console.log("Regular - this.valor:", this.valor);  // 42
    },
    
    metodoArrow: () => {
        console.log("Arrow - this.valor:", this.valor);  // undefined
    }
};

objetoConArrow.metodoRegular();  // Sigue reglas normales
objetoConArrow.metodoArrow();    // Arrow NO tiene "this" propio

// Arrow functions:
// - NO siguen las 4 reglas
// - Heredan "this" del scope léxico (donde fueron definidas)
// - NO se puede cambiar su "this" con call/apply/bind

// ============================================

// RESUMEN VISUAL
console.log("=== RESUMEN DE LAS 4 REGLAS ===");

// 1. Default
function regla1() { console.log("1. Default:", this); }
regla1();

// 2. Implicit
const obj2 = {
    metodo: function() { console.log("2. Implicit:", this); }
};
obj2.metodo();

// 3. Explicit
function regla3() { console.log("3. Explicit:", this); }
regla3.call({ nombre: "Forzado" });

// 4. New
function Regla4() { console.log("4. New:", this); }
new Regla4();

// ============================================
// ¿CÓMO FUNCIONA?
// ============================================
// Para determinar "this", pregúntate EN ESTE ORDEN:
//
// 1. ¿Se llamó con "new"?
//    → this = nuevo objeto creado
//
// 2. ¿Se llamó con call/apply/bind?
//    → this = objeto especificado
//
// 3. ¿Se llamó como método (objeto.metodo())?
//    → this = objeto antes del punto
//
// 4. ¿No cumple ninguna anterior?
//    → this = window (o undefined en strict)

// ============================================
// ANALOGÍA
// ============================================
// Las 4 reglas son como 4 formas de presentarte:
// 1. Default: "Hola" (sin contexto)
// 2. Implicit: "Hola, soy empleado de X empresa" (contexto del objeto)
// 3. Explicit: "Hola, ME LLAMO Juan" (forzás la identidad)
// 4. New: "Hola, SOY NUEVO aquí" (identidad nueva)

// ============================================
// CONTEXTO DE USO REAL
// ============================================
// Estas reglas explican TODO el comportamiento de "this":
// - React class components: bind en constructor (explicit)
// - jQuery: $(this) en callbacks (implicit)
// - Constructores: new Date(), new Array() (new binding)
// - Event listeners: this = elemento (implicit)
// - Callbacks: this perdido (default) → arrow functions solucionan
```

---

#### 🎯 TU TURNO:

**CONSIGNA:**
Creá ejemplos que demuestren las 4 reglas y su precedencia:
1. Función que muestra "this.nombre"
2. Demostrar cada una de las 4 reglas
3. Demostrar precedencia (explicit > implicit)
4. Crear versión con bind y probar que se mantiene

**PLANTILLA:**
```javascript
// Función para usar en ejemplos
function mostrarNombre(saludo) {
    console.log(saludo + ", soy " + this.nombre);
}

// REGLA 1: DEFAULT BINDING
// TU CÓDIGO AQUÍ
// Llamar mostrarNombre() directamente (sin objeto)

// REGLA 2: IMPLICIT BINDING
const persona = {
    nombre: "Juan",
    saludar: mostrarNombre
};
// TU CÓDIGO AQUÍ
// Llamar persona.saludar("Hola")

// REGLA 3: EXPLICIT BINDING
const maria = { nombre: "María" };
// TU CÓDIGO AQUÍ
// Usar call para forzar "this" = maria

// REGLA 4: NEW BINDING
function Persona(nombre) {
    this.nombre = nombre;
}
// TU CÓDIGO AQUÍ
// Crear instancia con "new"

// PRECEDENCIA: Explicit > Implicit
const carlos = { nombre: "Carlos" };
// TU CÓDIGO AQUÍ
// Llamar persona.saludar.call(carlos, "Hola")
// ¿Quién gana: persona (implicit) o carlos (explicit)?

// BIND (crear función con "this" fijo)
// TU CÓDIGO AQUÍ
// Crear función con bind que siempre use "maria"
// Probá llamarla de diferentes formas
```

**RESULTADO ESPERADO:**
```
DEFAULT: , soy undefined
IMPLICIT: Hola, soy Juan
EXPLICIT: Buenos días, soy María
NEW: Instancia creada - nombre: Pedro
PRECEDENCIA: Hola, soy Carlos  // Explicit gana
BIND: Chau, soy María  // Siempre María (fijado con bind)
```

---

#### 💡 HINTS (solo si te trabás >20 min):

**Hint 1:** Default: `mostrarNombre("DEFAULT");` - this = window

**Hint 2:** Explicit: `mostrarNombre.call(maria, "Buenos días");` - this = maria

**Hint 3:** Bind: `const saludarMaria = mostrarNombre.bind(maria); saludarMaria("Chau");` - siempre usa maria

---

**🎯 CONTEXTO DE USO REAL (Ejercicio 7):**

Las 4 reglas explican TODO el comportamiento de "this" en JavaScript:
- **React:** `this.handleClick = this.handleClick.bind(this)` (explicit binding)
- **jQuery:** `$('button').click(function() { $(this).hide() })` (implicit)
- **Vanilla JS:** `button.addEventListener('click', this.handler.bind(this))` (explicit)
- **Constructores:** `new Date()`, `new Promise()` (new binding)

---

---

## 🎯 CHECKLIST DE PROGRESO

Marcá cada ejercicio cuando lo completes:

- [ ] Ejercicio 1: This en Métodos de Objetos
- [ ] Ejercicio 2: This en Funciones Regulares
- [ ] Ejercicio 3: This en Constructores
- [ ] Ejercicio 4: Arrow Functions y This
- [ ] Ejercicio 5: This en Event Listeners
- [ ] Ejercicio 6: This en Callbacks y Timers
- [ ] Ejercicio 7: Las 4 Reglas de Binding

---

## 🎊 AL COMPLETAR TODOS LOS EJERCICIOS

**¡Felicitaciones!** Completaste la Serie de Ejercicios Fase 3.

**Has dominado:**
- ✅ This en métodos de objetos (implicit binding)
- ✅ This en funciones regulares (default binding)
- ✅ This en constructores (new binding)
- ✅ Arrow functions y herencia de this
- ✅ This en event listeners
- ✅ This en callbacks y timers
- ✅ Las 4 reglas de binding y su precedencia
- ✅ Call, apply y bind (explicit binding)

**Próximo paso:** Proyecto Integrador 3 - Dashboard Interactivo con Manejo Correcto de This

---

## 📝 NOTAS IMPORTANTES

### ¿Qué hacer si te trabás?
1. Releé el ejemplo resuelto con MÁS atención
2. Usá console.log(this) para ver qué es "this" en cada contexto
3. Dibujá un diagrama de quién llama a quién
4. Probá casos más simples primero
5. Usá los hints si >20 min
6. Preguntá si >30 min

### Governor recuerda:
- ⏱️ Máximo 30-40 min por ejercicio
- ✅ Si funciona al 80% → NEXT
- ❌ NO iterar buscando perfección
- 🎯 Aprender > código perfecto

### Reconocimiento:
- "This" es el concepto MÁS confuso de JavaScript
- Incluso devs seniors tienen bugs con "this"
- Dominarlo te pone en el top 20% de desarrolladores
- Estás construyendo conocimiento CRÍTICO

---

**FIN DE LA SERIE DE EJERCICIOS FASE 3**

Versión: 1.0  
Fecha: Diciembre 2025  
Ejercicios: 7  
Duración estimada: 8-10 horas
