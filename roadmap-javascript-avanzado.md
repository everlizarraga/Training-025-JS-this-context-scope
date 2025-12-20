# ROADMAP: JavaScript Avanzado - Scope, Closure, This, Call/Apply/Bind

## 📊 METADATA

**Objetivo:** Dominar a profundidad los conceptos fundamentales de JavaScript: Scope, Context, Closure, This, Call, Apply y Bind - desde cero hasta casos avanzados

**Tecnologías conocidas:** HTML, CSS, Bootstrap, JavaScript (intermedio)

**Horas diarias disponibles:** 3 horas

**Duración estimada total:** 3-4 semanas

**Fecha de inicio:** A definir

**Enfoque determinado:** Ejercicios progresivos + Proyectos integradores (Mix)

**Justificación del enfoque:** 
- Los conceptos son fundamentales de JavaScript (no requieren UI necesariamente)
- El estudiante aprende mejor haciendo (learning by doing)
- Ejercicios puros permiten aislar conceptos y practicarlos intensivamente
- Proyectos integradores al final de cada fase consolidan conocimiento en contexto real
- Mix de código puro + HTML cuando ayude a iluminar el concepto

**Número de fases:** 4 fases

**Justificación:** 
Los 6 conceptos tienen una dependencia lógica natural:
1. Scope/Context son la BASE (sin entender esto, el resto no tiene sentido)
2. Closure CONSTRUYE sobre Scope (usa scope para funcionar)
3. This CONSTRUYE sobre Context (necesita entender contextos de ejecución)
4. Call/Apply/Bind MANIPULAN This (son herramientas para controlar this)

Cada fase agrupa conceptos relacionados y construye sobre la anterior. No se pueden fusionar sin perder profundidad, ni dividir más sin romper la lógica.

---

## 🗺️ ESTRUCTURA COMPLETA DEL ENTRENAMIENTO

### FASE 1: Scope & Context (Fundamentos)
**Duración estimada:** 4-5 días  
**Objetivo de la fase:** Dominar cómo JavaScript maneja el alcance de variables y los contextos de ejecución. Entender la diferencia entre scope (dónde vive una variable) y context (a qué apunta "this").

#### Serie de Ejercicios Fase 1: Scope & Context
**Duración:** 6-8 horas (distribuido en 2-3 días)  
**Objetivo:** Practicar identificación de scopes, hoisting, scope chain, contextos de ejecución

**Ejercicios:**
1. **Scope Global vs Local** - Entender la diferencia entre var, let, const en diferentes scopes
2. **Hoisting Básico** - Predecir comportamiento de variables y funciones antes de su declaración
3. **Scope Chain** - Navegar la cadena de scopes para resolver variables
4. **Block Scope vs Function Scope** - Diferencias entre var (function scope) y let/const (block scope)
5. **Contexto de Ejecución Básico** - Entender qué es el execution context y cómo se crea
6. **Closure Preview** - Primer contacto con closures (preparación para Fase 2)

**Justificación de cantidad:** 6 ejercicios cubren todos los aspectos fundamentales de scope/context sin redundancia. Ejercicios 1-3 son conceptos básicos aislados, 4-5 son aplicación de conceptos, ejercicio 6 es puente a Fase 2.

**Distribución conceptual:**
- Ejercicios 1-2: Fundamentos de scope (var, let, const, hoisting)
- Ejercicios 3-4: Scope avanzado (scope chain, block vs function)
- Ejercicios 5-6: Contextos de ejecución y preparación para closures

---

#### Proyecto Integrador 1: Validador de Formulario con Scope Modular
**Duración:** 2 días máximo  
**Objetivo:** Construir un sistema de validación que use correctamente scopes para organizar código y evitar contaminación del scope global

**Cronograma:**
- **Día 1:** Setup HTML, estructura base con módulos, validadores individuales
- **Día 2:** Integración, manejo de errores, refinamiento

**Features mínimas (MVP):**
- Validar 3-4 campos (nombre, email, edad, contraseña)
- Mensajes de error específicos por campo
- Código organizado en módulos usando IIFE (Immediately Invoked Function Expression)
- Sin contaminar scope global
- Feedback visual básico (clases CSS para error/success)

**Patterns introducidos:**
- **Module Pattern (IIFE):** Encapsular código y crear scope privado
  - Qué es: Función que se ejecuta inmediatamente y retorna objeto público
  - Por qué: Evita contaminar scope global, crea "privacidad"
  - Dónde se usa: Librerías antiguas (jQuery plugins), código legacy, módulos antes de ES6

- **Namespace Pattern:** Organizar código relacionado bajo un objeto
  - Qué es: Agrupar funcionalidad relacionada en un único objeto
  - Por qué: Reduce colisiones de nombres, código más organizado
  - Dónde se usa: Apps grandes sin module bundlers, librerías como Lodash (_)

**Contexto de uso real:**
Este proyecto simula cómo se organizaba código JavaScript antes de ES6 modules. Aunque hoy usamos import/export, entender estos patterns te ayuda a:
- Leer código legacy
- Entender cómo funcionan librerías antiguas
- Apreciar por qué ES6 modules son mejores
- Dominar scope para evitar bugs sutiles

---

### FASE 2: Closures (Poder Oculto)
**Duración estimada:** 5-6 días  
**Objetivo de la fase:** Dominar closures desde lo básico hasta casos avanzados. Entender cómo las funciones "recuerdan" el scope donde fueron creadas y usar esto para crear datos privados, factories, memoization y más.

#### Serie de Ejercicios Fase 2: Closures
**Duración:** 8-10 horas (distribuido en 3-4 días)  
**Objetivo:** Practicar creación y uso de closures en diferentes contextos

**Ejercicios:**
1. **Closure Básico** - Función que retorna función y accede a variable externa
2. **Contador Privado** - Crear contador con métodos públicos y datos privados
3. **Factory Functions** - Crear múltiples instancias con estado independiente usando closures
4. **Loop y Closures (problema clásico)** - Entender el problema de closures en loops y cómo solucionarlo
5. **Partial Application** - Crear funciones pre-configuradas con algunos argumentos fijos
6. **Memoization Básica** - Cachear resultados de funciones costosas usando closures
7. **Decorators con Closures** - Envolver funciones para agregar funcionalidad extra

**Justificación de cantidad:** 7 ejercicios porque closures es un concepto denso con múltiples aplicaciones. Ejercicios 1-2 son fundamentos, 3-5 son aplicaciones prácticas comunes, 6-7 son patterns avanzados del mundo real.

**Distribución conceptual:**
- Ejercicios 1-2: Fundamentos de closures (qué son, cómo funcionan)
- Ejercicios 3-4: Aplicaciones comunes (factories, problema de loops)
- Ejercicios 5-7: Patterns avanzados (partial application, memoization, decorators)

**Contextos de uso introducidos desde ejercicio 3:**
- **Ejercicio 3:** React hooks usan factory pattern con closures internamente
- **Ejercicio 4:** Problema común en event listeners y async code
- **Ejercicio 5:** Librerías funcionales (Lodash, Ramda) usan partial application
- **Ejercicio 6:** React.useMemo() y React.useCallback() usan este concepto
- **Ejercicio 7:** Python decorators, middleware patterns

---

#### Proyecto Integrador 2: Sistema de Gestión de Tareas con Closures
**Duración:** 2-3 días máximo  
**Objetivo:** Construir un TODO app completo usando closures para manejar estado privado, factories para crear tareas, y memoization para optimizar filtros

**Cronograma:**
- **Día 1:** HTML/UI básico, factory de tareas con closures, agregar/eliminar tareas
- **Día 2:** Filtros (todas/completadas/pendientes), búsqueda, persistencia en localStorage
- **Día 3:** Memoization de filtros, estadísticas, refinamiento

**Features mínimas (MVP):**
- Agregar tarea con título y descripción
- Marcar como completada
- Eliminar tarea
- Filtrar por estado (todas/completadas/pendientes)
- Persistir en localStorage
- Búsqueda por texto
- Estadísticas (total, completadas, pendientes)

**Patterns introducidos:**
- **Factory Pattern con Closures:** Crear objetos con datos privados
- **Module Pattern Avanzado:** Organizar toda la app en módulos
- **Memoization:** Cachear resultados de filtros costosos
- **Observer/PubSub Básico:** Notificar cambios entre módulos

**Contexto de uso real:**
Este proyecto usa patterns que verás en:
- **Redux:** State management con closures
- **React:** Custom hooks son closures que retornan estado
- **Vue:** Computed properties con memoization
- **Frameworks modernos:** Reactivity systems usan closures intensivamente

Este es exactamente cómo se manejaba estado complejo antes de frameworks. Entender esto te da superpoderes para:
- Debuggear código complejo
- Crear abstracciones propias
- Entender cómo funcionan los frameworks por dentro

---

### FASE 3: This (El Concepto Más Confuso)
**Duración estimada:** 5-6 días  
**Objetivo de la fase:** Dominar "this" en todos sus contextos: funciones regulares, métodos de objetos, constructores, arrow functions, event listeners, strict mode. Entender las 4 reglas de binding de "this".

#### Serie de Ejercicios Fase 3: This
**Duración:** 8-10 horas (distribuido en 3-4 días)  
**Objetivo:** Practicar identificación y control de "this" en diferentes contextos

**Ejercicios:**
1. **This en Métodos de Objetos** - Entender this en contexto de objetos literales
2. **This en Funciones Regulares** - Diferencia entre strict mode y non-strict mode
3. **This en Constructores** - Cómo "new" afecta a "this"
4. **Arrow Functions y This** - Por qué arrow functions NO tienen su propio "this"
5. **This en Event Listeners** - El problema clásico de perder "this" en callbacks (con HTML)
6. **This en Callbacks y Timers** - setTimeout/setInterval y pérdida de contexto
7. **Las 4 Reglas de Binding** - Ejercicio integrador que combina: implicit, explicit, new, window binding

**Justificación de cantidad:** 7 ejercicios porque "this" tiene múltiples contextos que deben practicarse por separado. Cada ejercicio cubre un caso específico donde "this" se comporta diferente. Ejercicio 7 integra todo.

**Distribución conceptual:**
- Ejercicios 1-3: Contextos básicos (objetos, funciones, constructores)
- Ejercicios 4-6: Casos problemáticos (arrow functions, eventos, async)
- Ejercicio 7: Integración de las 4 reglas de binding

**Contextos de uso introducidos:**
- **Ejercicio 4:** React components (por qué arrow functions en class components)
- **Ejercicio 5:** Event handling en vanilla JS y frameworks
- **Ejercicio 6:** Async code, animaciones, polling
- **Ejercicio 7:** Debugging de "this" en apps complejas

**Casos edge introducidos progresivamente:**
- Strict mode vs non-strict mode
- Arrow functions heredando "this" del scope padre
- "this" en nested functions
- "this" perdido en callbacks pasados a otras funciones

---

#### Proyecto Integrador 3: Dashboard Interactivo con Manejo Correcto de This
**Duración:** 2-3 días máximo  
**Objetivo:** Construir un dashboard con múltiples widgets que manejen eventos, timers y async code, manejando "this" correctamente en todos los contextos

**Cronograma:**
- **Día 1:** HTML/UI del dashboard, clase Widget base, 2 widgets simples (reloj, contador)
- **Día 2:** Widgets con eventos (botones, inputs), widget con fetch/API
- **Día 3:** Integración, comunicación entre widgets, refinamiento

**Features mínimas (MVP):**
- Widget de Reloj (actualización cada segundo con setInterval)
- Widget de Contador (botones +/- con event listeners)
- Widget de Usuario (fetch de API, mostrar info)
- Widget de Tareas (crear/completar tareas con eventos)
- Dashboard que gestiona todos los widgets
- Cada widget es una clase/constructor con métodos que usan "this" correctamente

**Patterns introducidos:**
- **Constructor Pattern:** Crear instancias con "new"
- **Method Binding:** Técnicas para preservar "this" en callbacks
- **Event Delegation:** Manejar eventos eficientemente
- **Prototype Methods:** Métodos compartidos entre instancias

**Contexto de uso real:**
Este proyecto simula arquitectura de componentes similar a:
- **React Class Components:** Antes de hooks, así se manejaba "this"
- **Vue Components:** Usan "this" para acceder a data y methods
- **jQuery Plugins:** Patrón clásico con "this" apuntando al elemento
- **Vanilla JS Apps:** Organización con classes y manejo de eventos

Vas a enfrentar y resolver los problemas MÁS comunes de "this":
- Event listeners que pierden contexto
- Callbacks en timers
- Métodos pasados como callbacks
- Arrow functions vs regular functions

Dominar esto te hace inmune a 80% de bugs relacionados con "this".

---

### FASE 4: Call, Apply, Bind (Control Total)
**Duración estimada:** 4-5 días  
**Objetivo de la fase:** Dominar las 3 herramientas para controlar explícitamente "this": call, apply y bind. Entender cuándo usar cada una, method borrowing, currying, decorators y otros patterns avanzados.

#### Serie de Ejercicios Fase 4: Call, Apply, Bind
**Duración:** 6-8 horas (distribuido en 2-3 días)  
**Objetivo:** Practicar uso de call/apply/bind en diferentes escenarios

**Ejercicios:**
1. **Call Básico** - Invocar función con "this" específico usando call()
2. **Apply Básico** - Diferencia entre call y apply (argumentos array vs separados)
3. **Bind Básico** - Crear función con "this" pre-fijado usando bind()
4. **Method Borrowing** - Usar métodos de un objeto en otro con call/apply
5. **Currying con Bind** - Crear funciones parcialmente aplicadas
6. **Decorators y Wrappers** - Envolver funciones preservando "this" y argumentos
7. **Ejercicio Integrador** - Combinar closures + this + call/apply/bind en un sistema complejo

**Justificación de cantidad:** 6 ejercicios porque call/apply/bind son herramientas específicas con menos variantes que "this" o closures. Ejercicios 1-3 son fundamentos de cada método, 4-6 son aplicaciones prácticas avanzadas.

**Distribución conceptual:**
- Ejercicios 1-3: Fundamentos (call, apply, bind por separado)
- Ejercicios 4-5: Aplicaciones prácticas (method borrowing, currying)
- Ejercicio 6-7: Patterns avanzados (decorators, integración total)

**Contextos de uso introducidos:**
- **Ejercicio 4:** Array methods borrowing (Array.prototype.slice.call(arguments))
- **Ejercicio 5:** Partial application pattern (usado en librerías funcionales)
- **Ejercicio 6:** Logging, timing, caching decorators (AOP - Aspect Oriented Programming)
- **Ejercicio 7:** Cómo frameworks usan estos métodos internamente

**Casos de uso real:**
- **React:** bind en class components para event handlers
- **Node.js:** Cambiar contexto de "this" en middleware
- **Testing:** Spies y mocks usando call/apply
- **Functional Programming:** Compose, pipe, partial application
- **Vanilla JS:** Convertir NodeList a Array con Array.from() (usa call internamente)

---

#### Proyecto Integrador Final: Sistema de Plugins con API Extensible
**Duración:** 3 días máximo  
**Objetivo:** Construir un sistema de plugins donde terceros puedan extender funcionalidad, usando call/apply/bind para controlar contextos, method borrowing para compartir funcionalidad, y toda la potencia de closures + this combinados.

**Cronograma:**
- **Día 1:** Core del sistema, API de plugins, registro y lifecycle
- **Día 2:** 3 plugins de ejemplo (Logger, Validator, Cache), comunicación entre plugins
- **Día 3:** Plugin manager UI, instalación/desinstalación dinámica, demo completo

**Features mínimas (MVP):**
- Sistema Core que gestiona plugins
- API para registrar/desregistrar plugins
- Lifecycle hooks: onInstall, onActivate, onDeactivate
- Shared utilities accesibles por todos los plugins vía "this"
- 3 plugins funcionales:
  - **Logger Plugin:** Intercepta métodos y loggea calls
  - **Validator Plugin:** Valida inputs automáticamente
  - **Cache Plugin:** Memoiza resultados de métodos costosos
- UI simple para activar/desactivar plugins
- Comunicación entre plugins vía event system

**Patterns introducidos:**
- **Plugin Architecture:** Sistema extensible con API pública
- **Decorator Pattern Avanzado:** Wrapear métodos automáticamente
- **Method Borrowing:** Compartir utilidades entre plugins
- **Mixin Pattern:** Inyectar funcionalidad en objetos
- **Proxy Pattern (básico):** Interceptar acceso a propiedades/métodos

**Conceptos aplicados (TODOS los de las 4 fases):**
- **Scope/Context:** Módulos aislados, evitar colisiones
- **Closures:** Estado privado de cada plugin, factories de plugins
- **This:** Contexto correcto en métodos de plugins y core
- **Call/Apply/Bind:** Controlar "this" al ejecutar hooks, method borrowing

**Contexto de uso real:**
Este proyecto es similar a:
- **WordPress Plugins:** Sistema de hooks y filtros
- **Express Middleware:** Chain de funciones con contexto compartido
- **jQuery Plugins:** Extender funcionalidad base
- **Browser Extensions:** API limitada para extensiones
- **Webpack Plugins:** Tap into build lifecycle

Vas a implementar patterns que usan profesionalmente:
- **Dependency Injection:** Core inyecta dependencias a plugins
- **Inversion of Control:** Plugins llaman a Core, no al revés
- **Event-Driven Architecture:** Comunicación desacoplada
- **Aspect-Oriented Programming:** Interceptar ejecución sin modificar código original

Este proyecto final es el **BOSS FIGHT**. Si lo completás correctamente, tenés nivel senior en estos conceptos.

---

## 🎯 RESUMEN DE PATTERNS POR FASE

### Fase 1: Scope & Context
- **Module Pattern (IIFE):** Encapsulación y scope privado
- **Namespace Pattern:** Organización de código
- **Introducción:** Conceptos base antes de patterns complejos

### Fase 2: Closures
- **Factory Pattern:** Crear objetos con datos privados
- **Partial Application:** Funciones pre-configuradas
- **Memoization:** Optimización con caché
- **Decorator Pattern (básico):** Envolver funciones

### Fase 3: This
- **Constructor Pattern:** Instancias con "new"
- **Method Binding:** Preservar "this" en callbacks
- **Event Delegation:** Eventos eficientes
- **Prototype Methods:** Compartir métodos entre instancias

### Fase 4: Call/Apply/Bind
- **Method Borrowing:** Usar métodos de otros objetos
- **Currying:** Aplicación parcial de argumentos
- **Decorator Pattern (avanzado):** Wrappers con call/apply
- **Plugin Architecture:** Sistemas extensibles
- **Mixin Pattern:** Inyectar funcionalidad

---

## ⏱️ TIMELINE GLOBAL

**Semanas 1:** Fase 1 (4-5 días) + inicio Fase 2  
**Semanas 2:** Fase 2 completa (5-6 días)  
**Semanas 3:** Fase 3 completa (5-6 días)  
**Semanas 4:** Fase 4 completa (4-5 días)  

**Total estimado:** 3-4 semanas

**Breakdown detallado:**

| Fase | Ejercicios | Proyecto | Total | Días |
|------|-----------|----------|-------|------|
| 1 | 6-8 hrs | 6 hrs | 12-14 hrs | 4-5 |
| 2 | 8-10 hrs | 6-9 hrs | 14-19 hrs | 5-6 |
| 3 | 8-10 hrs | 6-9 hrs | 14-19 hrs | 5-6 |
| 4 | 6-8 hrs | 9 hrs | 15-17 hrs | 4-5 |

**Total: 55-69 horas → ~19-23 días con 3 hrs/día**

---

## 📈 PROGRESIÓN DE DIFICULTAD

```
Complejidad
    ↑
    │                                    ┌─── Proyecto Final
    │                               ┌────┤    (Plugin System)
    │                          ┌────┤    │
    │                     ┌────┤    │    │
    │                ┌────┤    │    │    │
    │           ┌────┤    │    │    │    │
    │      ┌────┤    │    │    │    │    │
    │ ┌────┤    │    │    │    │    │    │
    └─┴────┴────┴────┴────┴────┴────┴────┴──→ Tiempo
      F1   F1   F2   F2   F3   F3   F4   F4
      Ej   Proy Ej   Proy Ej   Proy Ej   Proy
```

**Leyenda:**
- **F1:** Fase 1 (Scope/Context) - Base fundamental
- **F2:** Fase 2 (Closures) - Primera subida de complejidad
- **F3:** Fase 3 (This) - Conceptos tricky
- **F4:** Fase 4 (Call/Apply/Bind) + Integración total

**Cada fase incrementa:**
- Cantidad de conceptos que se combinan
- Profundidad de entendimiento requerido
- Complejidad de los ejercicios
- Casos edge considerados
- Aplicación práctica en contextos reales

---

## 🎓 APRENDIZAJES CLAVE POR FASE

### Al completar Fase 1 sabrás:
- ✅ Cómo JavaScript resuelve variables (scope chain)
- ✅ Diferencia entre var, let, const (scope funcional vs block)
- ✅ Qué es hoisting y cómo evitar bugs
- ✅ Qué es el execution context
- ✅ Cómo organizar código sin contaminar scope global
- ✅ Por qué existen los módulos ES6

### Al completar Fase 2 sabrás:
- ✅ Qué son closures y cómo funcionan internamente
- ✅ Crear datos privados sin clases
- ✅ Implementar factory functions
- ✅ Resolver el problema clásico de closures en loops
- ✅ Implementar memoization para optimizar performance
- ✅ Crear decorators para agregar funcionalidad
- ✅ Cómo funcionan los hooks de React por dentro

### Al completar Fase 3 sabrás:
- ✅ Las 4 reglas de binding de "this"
- ✅ Por qué "this" es diferente en arrow functions
- ✅ Cómo manejar "this" en event listeners
- ✅ Diferencia entre strict mode y non-strict mode
- ✅ Cómo evitar perder "this" en callbacks
- ✅ Por qué React class components necesitaban bind
- ✅ Debuggear problemas de "this" rápidamente

### Al completar Fase 4 sabrás:
- ✅ Diferencia entre call, apply y bind
- ✅ Cuándo usar cada uno apropiadamente
- ✅ Implementar method borrowing
- ✅ Crear funciones curried y parcialmente aplicadas
- ✅ Implementar decorators profesionales
- ✅ Construir sistemas extensibles con plugins
- ✅ Cómo funcionan los frameworks por dentro
- ✅ **DOMINIO TOTAL de scope, closures, this, call/apply/bind**

---

## 💡 CONSEJOS PARA EL ENTRENAMIENTO

### Governor aplicado:
- **Ejercicios:** Máximo 30 min cada uno. Si te trabás >15 min → ver hints
- **Proyectos:** Respetar días máximos. Funcional > perfecto
- **Iteraciones:** Máximo 2 por ejercicio/proyecto → después NEXT
- **80/20:** Primera versión 80% → suficiente para avanzar

### Cómo estudiar efectivamente:
1. **Leer ejemplo resuelto** antes de intentar el ejercicio
2. **Entender el "por qué"** no solo el "cómo"
3. **Escribir el código tú mismo** (no copy/paste del ejemplo)
4. **Probar casos edge** además del caso principal
5. **Explicártelo a vos mismo** en voz alta (Rubber Duck Debugging)

### Si te trabás:
1. Releer el ejemplo resuelto con más atención
2. Dibujar un diagrama del flujo/scope
3. Usar console.log() estratégicamente
4. Ver Hint 1 (si >15 min)
5. Ver Hint 2 (si >25 min)
6. Preguntar (si >30 min)

### Reconocimiento de logros:
Al completar cada fase, celebrá:
- ✅ Fase completada = progreso objetivo
- ✅ Cada ejercicio = concepto dominado
- ✅ Cada proyecto = aplicación real

**No minimices tus logros.** Estos conceptos son considerados **avanzados** incluso por devs con años de experiencia.

---

## 📝 NOTAS IMPORTANTES

### Sobre los ejercicios:
- Los primeros 2-3 de cada fase son código puro (consola/Node)
- Los siguientes pueden incluir HTML cuando ayude a iluminar el concepto
- Todos tienen ejemplo resuelto comentado línea por línea
- Contexto de uso real desde ejercicio 3 en adelante
- Hints son conceptuales, NO código completo

### Sobre los proyectos:
- HTML/CSS se provee completo (solo copiás y pegás)
- Te enfocás en el JavaScript
- MVP definido claramente (features mínimas)
- Patterns señalados explícitamente
- Conexión con mundo real explicada

### Sobre la flexibilidad:
- Si necesitás más ejercicios en algún tema → pedís
- Si algo no queda claro → preguntás
- Si querés saltar algo (porque ya lo dominás) → avisás y validamos
- Si querés más profundidad en algo específico → ajustamos

### Sobre el Knowledge Base:
- Este roadmap es la estructura COMPLETA del entrenamiento
- En nuevos chats, referenciá: "Fase X - Ejercicio Y" o "Fase X - Proyecto"
- El roadmap NO se modifica, es referencia estática
- Para tracking de progreso personal, usá herramienta externa (checklist, Notion, etc.)

---

## 🎯 OBJETIVO FINAL

Al completar este entrenamiento vas a:

✅ Dominar scope, closures, this, call/apply/bind **a nivel senior**  
✅ Leer código complejo y entender qué pasa con "this" inmediatamente  
✅ Implementar patterns avanzados usados en la industria  
✅ Debuggear problemas de scope/this en minutos (no horas)  
✅ Entender cómo funcionan frameworks como React, Vue por dentro  
✅ Escribir código más limpio y organizado  
✅ Tener los "superpoderes" que mencionaste  

**Nivel esperado al final:** Mid-Senior en estos conceptos específicos.

**Estos conceptos son fundamentales y te van a acompañar toda tu carrera como dev.**

---

## 🚀 PRÓXIMOS PASOS

1. **Revisá este roadmap completo**
2. **Guardalo en el Knowledge Base del proyecto**
3. **Avisame cuando estés listo para empezar**
4. **Comenzaremos con Fase 1 - Serie de Ejercicios**

---

FIN DEL ROADMAP

**Versión:** 1.0  
**Fecha de creación:** Diciembre 2025  
**Optimizado para:** Estudiante con perfil cognitivo sistémico, learning by doing  
**Formato:** 4 fases progresivas, 26 ejercicios totales, 4 proyectos integradores  
**Duración:** 3-4 semanas con 3 horas/día
