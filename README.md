# 🚀 JavaScript Avanzado - Training-025-JS-this-context-scope
Ejercitacion de conceptos como this, apply, bind, call, clousure, scope y context

<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

**Entrenamiento intensivo de JavaScript desde fundamentos hasta conceptos avanzados**

[📚 Sobre el Proyecto](#-sobre-el-proyecto) • 
[🎯 Objetivos](#-objetivos-alcanzados) • 
[📂 Estructura](#-estructura-del-repositorio) • 
[🛠️ Tecnologías](#️-tecnologías-utilizadas) • 
[🏆 Proyectos](#-proyectos-destacados) • 
[📈 Progreso](#-progreso-del-entrenamiento)

</div>

---

## 📚 Sobre el Proyecto

Este repositorio documenta mi viaje completo de aprendizaje en **JavaScript Avanzado**, desde conceptos fundamentales hasta patrones de diseño profesionales. El entrenamiento está estructurado en **4 fases progresivas**, cada una con ejercicios prácticos y proyectos integradores.

### 🎓 Metodología de Aprendizaje

- **Learning by Doing:** Prioridad en código funcional sobre teoría abstracta
- **Proyectos Integradores:** Aplicación práctica de conceptos en cada fase
- **Code Review:** Análisis detallado y mejora continua
- **Buenas Prácticas:** Énfasis en código limpio, patterns y arquitectura

### ⏱️ Duración Total
**4 semanas** | **~80 horas** | Enero 2025

---

## 🎯 Objetivos Alcanzados

### ✅ Conceptos Dominados

#### **Fase 1: Scope & Context**
- Scope global vs local vs block
- Hoisting y temporal dead zone
- Scope chain y closure preview
- Module pattern (IIFE)
- Namespace pattern

#### **Fase 2: Closures**
- Factory functions con estado privado
- Closures en loops (problema clásico)
- Partial application
- Memoization
- Decorators con closures

#### **Fase 3: This**
- Las 4 reglas de binding de "this"
- This en métodos, constructores y arrow functions
- This en event listeners y callbacks
- Method binding con bind()
- Problemas comunes y soluciones

#### **Fase 4: Call, Apply, Bind**
- Control explícito de "this"
- Method borrowing entre objetos
- Partial application con bind()
- Decorators avanzados
- Diferencias y casos de uso de cada método

---

## 📂 Estructura del Repositorio

```
javascript-avanzado/
│
├── 📁 fase-1-scope-context/
│   ├── 📁 ejercicios/
│   │   ├── ejercicio-01.js
│   │   ├── ejercicio-02.js
│   │   └── ...
│   ├── 📁 proyecto-1-form-validator/
│   │   ├── index.html
│   │   ├── styles.css
│   │   └── app.js
│   └── README.md
│
├── 📁 fase-2-closures/
│   ├── 📁 ejercicios/
│   │   ├── ejercicio-01.js
│   │   └── ...
│   ├── 📁 proyecto-2-todo-app/
│   │   ├── index.html
│   │   └── app.js
│   └── README.md
│
├── 📁 fase-3-this/
│   ├── 📁 ejercicios/
│   │   ├── ejercicio-01.js
│   │   └── ...
│   ├── 📁 proyecto-3-dashboard/
│   │   ├── index.html
│   │   └── app.js
│   └── README.md
│
├── 📁 fase-4-call-apply-bind/
│   ├── 📁 ejercicios/
│   │   ├── ejercicio-01.js
│   │   └── ...
│   └── 📁 proyecto-4-final-plugin-system/
│       ├── index.html
│       └── plugin-system.js
│       └── 📁 plugins/
│           ├── logger.js
│           ├── validator.js
│           └── cache.js
│
├── 📁 docs/
│   ├── apunte-maestro-fase4.md
│   ├── roadmap-javascript-avanzado.md
│   └── backup-tutor.md
│
└── README.md (este archivo)
```

---

## 🛠️ Tecnologías Utilizadas

### Core
- **JavaScript ES6+** - Lenguaje principal
- **HTML5** - Estructura de proyectos
- **CSS3** - Estilos y layouts

### Frameworks & Libraries
- **Bootstrap 5** - UI components y responsive design
- **No dependencies** - JavaScript vanilla para dominar fundamentos

### Herramientas de Desarrollo
- **VS Code** - Editor de código
- **Git & GitHub** - Control de versiones
- **Chrome DevTools** - Debugging y profiling

### Conceptos Aplicados
- Event-driven architecture
- Factory pattern
- Module pattern
- Decorator pattern
- Observer pattern
- Plugin architecture
- Dependency injection

---

## 🏆 Proyectos Destacados

### 1️⃣ Proyecto 1: Form Validator con Scope Modular
**Fase 1** | **Duración:** 2 días

Sistema de validación de formularios usando IIFE y Module Pattern para evitar contaminación del scope global.

**Conceptos aplicados:**
- IIFE (Immediately Invoked Function Expression)
- Closure para estado privado
- Namespace pattern
- Separation of concerns

**Tecnologías:** HTML, CSS, JavaScript, Bootstrap

[📁 Ver código](/fase-1-scope-context/proyecto-1-form-validator)

---

### 2️⃣ Proyecto 2: TODO App con Closures
**Fase 2** | **Duración:** 3 días

Aplicación de gestión de tareas usando factory functions y closures para manejar estado privado y memoization para optimizar filtros.

**Conceptos aplicados:**
- Factory functions
- Closures para encapsulación
- Memoization
- Observer pattern básico
- LocalStorage para persistencia

**Tecnologías:** HTML, CSS, JavaScript, Bootstrap

**Features:**
- ✅ Agregar, editar, eliminar tareas
- ✅ Filtros por estado (todas/completadas/pendientes)
- ✅ Búsqueda por texto
- ✅ Persistencia en localStorage
- ✅ Estadísticas en tiempo real

[📁 Ver código](/fase-2-closures/proyecto-2-todo-app)

---

### 3️⃣ Proyecto 3: Dashboard Interactivo
**Fase 3** | **Duración:** 3 días

Dashboard con múltiples widgets que manejan eventos, timers y código asíncrono, con control correcto de "this" en todos los contextos.

**Conceptos aplicados:**
- Constructor pattern
- Method binding con bind()
- Event delegation
- This en diferentes contextos
- setInterval y gestión de timers

**Widgets implementados:**
- 🕐 Reloj con actualización cada segundo
- 🔢 Contador con botones (+/-)
- 👤 Usuario con fetch de API
- ✅ Tareas con eventos dinámicos

**Tecnologías:** HTML, CSS, JavaScript, Bootstrap

[📁 Ver código](/fase-3-this/proyecto-3-dashboard)

---

### 4️⃣ PROYECTO FINAL: Sistema de Plugins
**Fase 4** | **Duración:** 3 días | ⭐ **DESTACADO**

Sistema extensible de plugins similar a WordPress, VS Code o Chrome Extensions. Permite agregar/quitar funcionalidad sin modificar el código core.

**Conceptos aplicados:**
- **TODAS las 4 fases integradas**
- Event-driven architecture
- Plugin architecture
- Dependency injection
- Lifecycle hooks
- Method borrowing
- Call/Apply/Bind para control de contexto
- Closures para estado privado

**Arquitectura:**
```
Core System (Plugin Manager)
    ↓
Event System (on/emit)
    ↓
Shared Utilities
    ↓
Plugins (Logger, Validator, Cache)
```

**Plugins implementados:**

1. **Logger Plugin** 📝
   - Registra todas las operaciones
   - Historial de ejecuciones
   - Logs en tiempo real

2. **Validator Plugin** ✅
   - Valida inputs antes de ejecutar
   - Bloquea ejecuciones inválidas
   - Mensajes de error descriptivos

3. **Cache Plugin** 💾
   - Memoization de resultados
   - Estadísticas de hits/misses
   - Optimización de performance

**Features del sistema:**
- ✅ Registro/desregistro dinámico de plugins
- ✅ Activación/desactivación desde UI
- ✅ Lifecycle hooks (onInstall, onActivate, onDeactivate, onUninstall)
- ✅ Event system para comunicación entre plugins
- ✅ API compartida para todos los plugins
- ✅ Logs del sistema en tiempo real
- ✅ Estadísticas de uso

**Tecnologías:** HTML, CSS, JavaScript (Vanilla)

[📁 Ver código](/proyecto-final-plugin-system) | [🎥 Ver demo](#)

---

## 📈 Progreso del Entrenamiento

### Estadísticas

| Métrica | Valor |
|---------|-------|
| **Fases completadas** | 4/4 ✅ |
| **Ejercicios resueltos** | ~30 ejercicios |
| **Proyectos completados** | 4 proyectos |
| **Líneas de código** | ~3,000+ líneas |
| **Duración total** | 4 semanas |
| **Horas invertidas** | ~80 horas |

### Timeline

```
Semana 1: Fase 1 (Scope & Context) + Proyecto 1
          ████████████░░░░░░░░░░░░░░░░ 

Semana 2: Fase 2 (Closures) + Proyecto 2
          ████████████████████░░░░░░░░

Semana 3: Fase 3 (This) + Proyecto 3
          ████████████████████████████

Semana 4: Fase 4 (Call/Apply/Bind) + Proyecto Final
          ████████████████████████████
```

---

## 💡 Conceptos Clave Aprendidos

### 🔑 Closures
```javascript
// Factory function con closure
function createCounter() {
    let count = 0;  // Privado (closure)
    
    return {
        increment: () => ++count,
        getCount: () => count
    };
}
```

### 🎯 This Binding
```javascript
// Problema clásico de "this"
const obj = {
    name: "Ana",
    greet: function() {
        setTimeout(function() {
            console.log(this.name);  // undefined
        }, 1000);
    }
};

// Solución con bind()
const obj = {
    name: "Ana",
    greet: function() {
        setTimeout(function() {
            console.log(this.name);  // "Ana"
        }.bind(this), 1000);
    }
};
```

### 🔧 Method Borrowing
```javascript
// Usar método de Array en array-like object
function suma() {
    const args = Array.prototype.slice.call(arguments);
    return args.reduce((a, b) => a + b);
}
```

### 🎨 Decorator Pattern
```javascript
function loggingDecorator(fn) {
    return function(...args) {
        console.log(`Llamando con: ${args}`);
        const result = fn.apply(this, args);
        console.log(`Resultado: ${result}`);
        return result;
    };
}
```

---

## 🚀 Cómo Ejecutar los Proyectos

### Requisitos Previos
- Navegador moderno (Chrome, Firefox, Edge)
- Editor de código (opcional, para ver/modificar código)

### Ejecución

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/javascript-avanzado.git
cd javascript-avanzado
```

2. **Navegar al proyecto deseado**
```bash
cd proyecto-final-plugin-system
```

3. **Abrir en el navegador**
```bash
# Opción 1: Abrir index.html directamente
open index.html

# Opción 2: Usar Live Server (VS Code)
# Click derecho en index.html > "Open with Live Server"

# Opción 3: Servidor simple con Python
python -m http.server 8000
# Abrir: http://localhost:8000
```

---

## 📚 Recursos y Documentación

### Apuntes y Guías
- [📘 Apunte Maestro - Fase 4](/docs/apunte-maestro-fase4.md)
- [🗺️ Roadmap Completo](/docs/roadmap-javascript-avanzado.md)
- [🧠 Perfil de Aprendizaje](/docs/backup-tutor.md)

### Referencias Utilizadas
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [You Don't Know JS](https://github.com/getify/You-Dont-Know-JS)

---

## 🎯 Próximos Pasos

### En Progreso
- [ ] Refactorización de proyectos con TypeScript
- [ ] Testing con Jest
- [ ] Documentación JSDoc completa

### Planeado
- [ ] Migrar proyecto final a React
- [ ] Backend con Node.js/Express
- [ ] Deploy de proyectos

---

## 🤝 Contribuciones

Este es un repositorio de aprendizaje personal, pero si encuentras errores o tienes sugerencias:

1. Abre un **Issue** describiendo el problema o sugerencia
2. Si quieres contribuir con código, abre un **Pull Request**

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👤 Autor

**[Tu Nombre]**

- 🌐 Portfolio: [everlizarraga.github.io](https://everlizarraga.github.io/)
- 🐙 GitHub: [@everlizarraga](https://github.com/everlizarraga)
- 📧 Email: rolank.utn@gmail.com

---

## ⭐ Agradecimientos

- A mi tutor/mentor (IA) por el diseño del programa de entrenamiento
- A la comunidad de JavaScript por los recursos compartidos
- A todos los que inspiran a seguir aprendiendo

---

<div align="center">

**⭐ Si este repositorio te fue útil, considera darle una estrella ⭐**

**Hecho con ❤️ y mucho ☕**

*Última actualización: Enero 2026*

</div>