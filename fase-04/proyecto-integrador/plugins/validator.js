// ============================================
// VALIDATOR PLUGIN
// ============================================

const ValidatorPlugin = (function () {
  return function createValidatorPlugin(utils) {
    // TU CÓDIGO AQUÍ:
    // Estado privado
    let validationRules = {
      // Reglas de validación
      validarVacio: function (valor) {
        const parseado = Number(valor);
        return {
          isValid: !isNaN(parseado),
          error: 'El valor ingresado no es un numero'
        };
      },
      validaNumeroAceptable: function (valor) {
        const parseado = Number(valor);
        return {
          isValid: parseado >= 0,
          error: 'El valor ingresado debe ser >= 0'
        };
      },
      validarRango: function (valor) {
        const parseado = Number(valor);
        return {
          isValid: parseado <= 20,
          error: 'El factorial solo acepta números <= 20'
        };
      }
    };
    let enabled = true;

    return {
      name: 'Validator',
      version: '1.0.0',
      description: 'Valida inputs antes de ejecutar tareas',

      // Lifecycle hooks
      onInstall: function () {
        // TU CÓDIGO AQUÍ
        PluginSystem.on('beforeTask', (data) => {
          data.isBlocked = false;
          if (!enabled) return;
          let error;
          let esValido = Object.keys(validationRules)
            .map((validadorName) => {
              return validationRules[validadorName](data.input);
            })
            .every(e => {
              if (!e.isValid) { error = e.error };
              return e.isValid;
            });
          data.isBlocked = !esValido;
          data.error = error;
        });
      },

      onActivate: function () {
        // TU CÓDIGO AQUÍ
        // Suscribirse a 'beforeTask'
        // Validar input
        // Si falla, lanzar error o bloquear ejecución
        enabled = true;
        utils.log('[Validador] Plugin activado', 'success');
      },

      onDeactivate: function () {
        // TU CÓDIGO AQUÍ
        enabled = false;
        utils.log('[Validador] Plugin desactivado', 'info');
      },

      onUninstall: function () {
        // TU CÓDIGO AQUÍ
        utils.log('[Validador] Plugin desinstalado', 'info');
      },

      // Métodos
      validateInput: function (input) {
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