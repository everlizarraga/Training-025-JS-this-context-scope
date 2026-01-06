// ============================================
// LOGGER PLUGIN
// ============================================

/**
 * Plugin que loggea todas las tareas ejecutadas
 */
const LoggerPlugin = (function () {
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

      onInstall: function () {
        utils.log('[Logger] Plugin instalado', 'success');
        // Suscribirse a eventos
        PluginSystem.on('beforeTask', this.logBeforeTask.bind(this));
        PluginSystem.on('afterTask', this.logAfterTask.bind(this));
      },

      onActivate: function () {
        enabled = true;
        utils.log('[Logger] Plugin activado', 'success');
      },

      onDeactivate: function () {
        enabled = false;
        utils.log('[Logger] Plugin desactivado', 'info');
      },

      onUninstall: function () {
        logs = [];
        utils.log('[Logger] Plugin desinstalado', 'info');
      },

      // ============================================
      // MÉTODOS DEL PLUGIN
      // ============================================

      logBeforeTask: function (data) {
        if (!enabled) return;

        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] Ejecutando tarea con input: ${data.input}`;

        logs.push(logEntry);
        utils.log(logEntry, 'info');
      },

      logAfterTask: function (data) {
        if (!enabled) return;

        const timestamp = new Date().toLocaleTimeString();
        const logEntry = `[${timestamp}] Tarea completada. Resultado: ${data.result}`;

        logs.push(logEntry);
        utils.log(logEntry, 'success');
      },

      getLogs: function () {
        return [...logs];  // Retornar copia
      },

      clearLogs: function () {
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