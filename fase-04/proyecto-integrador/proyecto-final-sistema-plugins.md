# 🎮 PROYECTO FINAL: Sistema de Plugins con API Extensible

**Duración:** 3 días máximo (9 horas)  
**Nivel:** Boss Fight Final 🔥  
**Objetivo:** Integrar TODO lo aprendido en las 4 fases

---

## 🎯 ¿QUÉ VAS A CONSTRUIR?

Un **sistema de plugins extensible** donde terceros pueden agregar funcionalidad sin modificar el código core. Similar a:
- WordPress plugins
- VS Code extensions
- Chrome extensions
- Express middleware

---

## 📋 ARQUITECTURA DEL SISTEMA

```
┌─────────────────────────────────────────┐
│           PLUGIN MANAGER               │
│  (Core del sistema - NO se modifica)   │
├─────────────────────────────────────────┤
│                                         │
│  API Pública:                          │
│  - registerPlugin()                    │
│  - unregisterPlugin()                  │
│  - executeTask()                       │
│  - getPluginInfo()                     │
│                                         │
├─────────────────────────────────────────┤
│           SHARED UTILITIES              │
│  (Disponibles para todos los plugins)  │
├─────────────────────────────────────────┤
│                                         │
│  PLUGINS (Extensiones de terceros):    │
│                                         │
│  ┌──────────┐  ┌──────────┐  ┌───────┐│
│  │ Logger   │  │Validator │  │ Cache ││
│  │ Plugin   │  │ Plugin   │  │Plugin ││
│  └──────────┘  └──────────┘  └───────┘│
│                                         │
└─────────────────────────────────────────┘
```

---

## ✅ FEATURES MÍNIMAS (MVP)

### **Core System:**
- [x] Registro/desregistro de plugins
- [x] Lifecycle hooks (onInstall, onActivate, onDeactivate, onUninstall)
- [x] API compartida accesible por plugins
- [x] Event system para comunicación entre plugins
- [x] Ejecución de tareas con interceptación de plugins

### **3 Plugins Funcionales:**
- [x] **Logger Plugin:** Loggea todas las tareas ejecutadas
- [x] **Validator Plugin:** Valida inputs antes de ejecutar
- [x] **Cache Plugin:** Cachea resultados de tareas costosas

### **UI Simple:**
- [x] Lista de plugins instalados
- [x] Activar/desactivar plugins
- [x] Ejecutar tareas de prueba
- [x] Ver logs

---

## 🎓 CONCEPTOS QUE VAS A APLICAR

### **De las 4 Fases:**

**Fase 1 (Scope/Context):**
- ✅ Módulos con scope privado
- ✅ Evitar contaminación del scope global
- ✅ Closures para estado privado

**Fase 2 (Closures):**
- ✅ Factory functions para crear plugins
- ✅ Estado privado de cada plugin
- ✅ Memoization en Cache Plugin

**Fase 3 (This):**
- ✅ Contexto correcto en métodos de plugins
- ✅ Event listeners con "this" preservado
- ✅ Métodos que acceden a "this" del plugin

**Fase 4 (Call/Apply/Bind):**
- ✅ Method borrowing (compartir utilidades)
- ✅ bind() para event handlers
- ✅ call/apply para ejecutar hooks con contexto correcto
- ✅ Decorators para interceptar ejecución

---

## 📁 ESTRUCTURA DE ARCHIVOS

```
proyecto-final-plugins/
├── index.html          (UI del sistema)
├── plugin-system.js    (Core - NO modificar mucho)
└── plugins/
    ├── logger.js       (Plugin 1)
    ├── validator.js    (Plugin 2)
    └── cache.js        (Plugin 3)
```

---

## 🗓️ CRONOGRAMA DÍA POR DÍA

### 📆 DÍA 1: Core System + Logger Plugin (3 horas)

**Objetivo:** Sistema base funcionando + primer plugin

**Tareas:**
1. [ ] Implementar PluginManager
   - [ ] registerPlugin()
   - [ ] unregisterPlugin()
   - [ ] executeTask()
   - [ ] Lifecycle hooks
2. [ ] Implementar Event System
   - [ ] on() / emit()
3. [ ] Crear Logger Plugin
   - [ ] Interceptar todas las tareas
   - [ ] Loggear en consola y array
4. [ ] Testear que funcione

**Checkpoint Día 1:**
- [ ] Puedo registrar/desregistrar plugins
- [ ] Logger intercepta ejecuciones
- [ ] Hooks se ejecutan correctamente
- [ ] No hay errores en consola

**Tiempo estimado:** 3 horas

---

### 📆 DÍA 2: Validator + Cache Plugins (3 horas)

**Objetivo:** Agregar validación y caching

**Tareas:**
1. [ ] Crear Validator Plugin
   - [ ] Validar inputs antes de ejecutar tarea
   - [ ] Bloquear ejecución si falla validación
   - [ ] Mostrar errores claros
2. [ ] Crear Cache Plugin
   - [ ] Cachear resultados por clave
   - [ ] Retornar desde cache si existe
   - [ ] Estadísticas (hits/misses)
3. [ ] Integrar ambos plugins
4. [ ] Testear interacción entre plugins

**Checkpoint Día 2:**
- [ ] Validator bloquea inputs inválidos
- [ ] Cache retorna resultados cacheados
- [ ] Plugins se comunican correctamente
- [ ] Logger muestra hits de cache

**Tiempo estimado:** 3 horas

---

### 📆 DÍA 3: UI + Integración Final (3 horas)

**Objetivo:** Interface de usuario + pulir detalles

**Tareas:**
1. [ ] Crear UI en HTML
   - [ ] Lista de plugins con estado
   - [ ] Botones activar/desactivar
   - [ ] Input para ejecutar tareas
   - [ ] Panel de logs
2. [ ] Conectar UI con sistema
   - [ ] Actualizar UI cuando cambian plugins
   - [ ] Ejecutar tareas desde UI
   - [ ] Mostrar logs en tiempo real
3. [ ] Testing completo
4. [ ] Refinamiento final

**Checkpoint Día 3:**
- [ ] UI funcional y clara
- [ ] Puedo activar/desactivar plugins desde UI
- [ ] Ejecutar tareas desde UI
- [ ] Ver resultados en tiempo real

**Tiempo estimado:** 3 horas

---

## 🏗️ CÓDIGO BASE

### **index.html** (Copiá completo)

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Plugins</title>
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
            max-width: 1200px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            color: white;
            margin-bottom: 30px;
        }

        .header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }

        .main-grid {
            display: grid;
            grid-template-columns: 1fr 2fr;
            gap: 20px;
        }

        .panel {
            background: white;
            border-radius: 15px;
            padding: 25px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .panel h2 {
            margin-bottom: 20px;
            color: #333;
            border-bottom: 2px solid #667eea;
            padding-bottom: 10px;
        }

        .plugin-list {
            list-style: none;
        }

        .plugin-item {
            padding: 15px;
            margin-bottom: 10px;
            background: #f8f9fa;
            border-radius: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all 0.3s;
        }

        .plugin-item:hover {
            background: #e9ecef;
            transform: translateX(5px);
        }

        .plugin-item.active {
            background: #d4edda;
            border-left: 4px solid #28a745;
        }

        .plugin-item.inactive {
            background: #f8d7da;
            border-left: 4px solid #dc3545;
        }

        .plugin-info {
            flex: 1;
        }

        .plugin-name {
            font-weight: bold;
            font-size: 1.1rem;
            color: #333;
        }

        .plugin-status {
            font-size: 0.9rem;
            color: #666;
            margin-top: 5px;
        }

        .btn {
            padding: 8px 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: all 0.3s;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        }

        .btn-primary {
            background: #667eea;
            color: white;
        }

        .btn-success {
            background: #28a745;
            color: white;
        }

        .btn-danger {
            background: #dc3545;
            color: white;
        }

        .task-executor {
            margin-bottom: 20px;
        }

        .task-input-group {
            display: flex;
            gap: 10px;
            margin-bottom: 15px;
        }

        .task-input-group input {
            flex: 1;
            padding: 10px;
            border: 2px solid #e9ecef;
            border-radius: 5px;
            font-size: 1rem;
        }

        .task-input-group input:focus {
            outline: none;
            border-color: #667eea;
        }

        .logs-container {
            background: #1e1e1e;
            color: #d4d4d4;
            padding: 15px;
            border-radius: 8px;
            max-height: 400px;
            overflow-y: auto;
            font-family: 'Courier New', monospace;
            font-size: 0.9rem;
        }

        .log-entry {
            margin-bottom: 8px;
            padding: 5px;
            border-left: 3px solid #667eea;
            padding-left: 10px;
        }

        .log-entry.error {
            border-left-color: #dc3545;
            color: #ff6b6b;
        }

        .log-entry.success {
            border-left-color: #28a745;
            color: #51cf66;
        }

        .log-entry.info {
            border-left-color: #17a2b8;
            color: #4dabf7;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            margin-bottom: 20px;
        }

        .stat-card {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }

        .stat-value {
            font-size: 2rem;
            font-weight: bold;
            color: #667eea;
        }

        .stat-label {
            font-size: 0.9rem;
            color: #666;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <h1>🔌 Sistema de Plugins</h1>
            <p>Proyecto Final - Integración de Todas las Fases</p>
        </div>

        <!-- Main Grid -->
        <div class="main-grid">
            <!-- Sidebar: Plugins -->
            <div class="panel">
                <h2>Plugins Instalados</h2>
                <ul class="plugin-list" id="plugin-list">
                    <!-- Plugins se renderizan aquí -->
                </ul>
            </div>

            <!-- Main Panel -->
            <div>
                <!-- Task Executor -->
                <div class="panel task-executor">
                    <h2>Ejecutar Tarea</h2>
                    
                    <!-- Stats -->
                    <div class="stats">
                        <div class="stat-card">
                            <div class="stat-value" id="stat-tasks">0</div>
                            <div class="stat-label">Tareas ejecutadas</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" id="stat-cache-hits">0</div>
                            <div class="stat-label">Cache hits</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value" id="stat-plugins">0</div>
                            <div class="stat-label">Plugins activos</div>
                        </div>
                    </div>

                    <!-- Input -->
                    <div class="task-input-group">
                        <input type="text" id="task-input" placeholder="Ingresa un número (ej: 5)">
                        <button class="btn btn-primary" id="btn-execute">Ejecutar</button>
                        <button class="btn btn-danger" id="btn-clear-logs">Limpiar logs</button>
                    </div>
                </div>

                <!-- Logs Panel -->
                <div class="panel">
                    <h2>Logs del Sistema</h2>
                    <div class="logs-container" id="logs-container">
                        <div class="log-entry info">Sistema iniciado...</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="plugin-system.js"></script>
    <script src="plugins/logger.js"></script>
    <script src="plugins/validator.js"></script>
    <script src="plugins/cache.js"></script>
    <script>
        // Inicializar sistema
        document.addEventListener('DOMContentLoaded', () => {
            PluginSystem.init();
        });
    </script>
</body>
</html>
```

---

### **plugin-system.js** (Estructura base para completar)

```javascript
// ============================================
// SISTEMA DE PLUGINS
// ============================================

const PluginSystem = (function() {
    // ============================================
    // ESTADO PRIVADO (Closures)
    // ============================================
    
    let plugins = {};  // { pluginName: pluginInstance }
    let activePlugins = new Set();
    let eventListeners = {};
    let stats = {
        tasksExecuted: 0,
        cacheHits: 0
    };
    
    // ============================================
    // SHARED UTILITIES (Disponibles para plugins)
    // ============================================
    
    const sharedUtils = {
        log: function(message, type = 'info') {
            // TU CÓDIGO AQUÍ:
            // Agregar log al DOM
            // type puede ser: 'info', 'error', 'success'
        },
        
        getStats: function() {
            return { ...stats };
        },
        
        incrementStat: function(statName) {
            if (stats.hasOwnProperty(statName)) {
                stats[statName]++;
                updateStatsUI();
            }
        }
    };
    
    // ============================================
    // API PÚBLICA
    // ============================================
    
    return {
        /**
         * Registrar plugin
         */
        registerPlugin: function(pluginName, pluginFactory) {
            // TU CÓDIGO AQUÍ:
            // 1. Verificar que no esté registrado
            // 2. Crear instancia con pluginFactory
            // 3. Inyectar sharedUtils vía bind() o call()
            // 4. Ejecutar hook onInstall
            // 5. Guardar en plugins
            // 6. Activar por defecto
            // 7. Actualizar UI
        },
        
        /**
         * Desregistrar plugin
         */
        unregisterPlugin: function(pluginName) {
            // TU CÓDIGO AQUÍ:
            // 1. Verificar que exista
            // 2. Ejecutar hook onUninstall
            // 3. Eliminar de plugins
            // 4. Eliminar de activePlugins
            // 5. Actualizar UI
        },
        
        /**
         * Activar plugin
         */
        activatePlugin: function(pluginName) {
            // TU CÓDIGO AQUÍ:
            // 1. Verificar que exista y no esté activo
            // 2. Ejecutar hook onActivate
            // 3. Agregar a activePlugins
            // 4. Actualizar UI
        },
        
        /**
         * Desactivar plugin
         */
        deactivatePlugin: function(pluginName) {
            // TU CÓDIGO AQUÍ:
            // 1. Verificar que exista y esté activo
            // 2. Ejecutar hook onDeactivate
            // 3. Eliminar de activePlugins
            // 4. Actualizar UI
        },
        
        /**
         * Ejecutar tarea (interceptada por plugins)
         */
        executeTask: function(input) {
            // TU CÓDIGO AQUÍ:
            // 1. Incrementar contador de tareas
            // 2. Emitir evento 'beforeTask'
            // 3. Ejecutar la tarea (ej: calcular factorial)
            // 4. Emitir evento 'afterTask'
            // 5. Retornar resultado
        },
        
        /**
         * Event system
         */
        on: function(eventName, callback) {
            // TU CÓDIGO AQUÍ:
            // Agregar listener a eventListeners
        },
        
        emit: function(eventName, data) {
            // TU CÓDIGO AQUÍ:
            // Ejecutar todos los listeners de ese evento
        },
        
        /**
         * Obtener info de plugins
         */
        getPluginInfo: function(pluginName) {
            // TU CÓDIGO AQUÍ:
            // Retornar info del plugin
        },
        
        getAllPlugins: function() {
            return Object.keys(plugins);
        },
        
        getActivePlugins: function() {
            return Array.from(activePlugins);
        },
        
        /**
         * Inicializar sistema
         */
        init: function() {
            // TU CÓDIGO AQUÍ:
            // 1. Configurar event listeners del DOM
            // 2. Renderizar UI inicial
            // 3. Log de inicio
        }
    };
    
    // ============================================
    // FUNCIONES PRIVADAS (Closures)
    // ============================================
    
    function updateStatsUI() {
        // TU CÓDIGO AQUÍ:
        // Actualizar elementos del DOM con stats
    }
    
    function renderPluginsList() {
        // TU CÓDIGO AQUÍ:
        // Renderizar lista de plugins en sidebar
    }
    
    function executeLifecycleHook(plugin, hookName, data) {
        // TU CÓDIGO AQUÍ:
        // Ejecutar hook si existe en el plugin
        // Usar call() o apply() para pasar contexto correcto
    }
})();
```

---

### **plugins/logger.js** (Ejemplo completo)

```javascript
// ============================================
// LOGGER PLUGIN
// ============================================

/**
 * Plugin que loggea todas las tareas ejecutadas
 */
const LoggerPlugin = (function() {
    // ============================================
    // FACTORY FUNCTION
    // ============================================
    
    return function createLoggerPlugin(utils) {
        // Estado privado del plugin (closure)
        let logs = [];
        let enabled = true;
        
        return {
            // Metadata
            name: 'Logger',
            version: '1.0.0',
            description: 'Registra todas las tareas ejecutadas',
            
            // ============================================
            // LIFECYCLE HOOKS
            // ============================================
            
            onInstall: function() {
                utils.log('[Logger] Plugin instalado', 'success');
            },
            
            onActivate: function() {
                enabled = true;
                utils.log('[Logger] Plugin activado', 'success');
                
                // Suscribirse a eventos
                PluginSystem.on('beforeTask', this.logBeforeTask.bind(this));
                PluginSystem.on('afterTask', this.logAfterTask.bind(this));
            },
            
            onDeactivate: function() {
                enabled = false;
                utils.log('[Logger] Plugin desactivado', 'info');
            },
            
            onUninstall: function() {
                logs = [];
                utils.log('[Logger] Plugin desinstalado', 'info');
            },
            
            // ============================================
            // MÉTODOS DEL PLUGIN
            // ============================================
            
            logBeforeTask: function(data) {
                if (!enabled) return;
                
                const timestamp = new Date().toLocaleTimeString();
                const logEntry = `[${timestamp}] Ejecutando tarea con input: ${data.input}`;
                
                logs.push(logEntry);
                utils.log(logEntry, 'info');
            },
            
            logAfterTask: function(data) {
                if (!enabled) return;
                
                const timestamp = new Date().toLocaleTimeString();
                const logEntry = `[${timestamp}] Tarea completada. Resultado: ${data.result}`;
                
                logs.push(logEntry);
                utils.log(logEntry, 'success');
            },
            
            getLogs: function() {
                return [...logs];  // Retornar copia
            },
            
            clearLogs: function() {
                logs = [];
                utils.log('[Logger] Logs limpiados', 'info');
            }
        };
    };
})();

// Registrar plugin al cargar
if (typeof PluginSystem !== 'undefined') {
    PluginSystem.registerPlugin('Logger', LoggerPlugin);
}
```

---

### **plugins/validator.js** (Para completar)

```javascript
// ============================================
// VALIDATOR PLUGIN
// ============================================

const ValidatorPlugin = (function() {
    return function createValidatorPlugin(utils) {
        // TU CÓDIGO AQUÍ:
        // Estado privado
        let validationRules = {
            // Reglas de validación
        };
        
        return {
            name: 'Validator',
            version: '1.0.0',
            description: 'Valida inputs antes de ejecutar tareas',
            
            // Lifecycle hooks
            onInstall: function() {
                // TU CÓDIGO AQUÍ
            },
            
            onActivate: function() {
                // TU CÓDIGO AQUÍ
                // Suscribirse a 'beforeTask'
                // Validar input
                // Si falla, lanzar error o bloquear ejecución
            },
            
            onDeactivate: function() {
                // TU CÓDIGO AQUÍ
            },
            
            onUninstall: function() {
                // TU CÓDIGO AQUÍ
            },
            
            // Métodos
            validateInput: function(input) {
                // TU CÓDIGO AQUÍ:
                // Verificar que sea número
                // Verificar que sea >= 0
                // Verificar que sea <= 20 (para factorial)
                // Si falla, lanzar error
            }
        };
    };
})();

if (typeof PluginSystem !== 'undefined') {
    PluginSystem.registerPlugin('Validator', ValidatorPlugin);
}
```

---

### **plugins/cache.js** (Para completar)

```javascript
// ============================================
// CACHE PLUGIN
// ============================================

const CachePlugin = (function() {
    return function createCachePlugin(utils) {
        // TU CÓDIGO AQUÍ:
        // Estado privado
        let cache = {};  // { input: result }
        let hits = 0;
        let misses = 0;
        
        return {
            name: 'Cache',
            version: '1.0.0',
            description: 'Cachea resultados de tareas',
            
            // Lifecycle hooks
            onInstall: function() {
                // TU CÓDIGO AQUÍ
            },
            
            onActivate: function() {
                // TU CÓDIGO AQUÍ
                // Suscribirse a 'beforeTask'
                // Si existe en cache, retornar desde cache
                // Suscribirse a 'afterTask'
                // Guardar resultado en cache
            },
            
            onDeactivate: function() {
                // TU CÓDIGO AQUÍ
            },
            
            onUninstall: function() {
                // TU CÓDIGO AQUÍ
                // Limpiar cache
            },
            
            // Métodos
            getCached: function(key) {
                // TU CÓDIGO AQUÍ:
                // Si existe en cache:
                //   - Incrementar hits
                //   - Loggear "Cache hit"
                //   - Retornar valor
                // Si no:
                //   - Incrementar misses
                //   - Retornar null
            },
            
            setCached: function(key, value) {
                // TU CÓDIGO AQUÍ:
                // Guardar en cache
                // Loggear "Guardado en cache"
            },
            
            getStats: function() {
                return {
                    hits,
                    misses,
                    size: Object.keys(cache).length
                };
            },
            
            clearCache: function() {
                cache = {};
                hits = 0;
                misses = 0;
                utils.log('[Cache] Cache limpiado', 'info');
            }
        };
    };
})();

if (typeof PluginSystem !== 'undefined') {
    PluginSystem.registerPlugin('Cache', CachePlugin);
}
```

---

## 💡 HINTS GENERALES

### **Hint 1: Inyección de dependencias**

```javascript
// Cuando registras un plugin:
registerPlugin: function(pluginName, pluginFactory) {
    // pluginFactory es una función que retorna el plugin
    // Pasarle sharedUtils para que el plugin pueda usarlos
    
    const pluginInstance = pluginFactory(sharedUtils);
    //                                   ↑
    //                          Inyectar dependencias
}
```

---

### **Hint 2: Lifecycle hooks con call()**

```javascript
function executeLifecycleHook(plugin, hookName, data) {
    if (typeof plugin[hookName] === 'function') {
        // Ejecutar hook con "this" = plugin
        plugin[hookName].call(plugin, data);
        //                ↑
        //          Preservar contexto
    }
}
```

---

### **Hint 3: Event listeners**

```javascript
on: function(eventName, callback) {
    if (!eventListeners[eventName]) {
        eventListeners[eventName] = [];
    }
    eventListeners[eventName].push(callback);
},

emit: function(eventName, data) {
    if (eventListeners[eventName]) {
        eventListeners[eventName].forEach(callback => {
            callback(data);
        });
    }
}
```

---

### **Hint 4: Method borrowing para utils**

```javascript
// En el plugin, querés usar utils pero preservar "this"
onActivate: function() {
    // ✅ Usar arrow function o bind
    PluginSystem.on('beforeTask', (data) => {
        this.handleTask(data);  // "this" = plugin
    });
    
    // O con bind:
    PluginSystem.on('beforeTask', this.handleTask.bind(this));
}
```

---

### **Hint 5: Tarea de ejemplo (factorial)**

```javascript
executeTask: function(input) {
    stats.tasksExecuted++;
    updateStatsUI();
    
    // Emitir evento ANTES
    this.emit('beforeTask', { input });
    
    // Ejecutar tarea
    function factorial(n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }
    
    const result = factorial(Number(input));
    
    // Emitir evento DESPUÉS
    this.emit('afterTask', { input, result });
    
    return result;
}
```

---

## 📊 RESULTADO ESPERADO

### **Al completar el proyecto:**

**Consola:**
```
[Logger] Plugin instalado
[Validator] Plugin instalado
[Cache] Plugin instalado
[Logger] Plugin activado
[Validator] Plugin activado
[Cache] Plugin activado

=== EJECUTAR TAREA: input = 5 ===
[Validator] Validando input: 5
[Validator] Input válido ✓
[Cache] Cache miss para: 5
[Logger] Ejecutando tarea con input: 5
Calculando factorial(5)...
[Logger] Tarea completada. Resultado: 120
[Cache] Guardado en cache: 5 → 120

=== EJECUTAR TAREA: input = 5 (otra vez) ===
[Validator] Validando input: 5
[Validator] Input válido ✓
[Cache] Cache hit para: 5
[Cache] Retornando desde cache: 120
(No se ejecuta factorial, se retorna desde cache)
```

**UI:**
```
Plugins Instalados:
✅ Logger (activo)
✅ Validator (activo)
✅ Cache (activo)

Estadísticas:
- Tareas ejecutadas: 2
- Cache hits: 1
- Plugins activos: 3

Logs:
[14:30:15] Ejecutando tarea con input: 5
[14:30:15] Tarea completada. Resultado: 120
[14:30:20] Cache hit para: 5
```

---

## ✅ CHECKLIST FINAL

**Core System:**
- [ ] Registro/desregistro de plugins funciona
- [ ] Lifecycle hooks se ejecutan
- [ ] Event system funciona (on/emit)
- [ ] sharedUtils accesibles por plugins

**Plugins:**
- [ ] Logger intercepta tareas
- [ ] Validator bloquea inputs inválidos
- [ ] Cache retorna resultados cacheados

**UI:**
- [ ] Lista de plugins se renderiza
- [ ] Activar/desactivar funciona
- [ ] Ejecutar tareas desde input
- [ ] Logs se muestran en tiempo real
- [ ] Stats se actualizan

**Conceptos aplicados:**
- [ ] Closures (estado privado)
- [ ] This (contexto correcto)
- [ ] Call/Apply/Bind (hooks, method borrowing)
- [ ] Decorators (interceptación)
- [ ] Factory functions
- [ ] Event system
- [ ] Module pattern

---

## 🎯 CRITERIOS DE EVALUACIÓN

**Sistema Core (30%):**
- Registro de plugins funcional
- Lifecycle hooks ejecutados correctamente
- Event system funcional

**Plugins (40%):**
- Logger intercepta correctamente
- Validator valida y bloquea
- Cache funciona (hits/misses)

**Integración (20%):**
- Plugins se comunican
- UI refleja estado del sistema
- No hay errores en consola

**Código (10%):**
- Closures para estado privado
- "this" correcto en métodos
- call/apply/bind usado apropiadamente

---

## 🚀 AL TERMINAR

**Has completado:**
- ✅ Proyecto Final del entrenamiento
- ✅ Integración de las 4 fases
- ✅ Sistema real y extensible
- ✅ Patterns profesionales

**Nivel alcanzado:** Mid-Senior en JavaScript fundamentals 🎉

---

## 💪 GOVERNOR ACTIVO

**Límites estrictos:**
- ⏱️ **Máximo 3 días** (9 horas total)
- 📅 **Día 1:** Core + Logger (3h)
- 📅 **Día 2:** Validator + Cache (3h)
- 📅 **Día 3:** UI + Integración (3h)
- ✅ **80% funcional = Suficiente**

**Si llegás al límite → SUBIR lo que tengas**

---

## 📝 NOTAS FINALES

**Este proyecto es el BOSS FIGHT final.**

Si lo completás correctamente, demostrás dominio de:
- Closures y scope
- This y contextos
- Call/Apply/Bind
- Decorators
- Event systems
- Factory functions
- Module patterns

**Es un proyecto de portfolio.** Podés mostrarlo en entrevistas.

---

**¡ÉXITO CON EL PROYECTO FINAL!** 🚀

Este es el último desafío del entrenamiento. Después de esto, tenés las bases sólidas para JavaScript avanzado.

---

**FIN DEL PROYECTO FINAL**

Versión: 1.0  
Duración: 3 días máximo  
Nivel: Boss Fight 🔥  
Conceptos: Todas las 4 fases integradas
