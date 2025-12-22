# 🏗️ PROYECTO 1: Validador de Formulario con Scope Modular

**Duración:** 2 días máximo  
**Objetivo:** Construir un sistema de validación usando scopes correctamente para organizar código y evitar contaminación del scope global

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Un formulario de registro con validación en tiempo real que:
- Valida múltiples campos (nombre, email, edad, contraseña)
- Muestra mensajes de error específicos
- Organiza el código en módulos usando IIFE (sin contaminar scope global)
- Usa el Namespace Pattern para estructurar la aplicación

**Visualización:**
```
┌─────────────────────────────────────┐
│   📋 FORMULARIO DE REGISTRO         │
├─────────────────────────────────────┤
│ Nombre:     [________________]      │
│             ✓ Válido                │
│                                     │
│ Email:      [________________]      │
│             ❌ Email inválido       │
│                                     │
│ Edad:       [________________]      │
│             ✓ Válido                │
│                                     │
│ Contraseña: [________________]      │
│             ❌ Mínimo 8 caracteres  │
│                                     │
│         [   REGISTRAR   ]           │
└─────────────────────────────────────┘
```

---

## ⏱️ GOVERNOR ACTIVADO

**Límites estrictos:**
- **Día 1:** 3-4 horas máximo
- **Día 2:** 3-4 horas máximo
- **Total:** 2 días (6-8 horas)
- **Iteraciones:** Máximo 2 (primera versión + pulir)
- **Regla 80/20:** Funcional > Perfecto

**Si funciona al 80% al final del Día 2 → NEXT**

---

## ✅ FEATURES MÍNIMAS (MVP)

### Must Have:
- [x] HTML del formulario (provisto)
- [x] Validar 4 campos:
  - [x] Nombre (mínimo 3 caracteres)
  - [x] Email (formato válido)
  - [x] Edad (18-100 años)
  - [x] Contraseña (mínimo 8 caracteres)
- [x] Mostrar mensaje de error específico por campo
- [x] Feedback visual (clase CSS .error / .success)
- [x] Código organizado en módulos (IIFE)
- [x] NO contaminar scope global (solo 1 variable global: App)

### Nice to Have (si sobra tiempo):
- [ ] Validación en tiempo real (mientras escribe)
- [ ] Confirmar contraseña (deben coincidir)
- [ ] Mostrar/ocultar contraseña
- [ ] Contador de caracteres
- [ ] Animaciones CSS en errores

**IMPORTANTE:** Hacé solo Must Have primero. Nice to Have solo si terminás temprano.

---

## 🎯 PATTERNS QUE VAS A APRENDER

### PATTERN 1: Module Pattern (IIFE)

**¿Qué es?**
Una función que se ejecuta inmediatamente y retorna un objeto con métodos públicos, manteniendo variables privadas dentro.

```javascript
const MiModulo = (function() {
    // Variables PRIVADAS (no accesibles desde afuera)
    let variablePrivada = "secreto";
    
    // Función PRIVADA
    function funcionPrivada() {
        console.log(variablePrivada);
    }
    
    // Retornamos solo lo PÚBLICO
    return {
        // Método PÚBLICO (accesible desde afuera)
        metodoPublico: function() {
            funcionPrivada();  // Usa función privada
        }
    };
})();  // ← Los () al final ejecutan la función inmediatamente

// Uso:
MiModulo.metodoPublico();  // ✅ Funciona
// MiModulo.funcionPrivada();  // ❌ ERROR: no existe
// MiModulo.variablePrivada;  // undefined (es privada)
```

**¿Por qué lo usamos?**
- Evita contaminar el scope global
- Crea "privacidad" (variables y funciones que no se ven desde afuera)
- Organiza código relacionado en un módulo

**¿Dónde lo ves en el código?**
- Cada "sección" del sistema es un módulo (Validadores, FormHandler, UI)
- Solo exponés lo que otros módulos necesitan usar

**Analogía:**
Es como una caja con una ranura:
- Lo que está ADENTRO de la caja (variables/funciones privadas) nadie lo ve
- La ranura es lo PÚBLICO (el objeto que retornás)
- Podés meter cosas en la ranura, pero no ver qué hay adentro de la caja

---

### PATTERN 2: Namespace Pattern

**¿Qué es?**
Agrupar toda la funcionalidad relacionada bajo un único objeto global para evitar colisiones de nombres.

```javascript
// ❌ MAL: Contamina el scope global
var validar = function() {};
var mostrar = function() {};
var guardar = function() {};
// 3 variables globales!

// ✅ BIEN: Una sola variable global (namespace)
const App = {
    validar: function() {},
    mostrar: function() {},
    guardar: function() {}
};
// Solo 1 variable global: App
```

**¿Por qué lo usamos?**
- Reduce drasticamente las variables globales
- Evita colisiones de nombres (si otra librería tiene función "validar")
- Código más organizado y fácil de mantener

**¿Dónde lo ves en el código?**
- Toda la aplicación vive bajo `App.*`
- App.Validators, App.UI, App.FormHandler
- Solo existe UNA variable global: `App`

**Analogía:**
Es como tener una carpeta "App" en tu computadora:
- En vez de tener 100 archivos sueltos en el escritorio (scope global)
- Tenés 1 carpeta "App" con todo organizado adentro

---

## 🏗️ ESTRUCTURA DEL PROYECTO

### Archivos necesarios:
```
proyecto-1/
├── index.html       ← HTML + CSS (provisto)
└── app.js           ← Tu código JavaScript
```

---

## 📄 CÓDIGO BASE

### 1. HTML Completo (copiar y pegar)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proyecto 1 - Validador de Formulario</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .container {
            background: white;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            max-width: 500px;
            width: 100%;
        }

        h1 {
            color: #333;
            margin-bottom: 10px;
            text-align: center;
        }

        .subtitle {
            color: #666;
            text-align: center;
            margin-bottom: 30px;
            font-size: 14px;
        }

        .form-group {
            margin-bottom: 25px;
        }

        label {
            display: block;
            color: #333;
            font-weight: 600;
            margin-bottom: 8px;
            font-size: 14px;
        }

        input {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
            transition: all 0.3s ease;
        }

        input:focus {
            outline: none;
            border-color: #667eea;
        }

        /* Estados de validación */
        input.error {
            border-color: #e74c3c;
            background-color: #ffeaea;
        }

        input.success {
            border-color: #2ecc71;
            background-color: #eafaf1;
        }

        /* Mensajes de error */
        .error-message {
            color: #e74c3c;
            font-size: 12px;
            margin-top: 5px;
            display: none;
            font-weight: 500;
        }

        .error-message.show {
            display: block;
        }

        /* Mensaje de éxito */
        .success-message {
            color: #2ecc71;
            font-size: 12px;
            margin-top: 5px;
            display: none;
            font-weight: 500;
        }

        .success-message.show {
            display: block;
        }

        button {
            width: 100%;
            padding: 14px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease;
        }

        button:hover {
            transform: translateY(-2px);
        }

        button:active {
            transform: translateY(0);
        }

        button:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }

        /* Mensaje final de éxito */
        .form-success {
            background: #d4edda;
            color: #155724;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
            display: none;
            text-align: center;
            font-weight: 600;
        }

        .form-success.show {
            display: block;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📋 Formulario de Registro</h1>
        <p class="subtitle">Completa todos los campos correctamente</p>

        <div class="form-success" id="formSuccess">
            ✅ ¡Formulario enviado exitosamente!
        </div>

        <form id="registrationForm">
            <div class="form-group">
                <label for="nombre">Nombre completo</label>
                <input 
                    type="text" 
                    id="nombre" 
                    name="nombre"
                    placeholder="Ej: Juan Pérez"
                >
                <div class="error-message" id="nombreError"></div>
                <div class="success-message" id="nombreSuccess">✓ Válido</div>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="Ej: juan@example.com"
                >
                <div class="error-message" id="emailError"></div>
                <div class="success-message" id="emailSuccess">✓ Válido</div>
            </div>

            <div class="form-group">
                <label for="edad">Edad</label>
                <input 
                    type="number" 
                    id="edad" 
                    name="edad"
                    placeholder="Ej: 25"
                >
                <div class="error-message" id="edadError"></div>
                <div class="success-message" id="edadSuccess">✓ Válido</div>
            </div>

            <div class="form-group">
                <label for="password">Contraseña</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password"
                    placeholder="Mínimo 8 caracteres"
                >
                <div class="error-message" id="passwordError"></div>
                <div class="success-message" id="passwordSuccess">✓ Válido</div>
            </div>

            <button type="submit">REGISTRAR</button>
        </form>
    </div>

    <!-- Tu código JavaScript va aquí -->
    <script src="app.js"></script>
</body>
</html>
```

---

### 2. Estructura JavaScript (app.js)

```javascript
// ============================================
// PROYECTO 1: VALIDADOR DE FORMULARIO
// ============================================
// Objetivo: Organizar código con Module Pattern y Namespace Pattern
// Sin contaminar el scope global (solo 1 variable: App)

// ============================================
// NAMESPACE GLOBAL (única variable global)
// ============================================
const App = {};

// ============================================
// MÓDULO 1: VALIDADORES
// ============================================
// Este módulo contiene todas las funciones de validación
// Retorna un objeto con los validadores públicos

App.Validators = (function() {
    // Variables privadas del módulo (si las necesitás)
    // Por ejemplo, podrías tener reglas de validación aquí
    
    // Validador de nombre
    function validarNombre(nombre) {
        // 1. Verificar que no esté vacío
        // 2. Verificar longitud mínima (3 caracteres)
        // 3. Retornar objeto: { valido: true/false, mensaje: "..." }
        
        // TU CÓDIGO AQUÍ
    }
    
    // Validador de email
    function validarEmail(email) {
        // 1. Verificar que no esté vacío
        // 2. Verificar formato con regex básica
        // 3. Retornar objeto: { valido: true/false, mensaje: "..." }
        
        // Regex sugerida: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        
        // TU CÓDIGO AQUÍ
    }
    
    // Validador de edad
    function validarEdad(edad) {
        // 1. Convertir a número
        // 2. Verificar que esté entre 18 y 100
        // 3. Retornar objeto: { valido: true/false, mensaje: "..." }
        
        // TU CÓDIGO AQUÍ
    }
    
    // Validador de contraseña
    function validarPassword(password) {
        // 1. Verificar que no esté vacío
        // 2. Verificar longitud mínima (8 caracteres)
        // 3. Retornar objeto: { valido: true/false, mensaje: "..." }
        
        // TU CÓDIGO AQUÍ
    }
    
    // Retornamos SOLO las funciones públicas
    return {
        nombre: validarNombre,
        email: validarEmail,
        edad: validarEdad,
        password: validarPassword
    };
})();

// ============================================
// MÓDULO 2: MANEJO DE UI
// ============================================
// Este módulo maneja la interfaz (mostrar/ocultar mensajes, clases CSS)

App.UI = (function() {
    
    // Mostrar error en un campo
    function mostrarError(campoId, mensaje) {
        // 1. Obtener el input
        // 2. Agregar clase "error"
        // 3. Quitar clase "success" (si la tiene)
        // 4. Mostrar mensaje de error
        // 5. Ocultar mensaje de éxito
        
        // TU CÓDIGO AQUÍ
    }
    
    // Mostrar éxito en un campo
    function mostrarExito(campoId) {
        // 1. Obtener el input
        // 2. Agregar clase "success"
        // 3. Quitar clase "error" (si la tiene)
        // 4. Ocultar mensaje de error
        // 5. Mostrar mensaje de éxito
        
        // TU CÓDIGO AQUÍ
    }
    
    // Limpiar estado de un campo
    function limpiarEstado(campoId) {
        // 1. Obtener el input
        // 2. Quitar clases "error" y "success"
        // 3. Ocultar todos los mensajes
        
        // TU CÓDIGO AQUÍ
    }
    
    // Mostrar mensaje de formulario enviado
    function mostrarFormularioExitoso() {
        // 1. Obtener elemento #formSuccess
        // 2. Agregar clase "show"
        // 3. Opcional: ocultarlo después de 3 segundos
        
        // TU CÓDIGO AQUÍ
    }
    
    // Retornamos métodos públicos
    return {
        mostrarError: mostrarError,
        mostrarExito: mostrarExito,
        limpiarEstado: limpiarEstado,
        mostrarFormularioExitoso: mostrarFormularioExitoso
    };
})();

// ============================================
// MÓDULO 3: MANEJADOR DEL FORMULARIO
// ============================================
// Este módulo coordina todo: validación + UI + submit

App.FormHandler = (function() {
    
    // Variable privada: referencia al formulario
    let form;
    
    // Inicializar el manejador
    function init() {
        // 1. Obtener el formulario
        form = document.getElementById('registrationForm');
        
        // 2. Agregar event listener al submit
        form.addEventListener('submit', manejarSubmit);
        
        // TU CÓDIGO AQUÍ
    }
    
    // Validar un campo individual
    function validarCampo(campoId) {
        // 1. Obtener el valor del input
        // 2. Llamar al validador correspondiente de App.Validators
        // 3. Si es válido -> App.UI.mostrarExito()
        // 4. Si es inválido -> App.UI.mostrarError()
        // 5. Retornar true/false
        
        // Ejemplo:
        // const input = document.getElementById(campoId);
        // const resultado = App.Validators[campoId](input.value);
        // if (resultado.valido) { ... } else { ... }
        
        // TU CÓDIGO AQUÍ
    }
    
    // Validar todos los campos
    function validarFormulario() {
        // 1. Validar cada campo (nombre, email, edad, password)
        // 2. Guardar resultados en array o variables
        // 3. Retornar true solo si TODOS son válidos
        
        // TU CÓDIGO AQUÍ
    }
    
    // Manejar el evento submit
    function manejarSubmit(evento) {
        // 1. Prevenir el submit default (evento.preventDefault())
        // 2. Validar formulario completo
        // 3. Si es válido:
        //    - Mostrar mensaje de éxito
        //    - Opcional: limpiar formulario
        // 4. Si es inválido:
        //    - No hacer nada (los errores ya se mostraron)
        
        // TU CÓDIGO AQUÍ
    }
    
    // Retornamos solo el método de inicialización
    return {
        init: init
    };
})();

// ============================================
// INICIALIZAR LA APLICACIÓN
// ============================================
// Cuando el DOM esté listo, inicializar el FormHandler

document.addEventListener('DOMContentLoaded', function() {
    App.FormHandler.init();
});

// ============================================
// ANÁLISIS DE SCOPE
// ============================================
// - Scope Global: Solo existe "App"
// - Cada módulo (Validators, UI, FormHandler) es un IIFE
// - Variables dentro de cada IIFE son PRIVADAS
// - Solo lo que se retorna en "return { ... }" es PÚBLICO
// - Esto evita contaminar el scope global
// - Otros scripts pueden usar App.* sin conflictos
```

---

## 📅 CRONOGRAMA DÍA POR DÍA

### DÍA 1: Setup y Validadores (3-4 horas)

**Objetivo del día:** HTML funcionando + validadores básicos + mostrar errores

**Tareas:**
1. [ ] Crear archivos (index.html, app.js)
2. [ ] Copiar HTML completo provisto
3. [ ] Copiar estructura JavaScript base
4. [ ] Implementar `App.Validators.nombre()`:
   - [ ] Verificar no vacío
   - [ ] Verificar longitud >= 3
   - [ ] Retornar objeto { valido, mensaje }
5. [ ] Implementar `App.Validators.email()`:
   - [ ] Verificar no vacío
   - [ ] Validar con regex
   - [ ] Retornar objeto { valido, mensaje }
6. [ ] Implementar `App.Validators.edad()`:
   - [ ] Convertir a número
   - [ ] Verificar rango 18-100
   - [ ] Retornar objeto { valido, mensaje }
7. [ ] Implementar `App.Validators.password()`:
   - [ ] Verificar no vacío
   - [ ] Verificar longitud >= 8
   - [ ] Retornar objeto { valido, mensaje }
8. [ ] Probar validadores en consola:
   ```javascript
   App.Validators.nombre("Juan");  // { valido: true, mensaje: "" }
   App.Validators.nombre("Jo");    // { valido: false, mensaje: "..." }
   ```

**Checkpoint Día 1:**
- [ ] Los 4 validadores funcionan
- [ ] Probados en consola manualmente
- [ ] Retornan objetos con formato correcto

---

### DÍA 2: Integración y Refinamiento (3-4 horas)

**Objetivo del día:** Conectar validadores con UI + submit funcionando

**Tareas:**
1. [ ] Implementar `App.UI.mostrarError()`:
   - [ ] Agregar clase "error" al input
   - [ ] Mostrar mensaje de error
   - [ ] Quitar clase "success"
2. [ ] Implementar `App.UI.mostrarExito()`:
   - [ ] Agregar clase "success" al input
   - [ ] Mostrar mensaje de éxito
   - [ ] Quitar clase "error"
3. [ ] Implementar `App.UI.mostrarFormularioExitoso()`:
   - [ ] Mostrar mensaje "#formSuccess"
4. [ ] Implementar `App.FormHandler.validarCampo()`:
   - [ ] Obtener valor del input
   - [ ] Llamar validador correspondiente
   - [ ] Llamar App.UI.mostrarError/Exito según resultado
5. [ ] Implementar `App.FormHandler.validarFormulario()`:
   - [ ] Validar los 4 campos
   - [ ] Retornar true si todos válidos
6. [ ] Implementar `App.FormHandler.manejarSubmit()`:
   - [ ] Prevenir submit default
   - [ ] Validar formulario
   - [ ] Mostrar mensaje de éxito si válido
7. [ ] Probar flujo completo:
   - [ ] Llenar formulario con datos inválidos → ver errores
   - [ ] Corregir datos → ver éxitos
   - [ ] Submit con datos válidos → mensaje de éxito

**Checkpoint Día 2:**
- [ ] Formulario valida al hacer submit
- [ ] Muestra errores específicos por campo
- [ ] Muestra éxitos cuando está correcto
- [ ] Mensaje final de éxito funciona

---

## 💡 HINTS GENERALES

### Hint 1: Estructura de validador
```javascript
function validarNombre(nombre) {
    if (!nombre || nombre.trim() === '') {
        return { valido: false, mensaje: 'El nombre es requerido' };
    }
    
    if (nombre.trim().length < 3) {
        return { valido: false, mensaje: 'El nombre debe tener al menos 3 caracteres' };
    }
    
    return { valido: true, mensaje: '' };
}
```

### Hint 2: Regex para email
```javascript
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!regexEmail.test(email)) {
    return { valido: false, mensaje: 'Email inválido' };
}
```

### Hint 3: Mostrar error en UI
```javascript
function mostrarError(campoId, mensaje) {
    const input = document.getElementById(campoId);
    const errorDiv = document.getElementById(campoId + 'Error');
    const successDiv = document.getElementById(campoId + 'Success');
    
    input.classList.add('error');
    input.classList.remove('success');
    errorDiv.textContent = mensaje;
    errorDiv.classList.add('show');
    successDiv.classList.remove('show');
}
```

### Hint 4: Validar formulario completo
```javascript
function validarFormulario() {
    const validoNombre = validarCampo('nombre');
    const validoEmail = validarCampo('email');
    const validoEdad = validarCampo('edad');
    const validoPassword = validarCampo('password');
    
    return validoNombre && validoEmail && validoEdad && validoPassword;
}
```

---

## ✅ CHECKLIST FINAL

Antes de dar por terminado el proyecto, verificá:

### Funcionalidad:
- [ ] Los 4 campos se validan correctamente
- [ ] Mensajes de error son específicos y claros
- [ ] Feedback visual funciona (clases .error y .success)
- [ ] Submit solo procede si todo es válido
- [ ] Mensaje de éxito se muestra al enviar

### Código:
- [ ] Solo existe 1 variable global: `App`
- [ ] Cada módulo usa IIFE (patrón Module)
- [ ] Variables privadas están dentro de los IIFE
- [ ] Solo se exponen métodos públicos necesarios
- [ ] Código comentado y organizado

### Patterns aplicados:
- [ ] Module Pattern (IIFE) en los 3 módulos
- [ ] Namespace Pattern (App.*)
- [ ] Separation of Concerns (Validators / UI / FormHandler separados)

---

## 🎓 CONTEXTO DE USO REAL

**Este proyecto simula cómo se organizaba código JavaScript antes de ES6 modules.**

### Verás estos patterns en:
- **jQuery plugins:** Usan IIFE para encapsular funcionalidad
- **Código legacy:** Apps antiguas sin bundlers (Webpack/Vite)
- **Librerías antiguas:** Lodash (_), Moment.js, etc.

### Aunque hoy usamos ES6 modules (import/export), entender esto te ayuda a:
- Leer código legacy en proyectos grandes
- Entender cómo funcionan librerías antiguas
- Apreciar por qué ES6 modules son mejores
- **Dominar scope** (el concepto MÁS importante de JS)

### Este conocimiento es fundamental porque:
- Muchos proyectos REALES tienen código legacy
- Vas a tener que mantener código antiguo
- Entender scope te hace inmune a bugs sutiles
- Es la base para entender closures (Fase 2)

---

## 🚀 DESPUÉS DE COMPLETAR

Una vez que tu formulario funcione:

1. **Probá casos edge:**
   - Espacios en blanco
   - Números negativos en edad
   - Emails sin @
   - Contraseñas de 7 caracteres

2. **Si te sobra tiempo (opcional):**
   - Validación en tiempo real (mientras escribe)
   - Confirmar contraseña
   - Mostrar/ocultar contraseña

3. **Celebrá tu win:**
   - ✅ Proyecto completado
   - ✅ Patterns aplicados
   - ✅ Código organizado profesionalmente
   - ✅ Scope dominado

---

## ⏱️ RECORDATORIO DEL GOVERNOR

**Límites:**
- ⏰ Máximo 2 días (6-8 horas)
- 🔄 Máximo 2 iteraciones
- ✅ 80% funcional = suficiente para avanzar

**Si funciona al final del Día 2 → NEXT (Fase 2)**

No busques perfección. Funcional > Perfecto que nunca se termina.

---

## 📝 PRÓXIMO PASO

Al completar este proyecto, avisame y continuamos con:
**Fase 2: Closures** (Serie de Ejercicios + Proyecto TODO App)

---

**FIN DEL PROYECTO 1**

Versión: 1.0  
Fecha: Diciembre 2025  
Duración: 2 días máximo  
Patterns: Module Pattern (IIFE), Namespace Pattern  
Objetivo: Dominar scope y organización de código
