# 🏗️ PROYECTO 2: Sistema de Gestión de Tareas con Closures

**Duración:** 2-3 días máximo  
**Objetivo:** Construir un TODO app completo usando closures para estado privado, factories para crear tareas, y memoization para optimizar filtros

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Una aplicación de gestión de tareas (TODO app) que:
- Crea, edita, completa y elimina tareas
- Filtra por estado (todas/completadas/pendientes)
- Busca tareas por texto
- Persiste en localStorage
- Muestra estadísticas
- Usa closures para TODO el manejo de estado

**Visualización:**
```
┌─────────────────────────────────────────────┐
│   📝 GESTOR DE TAREAS                       │
├─────────────────────────────────────────────┤
│ [Nueva tarea...]          [+ AGREGAR]       │
│                                             │
│ Filtros: [Todas] [Pendientes] [Completadas]│
│ Buscar: [_____________]                     │
│                                             │
│ ☐ Estudiar closures                [✎] [✕] │
│ ☑ Completar Fase 1                 [✎] [✕] │
│ ☐ Hacer ejercicio                  [✎] [✕] │
│                                             │
│ Total: 3 | Completadas: 1 | Pendientes: 2  │
└─────────────────────────────────────────────┘
```

---

## ⏱️ GOVERNOR ACTIVADO

**Límites estrictos:**
- **Día 1:** 3-4 horas máximo
- **Día 2:** 3-4 horas máximo
- **Día 3:** 2-3 horas máximo
- **Total:** 2-3 días (8-11 horas)
- **Iteraciones:** Máximo 2 (primera versión + pulir)
- **Regla 80/20:** Funcional > Perfecto

**Si funciona al 80% al final del Día 3 → NEXT (Fase 3)**

---

## ✅ FEATURES MÍNIMAS (MVP)

### Must Have:
- [x] Agregar tarea con título
- [x] Marcar tarea como completada/pendiente
- [x] Eliminar tarea
- [x] Filtrar por estado (todas/completadas/pendientes)
- [x] Búsqueda por texto
- [x] Persistir en localStorage
- [x] Mostrar estadísticas (total, completadas, pendientes)
- [x] Código organizado con closures (estado privado)
- [x] Factory pattern para crear tareas

### Nice to Have (si sobra tiempo):
- [ ] Editar título de tarea
- [ ] Agregar descripción a tareas
- [ ] Categorías/tags
- [ ] Ordenar por fecha/prioridad
- [ ] Animaciones CSS

**IMPORTANTE:** Hacé solo Must Have primero. Nice to Have solo si terminás temprano.

---

## 🎯 PATTERNS QUE VAS A APRENDER

### PATTERN 1: Factory Pattern con Closures

**¿Qué es?**
Función que crea objetos (tareas) con datos privados y métodos públicos usando closures.

```javascript
function crearTarea(titulo) {
    // Datos PRIVADOS (closure)
    let _titulo = titulo;
    let _completada = false;
    let _id = Date.now();
    let _fechaCreacion = new Date();
    
    // Retornar objeto con métodos PÚBLICOS
    return {
        getId: function() { return _id; },
        getTitulo: function() { return _titulo; },
        setTitulo: function(nuevoTitulo) { _titulo = nuevoTitulo; },
        isCompletada: function() { return _completada; },
        toggleCompletada: function() { _completada = !_completada; },
        getFechaCreacion: function() { return _fechaCreacion; },
        
        // Método para serializar (guardar en localStorage)
        toJSON: function() {
            return {
                id: _id,
                titulo: _titulo,
                completada: _completada,
                fechaCreacion: _fechaCreacion
            };
        }
    };
}

// Uso:
const tarea = crearTarea("Estudiar closures");
tarea.toggleCompletada();
console.log(tarea.isCompletada());  // true
// NO podemos acceder a _titulo directamente (es privado)
```

**¿Por qué lo usamos?**
- Datos privados reales (no se pueden modificar directamente)
- Cada tarea es independiente
- No hay problemas con "this"
- Más fácil de testear

**¿Dónde lo ves en el código?**
Cada tarea es un objeto creado con `crearTarea()` que tiene estado privado.

**Analogía:**
Es como una TARJETA con información:
- La información (datos privados) está impresa en la tarjeta
- Solo podés leer/modificar usando los "botones" (métodos públicos)
- No podés rayar la tarjeta directamente

---

### PATTERN 2: Module Pattern Avanzado

**¿Qué es?**
Organizar toda la aplicación en módulos que se comunican entre sí, cada uno con su responsabilidad.

```javascript
const App = {
    // Módulo de Estado (maneja las tareas)
    State: (function() {
        let tareas = [];  // Privado
        
        return {
            agregarTarea: function(tarea) { tareas.push(tarea); },
            obtenerTareas: function() { return tareas; },
            // ...
        };
    })(),
    
    // Módulo de UI (renderiza la interfaz)
    UI: (function() {
        function renderizarTarea(tarea) { /* ... */ }
        return { renderizarTarea };
    })(),
    
    // Módulo de Filtros (filtra tareas)
    Filters: (function() {
        function filtrarPorEstado(tareas, estado) { /* ... */ }
        return { filtrarPorEstado };
    })()
};
```

**¿Por qué lo usamos?**
- Separation of Concerns (cada módulo hace UNA cosa)
- Código más mantenible
- Fácil de testear módulos individuales
- Estado centralizado

**¿Dónde lo ves en el código?**
Toda la app se divide en: State, UI, Filters, Storage, Stats

---

### PATTERN 3: Memoization

**¿Qué es?**
Cachear resultados de funciones costosas (como filtrar/buscar en arrays grandes).

```javascript
const Filters = (function() {
    const cache = {};  // Privado
    
    function filtrarTareas(tareas, filtro) {
        const key = filtro + tareas.length;  // Key del caché
        
        if (key in cache) {
            console.log("Usando filtro cacheado");
            return cache[key];
        }
        
        // Filtrar (operación costosa si hay muchas tareas)
        const resultado = tareas.filter(t => {
            if (filtro === 'todas') return true;
            if (filtro === 'completadas') return t.isCompletada();
            if (filtro === 'pendientes') return !t.isCompletada();
        });
        
        cache[key] = resultado;
        return resultado;
    }
    
    return { filtrarTareas };
})();
```

**¿Por qué lo usamos?**
- Optimización de performance
- Evita recalcular filtros si no cambió nada
- Importante cuando hay muchas tareas

**¿Dónde lo ves en el código?**
En los módulos de Filters y Stats para cachear resultados.

---

### PATTERN 4: Observer/PubSub Básico

**¿Qué es?**
Permitir que módulos se notifiquen entre sí cuando algo cambia, sin estar acoplados directamente.

```javascript
const EventBus = (function() {
    const eventos = {};  // Privado
    
    return {
        // Suscribirse a un evento
        on: function(evento, callback) {
            if (!eventos[evento]) eventos[evento] = [];
            eventos[evento].push(callback);
        },
        
        // Emitir un evento
        emit: function(evento, data) {
            if (eventos[evento]) {
                eventos[evento].forEach(cb => cb(data));
            }
        }
    };
})();

// Uso:
EventBus.on('tareaAgregada', function(tarea) {
    console.log("Nueva tarea:", tarea.getTitulo());
});

EventBus.emit('tareaAgregada', nuevaTarea);
```

**¿Por qué lo usamos?**
- Desacoplar módulos
- Un módulo puede notificar cambios sin saber quién escucha
- Fácil agregar nuevos "listeners"

**¿Dónde lo ves en el código?**
Para notificar cuando se agrega/elimina/completa una tarea, y que UI se actualice automáticamente.

---

## 🏗️ ESTRUCTURA DEL PROYECTO

### Archivos necesarios:
```
proyecto-2/
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
    <title>Proyecto 2 - Gestor de Tareas</title>
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

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .header h1 {
            font-size: 32px;
            margin-bottom: 10px;
        }

        .header p {
            opacity: 0.9;
            font-size: 14px;
        }

        .input-section {
            padding: 30px;
            background: #f8f9fa;
            border-bottom: 2px solid #e9ecef;
        }

        .input-group {
            display: flex;
            gap: 10px;
        }

        #nuevaTareaInput {
            flex: 1;
            padding: 15px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s;
        }

        #nuevaTareaInput:focus {
            outline: none;
            border-color: #667eea;
        }

        #agregarBtn {
            padding: 15px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        }

        #agregarBtn:hover {
            transform: translateY(-2px);
        }

        #agregarBtn:active {
            transform: translateY(0);
        }

        .controls {
            padding: 20px 30px;
            background: white;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }

        .filters {
            display: flex;
            gap: 10px;
        }

        .filter-btn {
            padding: 8px 16px;
            background: #e9ecef;
            border: 2px solid transparent;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.3s;
        }

        .filter-btn:hover {
            background: #dee2e6;
        }

        .filter-btn.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-color: #667eea;
        }

        .search-box {
            position: relative;
        }

        #buscarInput {
            padding: 8px 16px;
            border: 2px solid #ddd;
            border-radius: 6px;
            font-size: 14px;
            width: 200px;
        }

        #buscarInput:focus {
            outline: none;
            border-color: #667eea;
        }

        .tasks-section {
            padding: 30px;
            min-height: 300px;
        }

        .task-item {
            background: white;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
            gap: 15px;
            transition: all 0.3s;
        }

        .task-item:hover {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }

        .task-item.completed {
            background: #f8f9fa;
            border-color: #28a745;
        }

        .task-checkbox {
            width: 24px;
            height: 24px;
            cursor: pointer;
            accent-color: #667eea;
        }

        .task-content {
            flex: 1;
        }

        .task-title {
            font-size: 16px;
            color: #333;
            font-weight: 500;
        }

        .task-item.completed .task-title {
            text-decoration: line-through;
            color: #6c757d;
        }

        .task-date {
            font-size: 12px;
            color: #6c757d;
            margin-top: 5px;
        }

        .task-actions {
            display: flex;
            gap: 10px;
        }

        .task-btn {
            padding: 8px 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            transition: all 0.2s;
        }

        .delete-btn {
            background: #dc3545;
            color: white;
        }

        .delete-btn:hover {
            background: #c82333;
        }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #6c757d;
        }

        .empty-state-icon {
            font-size: 64px;
            margin-bottom: 20px;
            opacity: 0.5;
        }

        .empty-state-text {
            font-size: 18px;
            font-weight: 500;
        }

        .stats {
            padding: 20px 30px;
            background: #f8f9fa;
            border-top: 2px solid #e9ecef;
            display: flex;
            justify-content: space-around;
            text-align: center;
        }

        .stat-item {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        .stat-number {
            font-size: 24px;
            font-weight: 700;
            color: #667eea;
        }

        .stat-label {
            font-size: 12px;
            color: #6c757d;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        @media (max-width: 600px) {
            .controls {
                flex-direction: column;
                align-items: stretch;
            }

            .filters {
                justify-content: center;
            }

            #buscarInput {
                width: 100%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>📝 Gestor de Tareas</h1>
            <p>Organiza tu día con closures y JavaScript</p>
        </div>

        <!-- Input Section -->
        <div class="input-section">
            <div class="input-group">
                <input 
                    type="text" 
                    id="nuevaTareaInput" 
                    placeholder="¿Qué necesitas hacer?"
                    autocomplete="off"
                >
                <button id="agregarBtn">+ AGREGAR</button>
            </div>
        </div>

        <!-- Controls (Filters + Search) -->
        <div class="controls">
            <div class="filters">
                <button class="filter-btn active" data-filter="todas">Todas</button>
                <button class="filter-btn" data-filter="pendientes">Pendientes</button>
                <button class="filter-btn" data-filter="completadas">Completadas</button>
            </div>
            <div class="search-box">
                <input 
                    type="text" 
                    id="buscarInput" 
                    placeholder="Buscar tareas..."
                    autocomplete="off"
                >
            </div>
        </div>

        <!-- Tasks List -->
        <div class="tasks-section" id="tasksContainer">
            <!-- Las tareas se renderizan aquí dinámicamente -->
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <div class="empty-state-text">No hay tareas. ¡Agrega una para empezar!</div>
            </div>
        </div>

        <!-- Stats -->
        <div class="stats">
            <div class="stat-item">
                <div class="stat-number" id="statTotal">0</div>
                <div class="stat-label">Total</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="statCompletadas">0</div>
                <div class="stat-label">Completadas</div>
            </div>
            <div class="stat-item">
                <div class="stat-number" id="statPendientes">0</div>
                <div class="stat-label">Pendientes</div>
            </div>
        </div>
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
// PROYECTO 2: GESTOR DE TAREAS CON CLOSURES
// ============================================
// Objetivo: Aplicar TODO lo aprendido de closures
// - Factory pattern para crear tareas
// - Datos privados con closures
// - Memoization para optimizar filtros
// - Observer/PubSub para comunicación

// ============================================
// NAMESPACE GLOBAL
// ============================================
const App = {};

// ============================================
// MÓDULO 1: FACTORY DE TAREAS
// ============================================
// Función factory que crea tareas con datos privados

function crearTarea(titulo, id = null) {
    // Datos PRIVADOS (closures)
    let _id = id || Date.now();
    let _titulo = titulo;
    let _completada = false;
    let _fechaCreacion = new Date();
    
    // Métodos PÚBLICOS
    return {
        getId: function() {
            return _id;
        },
        
        getTitulo: function() {
            return _titulo;
        },
        
        setTitulo: function(nuevoTitulo) {
            _titulo = nuevoTitulo;
        },
        
        isCompletada: function() {
            return _completada;
        },
        
        toggleCompletada: function() {
            _completada = !_completada;
            return _completada;
        },
        
        getFechaCreacion: function() {
            return _fechaCreacion;
        },
        
        // Serializar para guardar en localStorage
        toJSON: function() {
            return {
                id: _id,
                titulo: _titulo,
                completada: _completada,
                fechaCreacion: _fechaCreacion.toISOString()
            };
        }
    };
}

// ============================================
// MÓDULO 2: ESTADO (State Management)
// ============================================
App.State = (function() {
    // Array PRIVADO de tareas
    let tareas = [];
    
    return {
        // Agregar tarea
        agregarTarea: function(tarea) {
            // TU CÓDIGO AQUÍ
            // 1. Agregar tarea al array
            // 2. Emitir evento 'tareaAgregada'
        },
        
        // Eliminar tarea por ID
        eliminarTarea: function(id) {
            // TU CÓDIGO AQUÍ
            // 1. Encontrar índice de la tarea
            // 2. Eliminar del array
            // 3. Emitir evento 'tareaEliminada'
        },
        
        // Obtener todas las tareas
        obtenerTareas: function() {
            // TU CÓDIGO AQUÍ
            // Retornar array de tareas
        },
        
        // Obtener tarea por ID
        obtenerTareaPorId: function(id) {
            // TU CÓDIGO AQUÍ
            // Buscar y retornar tarea
        },
        
        // Toggle completada
        toggleTarea: function(id) {
            // TU CÓDIGO AQUÍ
            // 1. Encontrar tarea
            // 2. Toggle completada
            // 3. Emitir evento 'tareaModificada'
        },
        
        // Cargar tareas (desde localStorage)
        cargarTareas: function(tareasData) {
            // TU CÓDIGO AQUÍ
            // Recrear tareas desde JSON
        }
    };
})();

// ============================================
// MÓDULO 3: EVENT BUS (Observer/PubSub)
// ============================================
App.EventBus = (function() {
    // Objeto PRIVADO de eventos
    const eventos = {};
    
    return {
        // Suscribirse a un evento
        on: function(evento, callback) {
            // TU CÓDIGO AQUÍ
            // Agregar callback al array de eventos[evento]
        },
        
        // Emitir un evento
        emit: function(evento, data) {
            // TU CÓDIGO AQUÍ
            // Ejecutar todos los callbacks del evento
        }
    };
})();

// ============================================
// MÓDULO 4: FILTROS (con Memoization)
// ============================================
App.Filters = (function() {
    // Caché PRIVADO
    const cache = {};
    
    return {
        // Filtrar tareas por estado
        filtrarPorEstado: function(tareas, filtro) {
            // TU CÓDIGO AQUÍ
            // 1. Crear key del caché
            // 2. Si está en caché, retornar
            // 3. Filtrar tareas según filtro
            // 4. Guardar en caché y retornar
        },
        
        // Buscar tareas por texto
        buscarTareas: function(tareas, texto) {
            // TU CÓDIGO AQUÍ
            // Filtrar tareas cuyo título incluya el texto
        },
        
        // Limpiar caché (cuando cambian las tareas)
        limpiarCache: function() {
            // TU CÓDIGO AQUÍ
            // Vaciar objeto cache
        }
    };
})();

// ============================================
// MÓDULO 5: ESTADÍSTICAS (con Memoization)
// ============================================
App.Stats = (function() {
    // Caché PRIVADO
    const cache = {};
    
    return {
        calcularEstadisticas: function(tareas) {
            // TU CÓDIGO AQUÍ
            // 1. Crear key del caché
            // 2. Si está en caché, retornar
            // 3. Calcular total, completadas, pendientes
            // 4. Guardar en caché y retornar objeto con stats
        },
        
        limpiarCache: function() {
            // TU CÓDIGO AQUÍ
        }
    };
})();

// ============================================
// MÓDULO 6: LOCAL STORAGE
// ============================================
App.Storage = (function() {
    const STORAGE_KEY = 'todoApp_tareas';
    
    return {
        guardar: function(tareas) {
            // TU CÓDIGO AQUÍ
            // Serializar tareas y guardar en localStorage
        },
        
        cargar: function() {
            // TU CÓDIGO AQUÍ
            // Cargar tareas desde localStorage
            // Retornar array de objetos JSON
        }
    };
})();

// ============================================
// MÓDULO 7: UI (Renderizado)
// ============================================
App.UI = (function() {
    // Referencias a elementos del DOM
    const elementos = {
        tasksContainer: document.getElementById('tasksContainer'),
        nuevaTareaInput: document.getElementById('nuevaTareaInput'),
        agregarBtn: document.getElementById('agregarBtn'),
        buscarInput: document.getElementById('buscarInput'),
        filterBtns: document.querySelectorAll('.filter-btn'),
        statTotal: document.getElementById('statTotal'),
        statCompletadas: document.getElementById('statCompletadas'),
        statPendientes: document.getElementById('statPendientes')
    };
    
    // Estado local del UI
    let filtroActual = 'todas';
    let busquedaActual = '';
    
    return {
        // Renderizar todas las tareas
        renderizarTareas: function() {
            // TU CÓDIGO AQUÍ
            // 1. Obtener tareas del State
            // 2. Aplicar filtro actual
            // 3. Aplicar búsqueda actual
            // 4. Renderizar cada tarea
            // 5. Si no hay tareas, mostrar empty state
        },
        
        // Renderizar una tarea individual
        renderizarTarea: function(tarea) {
            // TU CÓDIGO AQUÍ
            // 1. Crear elemento div.task-item
            // 2. Agregar checkbox, título, fecha, botón eliminar
            // 3. Agregar event listeners
            // 4. Retornar elemento
        },
        
        // Actualizar estadísticas
        actualizarEstadisticas: function() {
            // TU CÓDIGO AQUÍ
            // 1. Obtener stats del módulo Stats
            // 2. Actualizar elementos del DOM
        },
        
        // Inicializar event listeners
        inicializarEventos: function() {
            // TU CÓDIGO AQUÍ
            // 1. Click en agregar
            // 2. Enter en input
            // 3. Click en filtros
            // 4. Input en búsqueda
        },
        
        // Cambiar filtro activo
        cambiarFiltro: function(filtro) {
            // TU CÓDIGO AQUÍ
            // Actualizar filtroActual y clase active
        },
        
        // Actualizar búsqueda
        actualizarBusqueda: function(texto) {
            // TU CÓDIGO AQUÍ
            // Actualizar busquedaActual
        }
    };
})();

// ============================================
// MÓDULO 8: APP (Coordinador principal)
// ============================================
App.Main = (function() {
    
    function inicializar() {
        // 1. Cargar tareas desde localStorage
        // TU CÓDIGO AQUÍ
        
        // 2. Inicializar UI
        // TU CÓDIGO AQUÍ
        
        // 3. Suscribirse a eventos
        // TU CÓDIGO AQUÍ
        // App.EventBus.on('tareaAgregada', ...)
        // App.EventBus.on('tareaEliminada', ...)
        // App.EventBus.on('tareaModificada', ...)
        
        // 4. Renderizar inicial
        // TU CÓDIGO AQUÍ
    }
    
    return {
        init: inicializar
    };
})();

// ============================================
// INICIAR APLICACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    App.Main.init();
});
```

---

## 📅 CRONOGRAMA DÍA POR DÍA

### DÍA 1: Setup y CRUD Básico (3-4 horas)

**Objetivo:** HTML funcionando + crear/eliminar/completar tareas

**Tareas:**
1. [ ] Crear archivos (index.html, app.js)
2. [ ] Copiar HTML/CSS completo
3. [ ] Copiar estructura JavaScript base
4. [ ] Implementar `crearTarea()` factory:
   - [ ] Datos privados (_id, _titulo, _completada, _fechaCreacion)
   - [ ] Métodos públicos (getId, getTitulo, isCompletada, toggleCompletada, toJSON)
   - [ ] Probar en consola
5. [ ] Implementar `App.State`:
   - [ ] Array privado de tareas
   - [ ] agregarTarea()
   - [ ] eliminarTarea()
   - [ ] obtenerTareas()
   - [ ] toggleTarea()
6. [ ] Implementar `App.EventBus`:
   - [ ] on() para suscribirse
   - [ ] emit() para emitir eventos
7. [ ] Implementar `App.UI` básico:
   - [ ] renderizarTarea() (crear elemento HTML)
   - [ ] renderizarTareas() (renderizar todas)
   - [ ] Event listener para agregar tarea
   - [ ] Event listener para eliminar tarea
   - [ ] Event listener para toggle completada
8. [ ] Implementar `App.Main.init()`:
   - [ ] Suscribir eventos
   - [ ] Renderizar inicial

**Checkpoint Día 1:**
- [ ] Puedo agregar tareas
- [ ] Puedo marcar como completadas
- [ ] Puedo eliminar tareas
- [ ] Se renderizan correctamente

---

### DÍA 2: Filtros, Búsqueda y Persistencia (3-4 horas)

**Objetivo:** Filtros funcionando + búsqueda + localStorage

**Tareas:**
1. [ ] Implementar `App.Filters`:
   - [ ] filtrarPorEstado() con memoization
   - [ ] buscarTareas()
   - [ ] limpiarCache()
2. [ ] Implementar `App.Stats`:
   - [ ] calcularEstadisticas() con memoization
   - [ ] limpiarCache()
3. [ ] Implementar `App.Storage`:
   - [ ] guardar() en localStorage
   - [ ] cargar() desde localStorage
4. [ ] Conectar filtros en UI:
   - [ ] Event listeners en botones de filtro
   - [ ] cambiarFiltro()
   - [ ] Actualizar clase "active"
5. [ ] Conectar búsqueda en UI:
   - [ ] Event listener en input de búsqueda
   - [ ] actualizarBusqueda()
6. [ ] Conectar localStorage:
   - [ ] Guardar en cada cambio (agregar/eliminar/toggle)
   - [ ] Cargar al iniciar app
7. [ ] Actualizar estadísticas:
   - [ ] actualizarEstadisticas() en UI
   - [ ] Llamar en cada cambio

**Checkpoint Día 2:**
- [ ] Filtros funcionan (todas/completadas/pendientes)
- [ ] Búsqueda funciona
- [ ] Tareas persisten en localStorage
- [ ] Estadísticas se actualizan

---

### DÍA 3: Refinamiento y Pulido (2-3 horas)

**Objetivo:** Verificar memoization + empty states + bugs

**Tareas:**
1. [ ] Verificar memoization:
   - [ ] Agregar console.log en filtros
   - [ ] Verificar que use caché
   - [ ] Limpiar caché cuando cambian tareas
2. [ ] Mejorar empty states:
   - [ ] Mostrar cuando no hay tareas
   - [ ] Mostrar cuando búsqueda no tiene resultados
3. [ ] Probar casos edge:
   - [ ] Agregar tarea vacía (validar)
   - [ ] Buscar sin tareas
   - [ ] Filtrar sin tareas
   - [ ] Eliminar todas las tareas
4. [ ] Pulir UI:
   - [ ] Limpiar input después de agregar
   - [ ] Focus en input después de agregar
   - [ ] Animaciones suaves (opcional)
5. [ ] Testing manual completo:
   - [ ] Agregar 10 tareas
   - [ ] Completar algunas
   - [ ] Filtrar por cada estado
   - [ ] Buscar diferentes textos
   - [ ] Recargar página (persistencia)
   - [ ] Eliminar varias tareas

**Checkpoint Día 3:**
- [ ] Memoization funciona y se verifica
- [ ] No hay bugs evidentes
- [ ] Experiencia de usuario fluida
- [ ] Código limpio y comentado

---

## 💡 HINTS GENERALES

### Hint 1: Factory de tareas
```javascript
function crearTarea(titulo, id = null) {
    let _id = id || Date.now();
    let _titulo = titulo;
    let _completada = false;
    let _fechaCreacion = new Date();
    
    return {
        getId: () => _id,
        getTitulo: () => _titulo,
        isCompletada: () => _completada,
        toggleCompletada: () => {
            _completada = !_completada;
            return _completada;
        },
        toJSON: () => ({
            id: _id,
            titulo: _titulo,
            completada: _completada,
            fechaCreacion: _fechaCreacion.toISOString()
        })
    };
}
```

### Hint 2: EventBus
```javascript
App.EventBus = (function() {
    const eventos = {};
    
    return {
        on: function(evento, callback) {
            if (!eventos[evento]) eventos[evento] = [];
            eventos[evento].push(callback);
        },
        
        emit: function(evento, data) {
            if (eventos[evento]) {
                eventos[evento].forEach(cb => cb(data));
            }
        }
    };
})();
```

### Hint 3: Filtrar con memoization
```javascript
filtrarPorEstado: function(tareas, filtro) {
    const key = filtro + '-' + tareas.length;
    
    if (key in cache) {
        console.log('[CACHE] Usando filtro cacheado');
        return cache[key];
    }
    
    console.log('[FILTRO] Calculando...');
    const resultado = tareas.filter(t => {
        if (filtro === 'todas') return true;
        if (filtro === 'completadas') return t.isCompletada();
        if (filtro === 'pendientes') return !t.isCompletada();
    });
    
    cache[key] = resultado;
    return resultado;
}
```

### Hint 4: Renderizar tarea
```javascript
renderizarTarea: function(tarea) {
    const div = document.createElement('div');
    div.className = 'task-item' + (tarea.isCompletada() ? ' completed' : '');
    div.dataset.id = tarea.getId();
    
    div.innerHTML = `
        <input type="checkbox" class="task-checkbox" ${tarea.isCompletada() ? 'checked' : ''}>
        <div class="task-content">
            <div class="task-title">${tarea.getTitulo()}</div>
            <div class="task-date">${new Date(tarea.getFechaCreacion()).toLocaleDateString()}</div>
        </div>
        <div class="task-actions">
            <button class="task-btn delete-btn">✕</button>
        </div>
    `;
    
    // Event listeners
    const checkbox = div.querySelector('.task-checkbox');
    checkbox.addEventListener('change', () => {
        App.State.toggleTarea(tarea.getId());
    });
    
    const deleteBtn = div.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
        App.State.eliminarTarea(tarea.getId());
    });
    
    return div;
}
```

---

## ✅ CHECKLIST FINAL

### Funcionalidad:
- [ ] Agregar tareas funciona
- [ ] Marcar como completada/pendiente funciona
- [ ] Eliminar tareas funciona
- [ ] Filtros funcionan (todas/completadas/pendientes)
- [ ] Búsqueda funciona
- [ ] Persistencia en localStorage funciona
- [ ] Estadísticas se actualizan correctamente
- [ ] Empty states se muestran apropiadamente

### Código:
- [ ] Factory pattern aplicado (crearTarea)
- [ ] Datos privados con closures
- [ ] Memoization en filtros y stats
- [ ] EventBus para comunicación
- [ ] Código modular (State, UI, Filters, etc.)
- [ ] Código comentado

### Patterns aplicados:
- [ ] Factory Pattern
- [ ] Module Pattern Avanzado
- [ ] Memoization
- [ ] Observer/PubSub (EventBus)

---

## 🎓 CONTEXTO DE USO REAL

**Este proyecto simula arquitecturas de apps modernas.**

### Verás estos patterns en:
- **React:** useState/useEffect son closures, useMemo es memoization
- **Redux:** Store centralizado (como App.State), subscriptions (como EventBus)
- **Vue:** Reactive state con closures, computed properties con memoization
- **MobX:** Observable state con observers

### Conceptos aplicados:
- **Factory Pattern:** React.createElement(), Vue component factories
- **Memoization:** React.memo(), useMemo(), Vue computed
- **Observer:** Redux subscriptions, Vue watchers, RxJS observables
- **Module Pattern:** Organización de código pre-ES6 modules

### Este conocimiento es fundamental porque:
- Entendés cómo funcionan frameworks POR DENTRO
- Podés crear tu propia arquitectura de state management
- Debugging de apps complejas es más fácil
- Transición a frameworks es más natural

---

## ⏱️ RECORDATORIO DEL GOVERNOR

**Límites:**
- ⏰ Máximo 2-3 días (8-11 horas)
- 🔄 Máximo 2 iteraciones
- ✅ 80% funcional = suficiente para avanzar

**Si funciona al final del Día 3 → NEXT (Fase 3: This)**

---

## 📝 PRÓXIMO PASO

Al completar este proyecto, avisame y continuamos con:
**Fase 3: This** (Serie de Ejercicios + Proyecto Dashboard)

---

**FIN DEL PROYECTO 2**

Versión: 1.0  
Fecha: Diciembre 2025  
Duración: 2-3 días máximo  
Patterns: Factory, Module, Memoization, Observer/PubSub  
Objetivo: Integrar TODO lo aprendido de closures en app real
