// ============================================
// CACHE PLUGIN
// ============================================

const CachePlugin = (function () {
  return function createCachePlugin(utils) {
    // TU CÓDIGO AQUÍ:
    // Estado privado
    let cache = {};  // { input: result }
    let hits = 0;
    let misses = 0;
    let enabled = true;

    return {
      name: 'Cache',
      version: '1.0.0',
      description: 'Cachea resultados de tareas',

      // Lifecycle hooks
      onInstall: function () {
        // TU CÓDIGO AQUÍ
        // utils.log('[Cache] Plugin instalado', 'success');
        PluginSystem.on('beforeTask', (data) => {
          // Checkear si existe en cache
          if(!enabled) return;
          const cachedValue = this.getCached(data.input);

          if (cachedValue !== null) {
            // ✅ Cache HIT
            // Setear flag para que Core NO ejecute la tarea
            data.fromCache = true;
            data.cachedResult = cachedValue;
          } else {
            data.fromCache = false;
          }
        });

        PluginSystem.on('afterTask', (data) => {
          // Solo guardar si NO vino desde cache
          if (!data.fromCache) {
            this.setCached(data.input, data.result);
          }
        });
      },

      onActivate: function () {
        // TU CÓDIGO AQUÍ
        // Suscribirse a 'beforeTask'
        // Si existe en cache, retornar desde cache
        // Suscribirse a 'afterTask'
        // Guardar resultado en cache
        enabled = true;
        utils.log('[Cache] Plugin activado', 'success');
      },

      onDeactivate: function () {
        // TU CÓDIGO AQUÍ
        enabled = false;
        utils.log('[Cache] Plugin desactivado', 'info');
      },

      onUninstall: function () {
        // TU CÓDIGO AQUÍ
        // Limpiar cache
        cache = {};
        hits = 0;
        misses = 0;
        utils.log('[Cache] Plugin desinstalado', 'info');
      },

      // ============================================
      // MÉTODOS DEL PLUGIN
      // ============================================

      getCached: function (key) {
        // TU CÓDIGO AQUÍ:
        // Si existe en cache:
        //   - Incrementar hits
        //   - Loggear "Cache hit"
        //   - Retornar valor
        // Si no:
        //   - Incrementar misses
        //   - Retornar null
        if(!enabled) return;
        const cacheKey = String(key);
        if (cache[cacheKey]) {
          hits += 1;
          utils.log('[Cache] Cache hit', 'success');
          return cache[cacheKey];
        } else {
          misses += 1;
          return null;
        }
      },

      setCached: function (key, value) {
        // TU CÓDIGO AQUÍ:
        // Guardar en cache
        // Loggear "Guardado en cache"
        if(!enabled) return;
        const cacheKey = String(key);
        cache[cacheKey] = value;
        utils.log(`[Cache] 💾 Guardado en cache: ${key} → ${value}`, 'info');
      },

      getStats: function () {
        return {
          hits,
          misses,
          size: Object.keys(cache).length
        };
      },

      clearCache: function () {
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
