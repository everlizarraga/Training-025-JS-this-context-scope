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

/**
 * @callback Validador
 * @param {string} texto
 * @returns {{valido: boolean, mensaje: string}}
 */

/**@typedef {'nombre'|'email'|'edad'|'password'} CamposId */

App.Validators = (function () {
  // Variables privadas del módulo (si las necesitás)
  // Por ejemplo, podrías tener reglas de validación aquí

  // Validador de nombre
  /**
   * Valida Nombre
   * @type {Validador}
   */
  function validarNombre(nombre) {
    // 1. Verificar que no esté vacío
    if (!nombre || nombre === '') {
      return { valido: false, mensaje: 'El nombre es requerido' }
    }
    // 2. Verificar longitud mínima (3 caracteres)
    if (nombre.length < 3) {
      return { valido: false, mensaje: 'Se requiere 3 o mas acaracteres' }
    }
    // 3. Retornar objeto: { valido: true/false, mensaje: "..." }

    // TU CÓDIGO AQUÍ
    return { valido: true, mensaje: '' }
  }

  // Validador de email
  /**
   * Validador de email
   * @type {Validador}
   */
  function validarEmail(email) {
    // 1. Verificar que no esté vacío
    if (!email || email === '') {
      return { valido: false, mensaje: 'El email es requerido' }
    }
    // 2. Verificar formato con regex básica
    // 3. Retornar objeto: { valido: true/false, mensaje: "..." }
    // Regex sugerida: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return { valido: false, mensaje: 'Email invalido' }
    }
    // TU CÓDIGO AQUÍ
    return { valido: true, mensaje: '' }
  }

  // Validador de edad
  /**
   * Validar Edad
   * @type {Validador}
   */
  function validarEdad(edad) {
    // 1. Convertir a número
    const numero = Number.parseInt(edad);
    // 2. Verificar que esté entre 18 y 100
    if (!(numero >= 18 && numero <= 100)) {
      return { valido: false, mensaje: 'Edad requerida entre 18 y 100 años' }
    }
    // 3. Retornar objeto: { valido: true/false, mensaje: "..." }
    // TU CÓDIGO AQUÍ
    return { valido: true, mensaje: '' }
  }

  // Validador de contraseña
  /**@type {Validador} */
  function validarPassword(password) {
    // 1. Verificar que no esté vacío
    if (!password || password === '') {
      return { valido: false, mensaje: 'El password es requerido' }
    }
    // 2. Verificar longitud mínima (8 caracteres)
    if (password.length < 8) {
      return { valido: false, mensaje: 'Minimo 8 caracteres requerido' }
    }
    // 3. Retornar objeto: { valido: true/false, mensaje: "..." }
    // TU CÓDIGO AQUÍ
    return { valido: true, mensaje: '' }
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

App.UI = (function () {

  /**
   * Mostrar error en un campo
   * @param {CamposId} campoId 
   * @param {string} mensaje 
   */
  function mostrarError(campoId, mensaje) {
    // 1. Obtener el input
    const input = document.getElementById(campoId);
    // 2. Agregar clase "error"
    input.classList.add('error');
    // 3. Quitar clase "success" (si la tiene)
    input.classList.remove('success');
    // 4. Mostrar mensaje de error
    const contenedor = input.closest('.form-group');
    const divEror = /**@type {HTMLDivElement}*/(contenedor.querySelector('.error-message'));
    divEror.textContent = mensaje;
    divEror.style.display = 'block';
    // 5. Ocultar mensaje de éxito
    const divExito = /**@type {HTMLDivElement*/(contenedor.querySelector('.success-message'));
    divExito.style.display = 'none';
    // TU CÓDIGO AQUÍ

    console.log('Input:', input);
    console.log('Contenedor:', contenedor);
    console.log('Div Error:', divEror);
    console.log('Mensaje:', mensaje);

    if (!divEror) {
      console.error('❌ No se encontró el div de error para:', campoId);
      return;
    }
  }

  // Mostrar éxito en un campo
  function mostrarExito(campoId) {
    // 1. Obtener el input
    const input = document.getElementById(campoId);
    // 2. Agregar clase "success"
    input.classList.add('success');
    // 3. Quitar clase "error" (si la tiene)
    input.classList.remove('error');
    // 4. Ocultar mensaje de error
    const contenedor = input.closest('.form-group');
    const divEror = /**@type {HTMLDivElement}*/ (contenedor.querySelector('.error-message'));
    divEror.textContent = '';
    divEror.style.display = 'none';
    // 5. Mostrar mensaje de éxito
    const divExito = /**@type {HTMLDivElement*/(contenedor.querySelector('.success-message'));
    divExito.style.display = 'block';
    // TU CÓDIGO AQUÍ
  }

  /**
   * Limpiar estado de un campo
   * @param {CamposId} campoId 
   */
  function limpiarEstado(campoId) {
    // 1. Obtener el input
    const input = /**@type {HTMLInputElement} */ (document.getElementById(campoId));
    // 2. Quitar clases "error" y "success"
    input.classList.remove('error', 'success');
    // input.value = '';
    // 3. Ocultar todos los mensajes
    const contenedor = input.closest('.form-group');
    const divEror = /**@type {HTMLDivElement}*/ (contenedor.querySelector('.error-message'));
    divEror.textContent = '';
    divEror.style.display = 'none';
    const divExito = /**@type {HTMLDivElement*/(contenedor.querySelector('.success-message'));
    divExito.style.display = 'none';
    // TU CÓDIGO AQUÍ
  }

  // Mostrar mensaje de formulario enviado
  function mostrarFormularioExitoso() {
    // 1. Obtener elemento #formSuccess
    const formSuccess = document.getElementById('formSuccess');
    // 2. Agregar clase "show"
    formSuccess.classList.add('show');
    // 3. Opcional: ocultarlo después de 3 segundos
    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 3000);
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

App.FormHandler = (function () {

  // Variable privada: referencia al formulario
  /**@type {HTMLFormElement} */
  let form;

  // Inicializar el manejador
  function init() {
    // 1. Obtener el formulario
    form = document.getElementById('registrationForm');

    // 2. Agregar event listener al submit
    form.addEventListener('submit', manejarSubmit);

    // TU CÓDIGO AQUÍ
    const campos = ['nombre', 'email', 'edad', 'password'];
    campos.forEach(campoId => {
      const input = document.getElementById(campoId);

      // Validar cuando pierde el foco
      input.addEventListener('blur', () => {
        validarCampo(campoId);
      });

      // Limpiar mientras escribe
      input.addEventListener('input', () => {
        App.UI.limpiarEstado(campoId);
      });
    });
  }

  /**
   * Validar un campo individual
   * @param {CamposId} campoId 
   */
  function validarCampo(campoId) {
    // 1. Obtener el valor del input
    const input = document.getElementById(campoId);
    // 2. Llamar al validador correspondiente de App.Validators
    const validador = App.Validators[campoId](input.value);
    // 3. Si es válido -> App.UI.mostrarExito()
    // 4. Si es inválido -> App.UI.mostrarError()
    if (validador.valido) {
      App.UI.mostrarExito(campoId);
    } else {
      App.UI.mostrarError(campoId, validador.mensaje);
    }
    // 5. Retornar true/false
    return validador.valido;
    // Ejemplo:
    // const input = document.getElementById(campoId);
    // const resultado = App.Validators[campoId](input.value);
    // if (resultado.valido) { ... } else { ... }

    // TU CÓDIGO AQUÍ
  }

  // Validar todos los campos
  function validarFormulario() {
    const validados = [];
    // 1. Validar cada campo (nombre, email, edad, password)
    validados.push(validarCampo('nombre'));
    validados.push(validarCampo('email'));
    validados.push(validarCampo('edad'));
    validados.push(validarCampo('password'));
    // 2. Guardar resultados en array o variables
    // 3. Retornar true solo si TODOS son válidos
    return validados.every((e) => e);
    // TU CÓDIGO AQUÍ
  }

  /**
   * Manejar el evento submit
   * @param {Event} evento 
   */
  function manejarSubmit(evento) {
    // 1. Prevenir el submit default (evento.preventDefault())
    evento.preventDefault();
    // 2. Validar formulario completo
    // 3. Si es válido:
    //    - Mostrar mensaje de éxito
    //    - Opcional: limpiar formulario
    // 4. Si es inválido:
    //    - No hacer nada (los errores ya se mostraron)
    if (validarFormulario()) {
      App.UI.mostrarFormularioExitoso();
      App.UI.limpiarEstado('nombre');
      App.UI.limpiarEstado('email');
      App.UI.limpiarEstado('edad');
      App.UI.limpiarEstado('password');
    }
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

document.addEventListener('DOMContentLoaded', function () {
  App.FormHandler.init();
  // App.UI.mostrarFormularioExitoso();
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
