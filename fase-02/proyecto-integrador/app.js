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

/**
 * @typedef {Object} Tarea
 * @property {function(): number} getId - Obtiene el ID de la tarea
 * @property {function(): string} getTitulo - Obtiene el título de la tarea
 * @property {function(string): void} setTitulo - Establece un nuevo título
 * @property {function(): boolean} isCompletada - Verifica si la tarea está completada
 * @property {function(): boolean} toggleCompletada - Alterna el estado de completada
 * @property {function(): Date} getFechaCreacion - Obtiene la fecha de creación
 * @property {function(): Object} toJSON - Serializa la tarea para guardar
 */

/**
 * @typedef {Object} TareaCore
 * @property {string} id
 * @property {string} titulo
 * @property {boolean} completada
 * @property {string} fechaCreacion
 */


/**
 * 
 * @param {string} titulo 
 * @param {string | null} id 
 * @param {TareaCore} tareaCore
 * @returns {Tarea}
 */
function crearTarea(titulo, id = null, tareaCore = null) {
  // Datos PRIVADOS (closures)
  let _id = `${id || Date.now()}`;
  let _titulo = titulo;
  let _completada = false;
  let _fechaCreacion = new Date();

  if (tareaCore) {
    _id = tareaCore.id;
    _titulo = tareaCore.titulo;
    _completada = tareaCore.completada;
    _fechaCreacion = new Date(tareaCore.fechaCreacion);
  }

  // Métodos PÚBLICOS
  return {
    getId: function () {
      return _id;
    },

    getTitulo: function () {
      return _titulo;
    },

    setTitulo: function (nuevoTitulo) {
      _titulo = nuevoTitulo;
    },

    isCompletada: function () {
      return _completada;
    },

    toggleCompletada: function () {
      _completada = !_completada;
      return _completada;
    },

    getFechaCreacion: function () {
      return _fechaCreacion;
    },

    // Serializar para guardar en localStorage
    toJSON: function () {
      return {
        id: _id, // number
        titulo: _titulo, // string
        completada: _completada, // boolean
        fechaCreacion: _fechaCreacion.toISOString() // string
      };
    }
  };
}



// ============================================
// MÓDULO 2: ESTADO (State Management)
// ============================================
App.State = (function () {
  // Array PRIVADO de tareas
  /**@type {Tarea[]} */
  let tareas = [];

  return {
    /**
     * Agregar tarea
     * @param {Tarea} tarea 
     */
    agregarTarea: function (tarea) {
      // TU CÓDIGO AQUÍ
      // 1. Agregar tarea al array
      // 2. Emitir evento 'tareaAgregada'
      tareas.push(tarea);
      App.EventBus.emit('tareaAgregada', tarea);
    },

    // Eliminar tarea por ID
    eliminarTarea: function (id) {
      // TU CÓDIGO AQUÍ
      // 1. Encontrar índice de la tarea
      // 2. Eliminar del array
      // 3. Emitir evento 'tareaEliminada'
      const index = tareas.findIndex(e => e.getId() == id);
      const [tareaEliminada] = tareas.splice(index, 1);
      App.EventBus.emit('tareaEliminada', tareaEliminada);
    },

    // Obtener todas las tareas
    obtenerTareas: function () {
      // TU CÓDIGO AQUÍ
      // Retornar array de tareas
      return [...tareas];
    },

    // Obtener tarea por ID
    obtenerTareaPorId: function (id) {
      // TU CÓDIGO AQUÍ
      // Buscar y retornar tarea
      return tareas.find(e => e.getId() == id);
    },

    // Toggle completada
    toggleTarea: function (id) {
      // TU CÓDIGO AQUÍ
      // 1. Encontrar tarea
      // 2. Toggle completada
      // 3. Emitir evento 'tareaModificada'
      const target = App.State.obtenerTareaPorId(id);
      if (target) {
        target.toggleCompletada();
        App.EventBus.emit('tareaModificada', target);
      }

    },

    /**
     * Cargar tareas (desde localStorage)
     * @param {TareaCore[]} tareasData 
     */
    cargarTareas: function (tareasData) {
      // TU CÓDIGO AQUÍ
      // Recrear tareas desde JSON
      tareasData.forEach(e => {
        const task = crearTarea(null, null, e);
        App.State.agregarTarea(task);
      })
    }
  };
})();

// ============================================
// MÓDULO 3: EVENT BUS (Observer/PubSub)
// ============================================
App.EventBus = (function () {
  // Objeto PRIVADO de eventos
  const eventos = {};

  return {
    // Suscribirse a un evento
    on: function (evento, callback) {
      // TU CÓDIGO AQUÍ
      // Agregar callback al array de eventos[evento]
      if (!eventos[evento]) eventos[evento] = [];
      eventos[evento].push(callback);
    },

    // Emitir un evento
    emit: function (evento, data) {
      // TU CÓDIGO AQUÍ
      // Ejecutar todos los callbacks del evento
      if (eventos[evento]) {
        eventos[evento].forEach(cb => cb(data));
      }
    }
  };
})();

// ============================================
// MÓDULO 4: FILTROS (con Memoization)
// ============================================
/**@typedef {'todas'|'pendientes'|'completadas'} StateFilter */

App.Filters = (function () {
  // Caché PRIVADO
  let cache = {};

  return {
    /**
     * Filtrar tareas por estado
     * @param {Tarea[]} tareas 
     * @param {StateFilter} filtro 
     * @returns {Tarea[]}
     */
    filtrarPorEstado: function (tareas, filtro) {
      // TU CÓDIGO AQUÍ
      // 1. Crear key del caché
      // 2. Si está en caché, retornar
      // 3. Filtrar tareas según filtro
      // 4. Guardar en caché y retornar
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
    },

    /**
     * Buscar tareas por texto
     * @param {Tarea[]} tareas 
     * @param {string} texto 
     * @returns {Tarea[]}
     */
    buscarTareas: function (tareas, texto) {
      // TU CÓDIGO AQUÍ
      // Filtrar tareas cuyo título incluya el texto
      if (!texto || texto == '') return tareas;
      return tareas.filter(t =>
        t.getTitulo().toLowerCase().includes(texto.toLowerCase()));
    },

    // Limpiar caché (cuando cambian las tareas)
    limpiarCache: function () {
      // TU CÓDIGO AQUÍ
      // Vaciar objeto cache
      cache = {};  // ✅ Resetear caché
      console.log('[CACHE] Caché de filtros limpiado');
    }
  };
})();

// ============================================
// MÓDULO 5: ESTADÍSTICAS (con Memoization)
// ============================================
/**
 * @typedef {{total: number, completadas: number, pendientes: number}} Estadstcas
 */

App.Stats = (function () {
  // Caché PRIVADO
  let cache = {};

  return {
    /**
     * Calcular estadisticas
     * @param {Tarea[]} tareas 
     * @returns {Estadstcas}
     */
    calcularEstadisticas: function (tareas) {
      // TU CÓDIGO AQUÍ
      // 1. Crear key del caché
      // 2. Si está en caché, retornar
      // 3. Calcular total, completadas, pendientes
      // 4. Guardar en caché y retornar objeto con stats
      const coso = [...tareas].sort((a, b) =>
        Number.parseInt(a.getId()) -
        Number.parseInt(b.getId())
      ).map(e => e.getId());
      const key = coso.join('-');

      if (key in cache) {
        return cache[key];
      }

      /**@type {Estadstcas} */
      const rpta = {
        total: tareas.length,
        completadas: tareas.filter(e => e.isCompletada()).length,
        pendientes: tareas.filter(e => !e.isCompletada()).length
      };
      cache[key] = rpta;
      return rpta;
    },

    limpiarCache: function () {
      // TU CÓDIGO AQUÍ
      cache = {};
    }
  };
})();

// ============================================
// MÓDULO 6: LOCAL STORAGE
// ============================================
App.Storage = (function () {
  const STORAGE_KEY = 'todoApp_tareas';

  return {
    /**
     * Guarda tareas en localStorage
     * @param {Tarea[]} tareas 
     */
    guardar(tareas) {
      // TU CÓDIGO AQUÍ
      // Serializar tareas y guardar en localStorage
      const coso = JSON.stringify(tareas.map(e => e.toJSON()));
      localStorage.setItem(STORAGE_KEY, coso);
    },

    cargar() {
      // TU CÓDIGO AQUÍ
      // Cargar tareas desde localStorage
      // Retornar array de objetos JSON
      const coso = localStorage.getItem(STORAGE_KEY);
      if (coso) {
        /**@type {TareaCore[]} */
        const listaTreasCore = JSON.parse(coso);
        App.State.cargarTareas(listaTreasCore);
      }
    }
  };
})();

// ============================================
// MÓDULO 7: UI (Renderizado)
// ============================================
App.UI = (function () {
  // Referencias a elementos del DOM
  const elementos = {
    tasksContainer: document.getElementById('tasksContainer'),
    listaTareas: document.getElementById('listaTareas'),
    tareaVacia: document.querySelector('#tasksContainer .empty-state'),
    nuevaTareaInput: document.getElementById('nuevaTareaInput'),
    agregarBtn: document.getElementById('agregarBtn'),
    buscarInput: document.getElementById('buscarInput'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    statTotal: document.getElementById('statTotal'),
    statCompletadas: document.getElementById('statCompletadas'),
    statPendientes: document.getElementById('statPendientes')
  };

  // Estado local del UI
  let filtroActual = /**@type {StateFilter} */ ('todas');
  let busquedaActual = '';

  return {
    // Renderizar todas las tareas
    renderizarTareas: function () {
      // TU CÓDIGO AQUÍ
      // 1. Obtener tareas del State
      // 2. Aplicar filtro actual
      // 3. Aplicar búsqueda actual
      // 4. Renderizar cada tarea
      // 5. Si no hay tareas, mostrar empty state
      const tareas = App.State.obtenerTareas();
      const tareaConfiltro = App.Filters.filtrarPorEstado(tareas, filtroActual);
      const tareaConFiltroYBusqueda = App.Filters.buscarTareas(tareaConfiltro, busquedaActual);
      if (tareaConFiltroYBusqueda.length == 0) {
        elementos.tareaVacia.style.display = 'block';
        elementos.listaTareas.replaceChildren();
      } else {
        elementos.tareaVacia.style.display = 'none';
        elementos.listaTareas.replaceChildren();
        tareaConFiltroYBusqueda.forEach(task => {
          const card = App.UI.renderizarTarea(task);
          elementos.listaTareas.append(card);
        })
      }
    },

    // Renderizar una tarea individual
    renderizarTarea: function (tarea) {
      // TU CÓDIGO AQUÍ
      // 1. Crear elemento div.task-item
      // 2. Agregar checkbox, título, fecha, botón eliminar
      // 3. Agregar event listeners
      // 4. Retornar elemento
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
    },

    // Actualizar estadísticas
    actualizarEstadisticas: function () {
      // TU CÓDIGO AQUÍ
      // 1. Obtener stats del módulo Stats
      // 2. Actualizar elementos del DOM
      const tareas = App.State.obtenerTareas();
      const tareaConfiltro = App.Filters.filtrarPorEstado(tareas, filtroActual);
      const tareaConFiltroYBusqueda = App.Filters.buscarTareas(tareaConfiltro, busquedaActual);
      const estadisticas = App.Stats.calcularEstadisticas(tareaConFiltroYBusqueda);
      elementos.statTotal.textContent = `${estadisticas.total}`;
      elementos.statCompletadas.textContent = `${estadisticas.completadas}`;
      elementos.statPendientes.textContent = `${estadisticas.pendientes}`;
    },

    // Inicializar event listeners
    inicializarEventos: function () {
      // TU CÓDIGO AQUÍ
      // 1. Click en agregar
      // 2. Enter en input
      // 3. Click en filtros
      // 4. Input en búsqueda
      elementos.agregarBtn.addEventListener('click', function (e) {
        const tareaTitle = elementos.nuevaTareaInput.value.trim();
        if (!tareaTitle || tareaTitle == '') {
          return;
        }
        const task = crearTarea(tareaTitle);
        App.State.agregarTarea(task);
      });

      elementos.nuevaTareaInput.addEventListener('keydown', function (e) {
        const tareaTitle = elementos.nuevaTareaInput.value.trim();
        if (e.key == 'Enter') {
          if (!tareaTitle || tareaTitle == '') {
            return;
          }
          const task = crearTarea(tareaTitle);
          App.State.agregarTarea(task);
        }
      });

      [...elementos.filterBtns].forEach(btn => {
        btn.addEventListener('click', function (e) {
          const filtro = e.currentTarget.dataset.filter;
          App.UI.cambiarFiltro(filtro);
        })
      });

      elementos.buscarInput.addEventListener('input', function (e) {
        // busquedaActual = e.currentTarget.value;
        App.UI.actualizarBusqueda(e.currentTarget.value);
        App.UI.renderizarTareas();
      });
    },

    /**
     * Cambiar filtro activo
     * @param {StateFilter} filtro 
     */
    cambiarFiltro: function (filtro) {
      // TU CÓDIGO AQUÍ
      // Actualizar filtroActual y clase active
      /**@type {StateFilter[]} */
      const filtrosAceptados = ['todas', 'completadas', 'pendientes'];
      if (!filtrosAceptados.includes(filtro)) {
        throw new Error("Filtro no contemplado");
      }
      filtroActual = filtro;
      const botones = [...elementos.filterBtns];
      botones.forEach(e => { e.classList.remove('active') });
      const target = botones.find(e => e.dataset.filter == filtro);
      target.classList.add('active');

      App.UI.renderizarTareas();
    },

    // Actualizar búsqueda
    actualizarBusqueda: function (texto) {
      // TU CÓDIGO AQUÍ
      // Actualizar busquedaActual
      busquedaActual = texto;
    }
  };
})();

// ============================================
// MÓDULO 8: APP (Coordinador principal)
// ============================================
App.Main = (function () {

  function inicializar() {
    // 1. Cargar tareas desde localStorage
    // TU CÓDIGO AQUÍ
    App.Storage.cargar();

    // 2. Inicializar UI
    // TU CÓDIGO AQUÍ
    App.UI.inicializarEventos();

    // 3. Suscribirse a eventos
    // TU CÓDIGO AQUÍ
    function guardar() {
      const tareas = App.State.obtenerTareas();
      App.Storage.guardar(tareas);
    }

    function alCambiarTareas() {
      App.Filters.limpiarCache();  // ✅ Limpiar caché
      App.Stats.limpiarCache();    // ✅ Limpiar caché
      App.UI.renderizarTareas();
      App.UI.actualizarEstadisticas();  // ✅ Actualizar stats
      guardar();
    }

    App.EventBus.on('tareaAgregada', alCambiarTareas);
    App.EventBus.on('tareaEliminada', alCambiarTareas);
    App.EventBus.on('tareaModificada', alCambiarTareas);
    // App.EventBus.on('tareaAgregada', App.UI.actualizarEstadisticas);
    // App.EventBus.on('tareaEliminada', App.UI.actualizarEstadisticas);
    // App.EventBus.on('tareaModificada', App.UI.actualizarEstadisticas);
    App.EventBus.on('tareaAgregada', App.UI.renderizarTareas);
    App.EventBus.on('tareaAgregada', guardar);
    App.EventBus.on('tareaEliminada', App.UI.renderizarTareas);
    App.EventBus.on('tareaEliminada', guardar);
    App.EventBus.on('tareaModificada', App.UI.renderizarTareas);
    App.EventBus.on('tareaModificada', guardar);

    // 4. Renderizar inicial
    // TU CÓDIGO AQUÍ
    App.UI.renderizarTareas();
    App.UI.actualizarEstadisticas();  // ✅ Renderizar stats inicial
  }

  return {
    init: inicializar
  };
})();

// ============================================
// INICIAR APLICACIÓN
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  App.Main.init();
});

