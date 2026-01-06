// ============================================
// SISTEMA DE PLUGINS
// ============================================

const PluginSystem = (function () {
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
    /** Agrega Log al DOM
     * @param {string} message
     * @param {'info'|'error'|'success'} type
     */
    log: function (message, type = 'info') {
      // TU CÓDIGO AQUÍ:
      // Agregar log al DOM
      // type puede ser: 'info', 'error', 'success'
      const logElemento = document.createElement('div');
      logElemento.classList.add('log-entry', `${type}`);
      const containerLogs = document.getElementById('logs-container');
      logElemento.textContent = message;
      // containerLogs.append(logElemento);
      containerLogs.prepend(logElemento);
      // console.log(logElemento);
    },

    getStats: function () {
      return { ...stats };
    },

    /**
     * Incrementar stats
     * @param {'tasksExecuted'|'cacheHits'} statName 
     */
    incrementStat: function (statName) {
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
    registerPlugin: function (pluginName, pluginFactory) {
      // TU CÓDIGO AQUÍ:
      // 1. Verificar que no esté registrado
      if (plugins[pluginName]) {
        // Si ya existe, no registrar otra vez
        sharedUtils.log(`[Sistema] Plugin "${pluginName}" ya está registrado`, 'error');
        return false;
      }
      // 2. Crear instancia con pluginFactory
      const pluginInstance = pluginFactory(sharedUtils);
      // 3. Inyectar sharedUtils vía bind() o call()
      // 4. Ejecutar hook onInstall
      executeLifecycleHook(pluginInstance, 'onInstall');
      // 5. Guardar en plugins
      plugins[pluginName] = pluginInstance;
      // 6. Activar por defecto
      activePlugins.add(pluginName);
      executeLifecycleHook(pluginInstance, 'onActivate');
      // 7. Actualizar UI
      renderPluginsList();
      updateStatsUI();

      sharedUtils.log(`[Sistema] Plugin "${pluginName}" registrado y activado`, 'success');

      return true;
    },

    /**
     * Desregistrar plugin
     */
    unregisterPlugin: function (pluginName) {
      // TU CÓDIGO AQUÍ:
      // 1. Verificar que exista
      if (!plugins[pluginName]) {
        sharedUtils.log(`[Sistema] Plugin "${pluginName}" no está registrado`, 'error');
        return false;
      }
      const pluginInstance = plugins[pluginName];
      // ✨ MEJORA: Si está activo, desactivarlo primero
      if (activePlugins.has(pluginName)) {
        executeLifecycleHook(pluginInstance, 'onDeactivate');
        activePlugins.delete(pluginName);
        sharedUtils.log(`[Sistema] Plugin "${pluginName}" desactivado antes de desinstalar`, 'info');
      }
      // 2. Ejecutar hook onUninstall
      executeLifecycleHook(pluginInstance, 'onUninstall');
      // 3. Eliminar de plugins
      delete plugins[pluginName];
      // 4. Eliminar de activePlugins
      activePlugins.delete(pluginName);
      // 5. Actualizar UI
      renderPluginsList();
      updateStatsUI();
      sharedUtils.log(`[Sistema] Plugin "${pluginName}" desinstalado`, 'success');

      return true;
    },

    /**
     * Activar plugin
     */
    activatePlugin: function (pluginName) {
      // TU CÓDIGO AQUÍ:
      // 1. Verificar que exista y no esté activo
      // 2. Ejecutar hook onActivate
      // 3. Agregar a activePlugins
      // 4. Actualizar UI
      if (!plugins[pluginName]) {
        sharedUtils.log(`[Sistema] Plugin "${pluginName}" no está registrado`, 'error');
        return false;
      }
      if (activePlugins.has(pluginName)) {
        sharedUtils.log(`[Sistema] Plugin "${pluginName}" ya esta activo`, 'error');
        return false;
      }
      const pluginInstance = plugins[pluginName];
      executeLifecycleHook(pluginInstance, 'onActivate');
      activePlugins.add(pluginName);
      renderPluginsList();
      updateStatsUI();
      sharedUtils.log(`[Sistema] Plugin "${pluginName}" Activado`, 'success');

      return true;
    },

    /**
     * Desactivar plugin
     */
    deactivatePlugin: function (pluginName) {
      // TU CÓDIGO AQUÍ:
      // 1. Verificar que exista y esté activo
      // 2. Ejecutar hook onDeactivate
      // 3. Eliminar de activePlugins
      // 4. Actualizar UI
      if (!plugins[pluginName]) {
        sharedUtils.log(`[Sistema] Plugin "${pluginName}" no está registrado`, 'error');
        return false;
      }
      if (!activePlugins.has(pluginName)) {
        sharedUtils.log(`[Sistema] Plugin "${pluginName}" in-activo`, 'error');
        return false;
      }
      const pluginInstance = plugins[pluginName];
      executeLifecycleHook(pluginInstance, 'onDeactivate');
      activePlugins.delete(pluginName);
      renderPluginsList();
      updateStatsUI();
      sharedUtils.log(`[Sistema] Plugin "${pluginName}" Desactivado`, 'success');

      return true;
    },

    /**
     * Ejecutar tarea (interceptada por plugins)
     */
    executeTask: function (input) {
      // TU CÓDIGO AQUÍ:
      // 1. Incrementar contador de tareas
      // 2. Emitir evento 'beforeTask'
      // 3. Ejecutar la tarea (ej: calcular factorial)
      // 4. Emitir evento 'afterTask'
      // 5. Retornar resultado
      sharedUtils.incrementStat('tasksExecuted');
      const data = { input: input, fromCache: false, isBlocked: false};
      this.emit('beforeTask', data);
      let rpta;
      const resultElement = document.getElementById('result-value');
      if(!data.isBlocked) {
        if(data.fromCache) {
          rpta = data.cachedResult;
          sharedUtils.incrementStat('cacheHits');
        } else {
          rpta = factorial(Number.parseInt(input)); 
        }
        this.emit('afterTask', {result: rpta, ...data});
        resultElement.textContent = rpta;
      } else {
        resultElement.textContent = data.error;
      }
      return rpta;
    },

    /**
     * Event system On
     * @param {'beforeTask'|'afterTask'} eventName
     * @param {Function} callback
     */
    on: function (eventName, callback) {
      // TU CÓDIGO AQUÍ:
      // Agregar listener a eventListeners
      eventListeners[eventName] = eventListeners[eventName] || [];
      eventListeners[eventName].push(callback);
    },

    /**
     * Event system Emit
     * @param {'beforeTask'|'afterTask'} eventName 
     * @param {Object} data 
     */
    emit: function (eventName, data) {
      // TU CÓDIGO AQUÍ:
      // Ejecutar todos los listeners de ese evento
      if (eventListeners[eventName]) {
        eventListeners[eventName].forEach(callback => {
          callback(data);
        });
      }
    },

    /**
     * Obtener info de plugins
     */
    getPluginInfo: function (pluginName) {
      // TU CÓDIGO AQUÍ:
      // Retornar info del plugin
      if (!plugins[pluginName]) {
        return null;
      }

      const plugin = plugins[pluginName];

      return {
        name: plugin.name,
        version: plugin.version,
        description: plugin.description,
        isActive: activePlugins.has(pluginName)
      };
    },

    getAllPlugins: function () {
      return Object.keys(plugins);
    },

    getActivePlugins: function () {
      return Array.from(activePlugins);
    },

    /**
     * Inicializar sistema
     */
    init: function () {
      // TU CÓDIGO AQUÍ:
      // 1. Configurar event listeners del DOM
      // 2. Renderizar UI inicial
      // 3. Log de inicio
      const inputElement = document.getElementById('task-input');
      const btnEjecutar = document.getElementById('btn-execute');
      const btnLimpiarLogs = document.getElementById('btn-clear-logs');
      const containerLogs = document.getElementById('logs-container');
      const containerPlugins = document.getElementById('plugin-list');

      //Listeners
      btnEjecutar.addEventListener('click', () => {
        const valor = inputElement.value;
        this.executeTask(valor);
      });

      btnLimpiarLogs.addEventListener('click', () => {
        containerLogs.innerHTML = '';
      });

      inputElement.addEventListener('keydown', (event) => {
        if (event.key === "Enter") {
          const valor = inputElement.value;
          this.executeTask(valor);
        }
      });

      containerPlugins.addEventListener('click', (event) => {
        const btn = event.target.closest('button');
        if (btn) {
          const pluginName = btn.dataset.plugin;
          const action = btn.dataset.action;
          if (action === 'activate') {
            PluginSystem.activatePlugin(pluginName);
          } else {
            PluginSystem.deactivatePlugin(pluginName);
          }
        }
      });
    }
  };

  // ============================================
  // FUNCIONES PRIVADAS (Closures)
  // ============================================

  function updateStatsUI() {
    // TU CÓDIGO AQUÍ:
    // Actualizar elementos del DOM con stats
    const ejecutadas = document.getElementById('stat-tasks');
    const cacheHits = document.getElementById('stat-cache-hits');
    const activos = document.getElementById('stat-plugins');
    const actualStats = sharedUtils.getStats();
    ejecutadas.textContent = actualStats.tasksExecuted;
    cacheHits.textContent = actualStats.cacheHits;
    activos.textContent = activePlugins.size;
  }

  function renderPluginsList() {
    // TU CÓDIGO AQUÍ:
    // Renderizar lista de plugins en sidebar
    const listContainer = document.getElementById('plugin-list');
    if (!listContainer) {
      console.error('[Sistema] No se encontró elemento #plugin-list');
      return;
    }
    listContainer.innerHTML = '';

    const pluginNames = Object.keys(plugins);

    if (pluginNames.length === 0) {
      // No hay plugins instalados
      listContainer.innerHTML = '<li style="text-align: center; color: #999;">No hay plugins instalados</li>';
      return;
    }

    pluginNames.forEach(pluginName => {
      const plugin = plugins[pluginName];
      const isActive = activePlugins.has(pluginName);

      const li = document.createElement('li');
      li.className = `plugin-item ${isActive ? 'active' : 'inactive'}`;

      li.innerHTML = `
        <div class="plugin-info">
          <div class="plugin-name">${plugin.name}</div>
          <div class="plugin-status">
            ${plugin.version} - ${isActive ? '✅ Activo' : '❌ Inactivo'}
          </div>
        </div>
        <button 
          class="btn ${isActive ? 'btn-danger' : 'btn-success'}" 
          data-plugin="${pluginName}"
          data-action="${isActive ? 'deactivate' : 'activate'}"
        >
          ${isActive ? 'Desactivar' : 'Activar'}
        </button>
        `;

      listContainer.appendChild(li);
    });
  }

  /**
   * Lifecycle Hook
   * @param {Object} plugin 
   * @param {'onActivate'|'onDeactivate'|'onInstall'|'onUninstall'} hookName 
   * @param {Object} data 
   * @returns 
   */
  function executeLifecycleHook(plugin, hookName, data) {
    // TU CÓDIGO AQUÍ:
    // Ejecutar hook si existe en el plugin
    // Usar call() o apply() para pasar contexto correcto
    if (typeof plugin[hookName] !== 'function') {
      // El plugin no tiene este hook, no hacer nada
      return;
    }

    try {
      // Usar call() para preservar "this" = plugin
      plugin[hookName].call(plugin, data);
    } catch (error) {
      // Si el hook falla, loguear error pero no romper el sistema
      sharedUtils.log(`[Sistema] Error en hook "${hookName}" de plugin "${plugin.name}": ${error.message}`, 'error');
      console.error(error);
    }
  }
})();

function factorial(n) {
  if (n == 0) return 1;
  return n * factorial(n - 1);
}
