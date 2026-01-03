# 🖥️ PROYECTO 3: Dashboard Interactivo con Manejo Correcto de This

**Duración:** 2-3 días máximo  
**Objetivo:** Construir un dashboard con múltiples widgets que manejen eventos, timers y async code, manejando "this" correctamente en todos los contextos

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Un dashboard modular con 4 widgets independientes:

```
┌──────────────────────────────────────────────────┐
│                 📊 DASHBOARD                     │
├─────────────────────┬────────────────────────────┤
│                     │                            │
│   🕐 RELOJ          │   🔢 CONTADOR              │
│   Actualiza cada 1s │   Botones +/-              │
│                     │   Reset                    │
│                     │                            │
├─────────────────────┼────────────────────────────┤
│                     │                            │
│   👤 USUARIO        │   ✅ TAREAS                │
│   Fetch de API      │   Agregar/Completar        │
│   Mostrar info      │   Lista interactiva        │
│                     │                            │
└─────────────────────┴────────────────────────────┘
```

---

## ✅ FEATURES MÍNIMAS (MVP)

### Must Have:

**Widget de Reloj:**
- [x] Mostrar hora actual (HH:MM:SS)
- [x] Actualizar cada segundo con setInterval
- [x] Botón Start/Stop
- [x] Manejo correcto de "this" en setInterval

**Widget de Contador:**
- [x] Mostrar contador numérico
- [x] Botones: Incrementar (+1), Decrementar (-1), Reset
- [x] Event listeners que mantengan "this" del widget
- [x] Validación (no valores negativos)

**Widget de Usuario:**
- [x] Botón para cargar usuario random
- [x] Fetch a API: https://randomuser.me/api/
- [x] Mostrar: nombre, email, foto
- [x] Manejo de "this" en callbacks async
- [x] Estado de carga y errores

**Widget de Tareas:**
- [x] Input para agregar tarea
- [x] Lista de tareas
- [x] Marcar como completada (click)
- [x] Eliminar tarea
- [x] Event delegation para manejar clicks
- [x] "this" correcto en todos los handlers

**Dashboard Manager:**
- [x] Inicializar todos los widgets
- [x] Coordinar entre widgets (opcional)

### Nice to Have (si sobra tiempo):
- [ ] Persistencia en localStorage
- [ ] Animaciones CSS
- [ ] Widget de clima (otra API)
- [ ] Temas claro/oscuro

**IMPORTANTE:** Hacé solo Must Have primero. Nice to Have solo si terminás antes y tenés tiempo.

---

## 🎯 PATTERNS QUE VAS A APRENDER

### PATTERN 1: Constructor Pattern

**Qué es:** Crear múltiples instancias de objetos con `new`

**Por qué:** Cada widget es una instancia independiente con su propio estado

**Dónde lo ves:**
```javascript
function WidgetReloj(contenedorId) {
    this.contenedor = document.getElementById(contenedorId);
    this.intervalo = null;
}

const reloj1 = new WidgetReloj('reloj-1');
const reloj2 = new WidgetReloj('reloj-2');  // Otra instancia independiente
```

**Analogía:** Como una fábrica de widgets. Cada `new` crea un widget nuevo con sus propios datos.

---

### PATTERN 2: Method Binding

**Qué es:** Técnicas para preservar "this" en callbacks

**Por qué:** Los callbacks pierden el contexto del objeto

**Dónde lo ves:**
```javascript
// ❌ PROBLEMA: Pierde "this"
this.boton.addEventListener('click', this.incrementar);

// ✅ SOLUCIÓN 1: Arrow function wrapper
this.boton.addEventListener('click', () => {
    this.incrementar();
});

// ✅ SOLUCIÓN 2: Bind en constructor
this.incrementar = this.incrementar.bind(this);
this.boton.addEventListener('click', this.incrementar);
```

**Analogía:** Como darle una tarjeta de identidad permanente a la función.

---

### PATTERN 3: Event Delegation

**Qué es:** Un solo event listener para múltiples elementos dinámicos

**Por qué:** Más eficiente, funciona con elementos que se agregan después

**Dónde lo ves:**
```javascript
// En vez de agregar listener a cada tarea:
this.lista.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-completar')) {
        // Manejar completar
    }
    if (e.target.classList.contains('btn-eliminar')) {
        // Manejar eliminar
    }
});
```

**Analogía:** Como un recepcionista que maneja todas las llamadas, en vez de tener un teléfono por persona.

---

### PATTERN 4: Prototype Methods

**Qué es:** Métodos compartidos entre todas las instancias

**Por qué:** Más eficiente en memoria (un método para todas las instancias)

**Dónde lo ves:**
```javascript
function WidgetReloj(contenedorId) {
    this.contenedor = document.getElementById(contenedorId);
}

// Método en el prototype (compartido)
WidgetReloj.prototype.iniciar = function() {
    // Todas las instancias usan este mismo método
};
```

**Analogía:** Como un manual de instrucciones compartido por todos los widgets del mismo tipo.

---

## 🗂️ ESTRUCTURA DEL PROYECTO

### Archivos necesarios:

```
proyecto-3-dashboard/
├── index.html          (HTML + CSS inline)
└── dashboard.js        (Todo tu JavaScript)
```

---

## 📄 HTML + CSS BASE

**index.html** (Copiá y pegá completo):

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard Interactivo</title>
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
            padding: 20px;
        }

        .dashboard {
            max-width: 1200px;
            margin: 0 auto;
        }

        .dashboard-header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }

        .dashboard-header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }

        .dashboard-header p {
            font-size: 1rem;
            opacity: 0.9;
        }

        .widgets-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }

        .widget {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transition: transform 0.3s ease;
        }

        .widget:hover {
            transform: translateY(-5px);
        }

        .widget-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #f0f0f0;
        }

        .widget-icon {
            font-size: 2rem;
            margin-right: 15px;
        }

        .widget-title {
            font-size: 1.3rem;
            font-weight: 600;
            color: #333;
        }

        .widget-content {
            min-height: 150px;
        }

        /* Widget Reloj */
        .reloj-display {
            font-size: 3rem;
            font-weight: bold;
            text-align: center;
            color: #667eea;
            margin: 20px 0;
            font-family: 'Courier New', monospace;
        }

        /* Widget Contador */
        .contador-display {
            font-size: 4rem;
            font-weight: bold;
            text-align: center;
            color: #764ba2;
            margin: 20px 0;
        }

        .contador-controls {
            display: flex;
            gap: 10px;
            justify-content: center;
        }

        /* Widget Usuario */
        .usuario-card {
            text-align: center;
        }

        .usuario-avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: 15px auto;
            border: 4px solid #667eea;
        }

        .usuario-info {
            margin-top: 15px;
        }

        .usuario-info p {
            margin: 8px 0;
            color: #555;
        }

        .loading {
            text-align: center;
            color: #999;
            font-style: italic;
        }

        .error {
            text-align: center;
            color: #e74c3c;
            padding: 15px;
            background: #ffe6e6;
            border-radius: 8px;
        }

        /* Widget Tareas */
        .tareas-input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }

        .tareas-input-group input {
            flex: 1;
        }

        .tareas-lista {
            list-style: none;
            max-height: 300px;
            overflow-y: auto;
        }

        .tarea-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px;
            margin-bottom: 8px;
            background: #f8f9fa;
            border-radius: 8px;
            transition: all 0.3s ease;
        }

        .tarea-item:hover {
            background: #e9ecef;
        }

        .tarea-item.completada {
            opacity: 0.6;
        }

        .tarea-item.completada .tarea-texto {
            text-decoration: line-through;
            color: #999;
        }

        .tarea-texto {
            flex: 1;
            cursor: pointer;
        }

        .tarea-actions {
            display: flex;
            gap: 8px;
        }

        /* Botones */
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .btn:active {
            transform: translateY(0);
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-primary:hover {
            background: #5568d3;
        }

        .btn-success {
            background: #51cf66;
            color: white;
        }

        .btn-success:hover {
            background: #40c057;
        }

        .btn-danger {
            background: #ff6b6b;
            color: white;
        }

        .btn-danger:hover {
            background: #fa5252;
        }

        .btn-secondary {
            background: #868e96;
            color: white;
        }

        .btn-secondary:hover {
            background: #6c757d;
        }

        .btn-sm {
            padding: 6px 12px;
            font-size: 0.85rem;
        }

        input[type="text"] {
            padding: 10px 15px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }

        input[type="text"]:focus {
            outline: none;
            border-color: #667eea;
        }

        /* Estados vacíos */
        .empty-state {
            text-align: center;
            color: #999;
            padding: 30px;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <!-- Header -->
        <div class="dashboard-header">
            <h1>📊 Dashboard Interactivo</h1>
            <p>Proyecto 3 - Manejo de "this" en JavaScript</p>
        </div>

        <!-- Grid de Widgets -->
        <div class="widgets-grid">
            <!-- Widget 1: Reloj -->
            <div class="widget">
                <div class="widget-header">
                    <span class="widget-icon">🕐</span>
                    <h2 class="widget-title">Reloj</h2>
                </div>
                <div class="widget-content" id="widget-reloj">
                    <!-- Contenido dinámico -->
                </div>
            </div>

            <!-- Widget 2: Contador -->
            <div class="widget">
                <div class="widget-header">
                    <span class="widget-icon">🔢</span>
                    <h2 class="widget-title">Contador</h2>
                </div>
                <div class="widget-content" id="widget-contador">
                    <!-- Contenido dinámico -->
                </div>
            </div>

            <!-- Widget 3: Usuario -->
            <div class="widget">
                <div class="widget-header">
                    <span class="widget-icon">👤</span>
                    <h2 class="widget-title">Usuario Random</h2>
                </div>
                <div class="widget-content" id="widget-usuario">
                    <!-- Contenido dinámico -->
                </div>
            </div>

            <!-- Widget 4: Tareas -->
            <div class="widget">
                <div class="widget-header">
                    <span class="widget-icon">✅</span>
                    <h2 class="widget-title">Mis Tareas</h2>
                </div>
                <div class="widget-content" id="widget-tareas">
                    <!-- Contenido dinámico -->
                </div>
            </div>
        </div>
    </div>

    <script src="dashboard.js"></script>
</body>
</html>
```

---

## 📅 CRONOGRAMA DÍA POR DÍA

### 📆 DÍA 1: Setup + Widgets Base (Reloj y Contador)

**Objetivo:** Estructura base funcionando + 2 widgets simples

**Tareas:**
1. [ ] Crear archivo `dashboard.js`
2. [ ] Crear constructor `WidgetReloj`
   - [ ] Renderizar HTML inicial
   - [ ] Método `iniciar()` con setInterval
   - [ ] Método `detener()`
   - [ ] Botones Start/Stop
3. [ ] Crear constructor `WidgetContador`
   - [ ] Renderizar HTML inicial
   - [ ] Métodos: incrementar, decrementar, reset
   - [ ] Event listeners con "this" correcto
4. [ ] Crear `Dashboard` manager
   - [ ] Inicializar ambos widgets

**Checkpoint Día 1:**
- [ ] Reloj funciona y se puede start/stop
- [ ] Contador funciona con los 3 botones
- [ ] NO hay errores en consola
- [ ] "this" funciona correctamente (testeado con console.log)

**Tiempo estimado:** 3-4 horas

---

### 📆 DÍA 2: Widgets con Async (Usuario y Tareas)

**Objetivo:** Agregar fetch API + manejo de eventos complejos

**Tareas:**
1. [ ] Crear constructor `WidgetUsuario`
   - [ ] Renderizar HTML inicial (botón + placeholder)
   - [ ] Método `cargarUsuario()` con fetch
   - [ ] Método `renderizarUsuario(datos)`
   - [ ] Manejo de estados: loading, error, success
   - [ ] "this" correcto en callbacks async
2. [ ] Crear constructor `WidgetTareas`
   - [ ] Renderizar HTML inicial (input + lista)
   - [ ] Método `agregarTarea(texto)`
   - [ ] Método `completarTarea(id)`
   - [ ] Método `eliminarTarea(id)`
   - [ ] Event delegation para clicks en lista
   - [ ] "this" correcto en todos los handlers
3. [ ] Integrar en `Dashboard`

**Checkpoint Día 2:**
- [ ] Usuario carga desde API correctamente
- [ ] Tareas se pueden agregar/completar/eliminar
- [ ] Event delegation funciona
- [ ] "this" se mantiene en callbacks async
- [ ] Manejo de errores funcional

**Tiempo estimado:** 3-4 horas

---

### 📆 DÍA 3: Integración + Refinamiento (OPCIONAL)

**Objetivo:** Pulir detalles y agregar Nice to Have si hay tiempo

**Tareas opcionales:**
- [ ] localStorage para persistir contador y tareas
- [ ] Comunicación entre widgets (EventBus opcional)
- [ ] Animaciones CSS suaves
- [ ] Validaciones adicionales
- [ ] Widget extra (clima, etc.)

**SI NO HAY TIEMPO:** Saltear este día y pasar directo a Fase 4.

**Tiempo estimado:** 2-3 horas

---

## 🏗️ ESTRUCTURA BASE DE CÓDIGO

### **dashboard.js** - Estructura inicial

```javascript
// ============================================
// WIDGET RELOJ
// ============================================

/**
 * Constructor para Widget de Reloj
 * @param {string} contenedorId - ID del elemento contenedor
 */
function WidgetReloj(contenedorId) {
    // Guardar referencia al contenedor
    this.contenedor = document.getElementById(contenedorId);
    
    // Estado del widget
    this.intervalo = null;
    this.corriendo = false;
    
    // Inicializar UI
    this.renderizarUI();
    
    // Configurar eventos
    this.configurarEventos();
}

/**
 * Renderiza el HTML inicial del widget
 */
WidgetReloj.prototype.renderizarUI = function() {
    this.contenedor.innerHTML = `
        <div class="reloj-display" id="reloj-display">00:00:00</div>
        <div style="display: flex; gap: 10px; justify-content: center;">
            <button class="btn btn-success" id="reloj-btn-iniciar">Iniciar</button>
            <button class="btn btn-danger" id="reloj-btn-detener">Detener</button>
        </div>
    `;
    
    // Guardar referencias a elementos
    this.displayElement = document.getElementById('reloj-display');
    this.btnIniciar = document.getElementById('reloj-btn-iniciar');
    this.btnDetener = document.getElementById('reloj-btn-detener');
};

/**
 * Configura los event listeners
 */
WidgetReloj.prototype.configurarEventos = function() {
    // ============================================
    // ⚠️ IMPORTANTE: Manejo correcto de "this"
    // ============================================
    
    // ❌ INCORRECTO: Esto perdería "this"
    // this.btnIniciar.addEventListener('click', this.iniciar);
    
    // ✅ CORRECTO: Arrow function mantiene "this"
    this.btnIniciar.addEventListener('click', () => {
        this.iniciar();
    });
    
    this.btnDetener.addEventListener('click', () => {
        this.detener();
    });
};

/**
 * Inicia el reloj
 */
WidgetReloj.prototype.iniciar = function() {
    // Si ya está corriendo, no hacer nada
    if (this.corriendo) return;
    
    console.log('Iniciando reloj...');
    this.corriendo = true;
    
    // ============================================
    // ⚠️ IMPORTANTE: Guardar referencia del setInterval
    // ============================================
    
    // Actualizar inmediatamente
    this.actualizarHora();
    
    // ✅ Arrow function para mantener "this"
    this.intervalo = setInterval(() => {
        this.actualizarHora();
    }, 1000);
};

/**
 * Detiene el reloj
 */
WidgetReloj.prototype.detener = function() {
    if (!this.corriendo) return;
    
    console.log('Deteniendo reloj...');
    
    // ✅ Limpiar intervalo usando la referencia guardada
    clearInterval(this.intervalo);
    this.intervalo = null;
    this.corriendo = false;
};

/**
 * Actualiza la hora mostrada
 */
WidgetReloj.prototype.actualizarHora = function() {
    const ahora = new Date();
    
    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const segundos = String(ahora.getSeconds()).padStart(2, '0');
    
    const horaFormateada = `${horas}:${minutos}:${segundos}`;
    
    this.displayElement.textContent = horaFormateada;
};


// ============================================
// WIDGET CONTADOR
// ============================================

/**
 * Constructor para Widget de Contador
 * @param {string} contenedorId - ID del elemento contenedor
 */
function WidgetContador(contenedorId) {
    // TU CÓDIGO AQUÍ
    // 1. Guardar referencia al contenedor
    // 2. Estado inicial: cuenta = 0
    // 3. Renderizar UI
    // 4. Configurar eventos
}

WidgetContador.prototype.renderizarUI = function() {
    // TU CÓDIGO AQUÍ
    // HTML necesario:
    // - Display del contador (grande)
    // - Botón "+" (incrementar)
    // - Botón "-" (decrementar)
    // - Botón "Reset"
};

WidgetContador.prototype.configurarEventos = function() {
    // TU CÓDIGO AQUÍ
    // ⚠️ Usar arrow functions para mantener "this"
};

WidgetContador.prototype.incrementar = function() {
    // TU CÓDIGO AQUÍ
    // 1. Incrementar this.cuenta
    // 2. Actualizar display
    console.log('Contador incrementado a:', this.cuenta);
};

WidgetContador.prototype.decrementar = function() {
    // TU CÓDIGO AQUÍ
    // 1. Decrementar this.cuenta
    // 2. Validar que no sea negativo
    // 3. Actualizar display
};

WidgetContador.prototype.reset = function() {
    // TU CÓDIGO AQUÍ
    // 1. this.cuenta = 0
    // 2. Actualizar display
};

WidgetContador.prototype.actualizarDisplay = function() {
    // TU CÓDIGO AQUÍ
    // Actualizar el elemento del DOM con this.cuenta
};


// ============================================
// WIDGET USUARIO (Día 2)
// ============================================

function WidgetUsuario(contenedorId) {
    // TU CÓDIGO AQUÍ (Día 2)
}

WidgetUsuario.prototype.renderizarUI = function() {
    // TU CÓDIGO AQUÍ
    // HTML necesario:
    // - Botón "Cargar Usuario"
    // - Div para mostrar usuario (inicialmente vacío)
};

WidgetUsuario.prototype.configurarEventos = function() {
    // TU CÓDIGO AQUÍ
    // Botón cargar → this.cargarUsuario()
};

WidgetUsuario.prototype.cargarUsuario = function() {
    // TU CÓDIGO AQUÍ
    // 1. Mostrar estado de carga
    // 2. Fetch a https://randomuser.me/api/
    // 3. ⚠️ IMPORTANTE: Usar arrow function en .then() para mantener "this"
    // 4. Llamar this.renderizarUsuario(datos)
    // 5. Manejo de errores en .catch()
};

WidgetUsuario.prototype.renderizarUsuario = function(usuario) {
    // TU CÓDIGO AQUÍ
    // Mostrar: foto, nombre, email
    // usuario.picture.large
    // usuario.name.first + usuario.name.last
    // usuario.email
};

WidgetUsuario.prototype.mostrarCargando = function() {
    // TU CÓDIGO AQUÍ
    // Mostrar "Cargando..."
};

WidgetUsuario.prototype.mostrarError = function(mensaje) {
    // TU CÓDIGO AQUÍ
    // Mostrar mensaje de error
};


// ============================================
// WIDGET TAREAS (Día 2)
// ============================================

function WidgetTareas(contenedorId) {
    // TU CÓDIGO AQUÍ (Día 2)
    // Estado: this.tareas = []
    // Generar IDs únicos: this.nextId = 1
}

WidgetTareas.prototype.renderizarUI = function() {
    // TU CÓDIGO AQUÍ
    // HTML necesario:
    // - Input text + botón "Agregar"
    // - <ul> para lista de tareas
};

WidgetTareas.prototype.configurarEventos = function() {
    // TU CÓDIGO AQUÍ
    // 1. Botón agregar → this.handleAgregar()
    // 2. Enter en input → this.handleAgregar()
    // 3. ⚠️ Event delegation en la lista:
    //    this.listaElement.addEventListener('click', (e) => { ... })
};

WidgetTareas.prototype.handleAgregar = function() {
    // TU CÓDIGO AQUÍ
    // 1. Obtener texto del input
    // 2. Validar que no esté vacío
    // 3. Llamar this.agregarTarea(texto)
    // 4. Limpiar input
};

WidgetTareas.prototype.agregarTarea = function(texto) {
    // TU CÓDIGO AQUÍ
    // 1. Crear objeto tarea: { id, texto, completada: false }
    // 2. Agregar a this.tareas
    // 3. Llamar this.renderizarTareas()
};

WidgetTareas.prototype.completarTarea = function(id) {
    // TU CÓDIGO AQUÍ
    // 1. Buscar tarea por id
    // 2. Toggle completada
    // 3. Rerenderizar
};

WidgetTareas.prototype.eliminarTarea = function(id) {
    // TU CÓDIGO AQUÍ
    // 1. Filtrar this.tareas
    // 2. Rerenderizar
};

WidgetTareas.prototype.renderizarTareas = function() {
    // TU CÓDIGO AQUÍ
    // 1. Si no hay tareas → mostrar mensaje "No hay tareas"
    // 2. Mapear this.tareas a HTML
    // 3. Cada tarea debe tener:
    //    - data-id="${tarea.id}"
    //    - clase "completada" si está completada
    //    - botón eliminar con clase "btn-eliminar"
    //    - click en texto para completar
};


// ============================================
// DASHBOARD MANAGER
// ============================================

const Dashboard = {
    /**
     * Inicializa todos los widgets
     */
    init: function() {
        console.log('Inicializando Dashboard...');
        
        // Crear instancias de los widgets
        this.reloj = new WidgetReloj('widget-reloj');
        this.contador = new WidgetContador('widget-contador');
        
        // Día 2: Descomentar estos
        // this.usuario = new WidgetUsuario('widget-usuario');
        // this.tareas = new WidgetTareas('widget-tareas');
        
        console.log('Dashboard inicializado correctamente');
    }
};

// ============================================
// INICIALIZACIÓN
// ============================================

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    Dashboard.init();
});
```

---

## 💡 HINTS GENERALES

### Hint 1: Event Listeners y "this"

**Problema común:**
```javascript
// ❌ Esto NO funciona (pierde "this")
this.boton.addEventListener('click', this.metodo);
```

**Soluciones:**
```javascript
// ✅ Opción 1: Arrow function
this.boton.addEventListener('click', () => {
    this.metodo();
});

// ✅ Opción 2: Bind (si querés remover el listener después)
this.metodo = this.metodo.bind(this);
this.boton.addEventListener('click', this.metodo);
```

---

### Hint 2: setInterval y la referencia

**Siempre guardá la referencia:**
```javascript
// ✅ CORRECTO
this.intervalo = setInterval(() => {
    this.actualizar();
}, 1000);

// Para detener
clearInterval(this.intervalo);
```

---

### Hint 3: Fetch y "this"

```javascript
cargarUsuario: function() {
    // ✅ Arrow function para mantener "this"
    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            // Aquí "this" sigue siendo el widget ✅
            this.renderizarUsuario(data.results[0]);
        })
        .catch(error => {
            this.mostrarError(error.message);
        });
}
```

---

### Hint 4: Event Delegation

```javascript
// En vez de esto:
this.tareas.forEach(tarea => {
    const elemento = document.getElementById(`tarea-${tarea.id}`);
    elemento.addEventListener('click', () => { ... });  // Muchos listeners
});

// Hacé esto:
this.listaElement.addEventListener('click', (e) => {
    // Un solo listener para TODA la lista
    
    if (e.target.classList.contains('btn-eliminar')) {
        const id = e.target.closest('.tarea-item').dataset.id;
        this.eliminarTarea(Number(id));
    }
    
    if (e.target.classList.contains('tarea-texto')) {
        const id = e.target.closest('.tarea-item').dataset.id;
        this.completarTarea(Number(id));
    }
});
```

---

## 🐛 PROBLEMAS COMUNES Y SOLUCIONES

### Problema 1: "this is undefined" en callback

**Síntoma:**
```
Uncaught TypeError: Cannot read property 'cuenta' of undefined
```

**Causa:** Perdiste "this" en un callback

**Solución:** Usá arrow function

```javascript
// ❌ MAL
this.boton.addEventListener('click', this.incrementar);

// ✅ BIEN
this.boton.addEventListener('click', () => {
    this.incrementar();
});
```

---

### Problema 2: setInterval no se detiene

**Síntoma:** El reloj sigue corriendo después de detener

**Causa:** No guardaste la referencia del setInterval

**Solución:**
```javascript
// ✅ Guardar referencia
this.intervalo = setInterval(() => { ... }, 1000);

// ✅ Limpiar con la referencia
clearInterval(this.intervalo);
```

---

### Problema 3: Event delegation no funciona

**Síntoma:** Los clicks en tareas no se detectan

**Causa:** Los elementos se crean dinámicamente después del listener

**Solución:** Poner el listener en el PADRE que siempre existe

```javascript
// ✅ Listener en el padre (lista)
this.listaElement.addEventListener('click', (e) => {
    // Revisar qué elemento fue clickeado
    if (e.target.classList.contains('btn-eliminar')) {
        // Manejar
    }
});
```

---

### Problema 4: Fetch no actualiza el widget

**Síntoma:** Datos se cargan pero no se muestran

**Causa:** Perdiste "this" en el `.then()`

**Solución:**
```javascript
// ✅ Arrow function en .then()
fetch(url)
    .then(response => response.json())
    .then(data => {
        this.renderizar(data);  // "this" funciona ✅
    });
```

---

## ✅ CHECKLIST FINAL

### Antes de dar por terminado:

**Funcionalidad:**
- [ ] Reloj inicia y detiene correctamente
- [ ] Contador incrementa/decrementa/resetea
- [ ] Usuario carga desde API y muestra datos
- [ ] Tareas se agregan/completan/eliminan

**Manejo de "this":**
- [ ] Todos los event listeners funcionan
- [ ] setInterval se puede detener
- [ ] Fetch actualiza el widget correctamente
- [ ] Event delegation funciona en tareas

**Código:**
- [ ] No hay errores en consola
- [ ] Código comentado (al menos lo importante)
- [ ] Nombres de variables descriptivos
- [ ] Sin código duplicado excesivo

**Testing rápido:**
- [ ] Hacer click rápido en todos los botones
- [ ] Cargar múltiples usuarios seguidos
- [ ] Agregar/eliminar muchas tareas
- [ ] Iniciar/detener reloj varias veces

---

## 🎯 CRITERIOS DE EVALUACIÓN

**Lo que se busca:**

1. **Funcionalidad (40%)**
   - Widgets funcionan correctamente
   - Manejo de estados (loading, error)
   - Interacciones fluidas

2. **Manejo de "this" (40%)**
   - Event listeners con "this" correcto
   - setInterval/setTimeout correctos
   - Callbacks async con "this" preservado
   - Event delegation implementado

3. **Código (20%)**
   - Estructura clara con constructores
   - Prototype methods usados
   - Código comentado donde es necesario
   - Sin bugs evidentes

**NO se evalúa:**
- Diseño visual (el CSS ya está)
- Optimizaciones avanzadas
- Features extra (nice to have)

---

## 🚀 AL TERMINAR

**Cuando completes el proyecto:**

1. **Testear todo** (checklist arriba)
2. **Subir a GitHub** (opcional pero recomendado)
3. **Avisar que terminaste** → Pasamos a **Fase 4: Call/Apply/Bind**

---

## 📝 NOTAS FINALES

### Governor activo:
- ⏱️ Máximo 2-3 días
- 🔄 Máximo 2 iteraciones
- 80% funcional = Suficiente

### Si te trabás:
1. Revisar Hints arriba
2. Revisar Apunte Maestro de "this"
3. Hacer console.log('this:', this) para debuggear
4. Preguntar si >1 hora trabado

### Próximo paso:
**Fase 4 - Call/Apply/Bind:** Las herramientas para controlar "this" manualmente

---

**¡Éxito con el proyecto! 🚀**

Acordate: Funcional > Perfecto. El objetivo es PRACTICAR "this", no hacer la app más linda del mundo.

---

**FIN DEL PROYECTO 3**

Versión: 1.0  
Fecha: Enero 2025  
Duración: 2-3 días máximo  
Nivel: Intermedio-Avanzado
