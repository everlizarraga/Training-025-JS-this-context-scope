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
WidgetReloj.prototype.renderizarUI = function () {
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
WidgetReloj.prototype.configurarEventos = function () {
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
WidgetReloj.prototype.iniciar = function () {
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
WidgetReloj.prototype.detener = function () {
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
WidgetReloj.prototype.actualizarHora = function () {
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
  this.contenedor = document.getElementById(contenedorId);
  this.cuenta = 0;
  this.renderizarUI();
  this.configurarEventos();
}

WidgetContador.prototype.renderizarUI = function () {
  // TU CÓDIGO AQUÍ
  // HTML necesario:
  // - Display del contador (grande)
  // - Botón "+" (incrementar)
  // - Botón "-" (decrementar)
  // - Botón "Reset"
  this.contenedor.innerHTML = `
    <div class="contador-display" id="contador-display">0</div>
    <div class="contador-controls">
      <button class="btn btn-success" id="contador-btn-incrementar">
        ➕ Incrementar
      </button>
      <button class="btn btn-danger" id="contador-btn-decrementar">
        ➖ Decrementar
      </button>
      <button class="btn btn-secondary" id="contador-btn-reset">
        🔄 Reset
      </button>
    </div>
    `;

  // Guardar referencias a elementos
  this.displayElement = document.getElementById('contador-display');
  this.btnIncrementar = document.getElementById('contador-btn-incrementar');
  this.btnDecrementar = document.getElementById('contador-btn-decrementar');
  this.btnReset = document.getElementById('contador-btn-reset');
};

WidgetContador.prototype.configurarEventos = function () {
  // TU CÓDIGO AQUÍ
  // ⚠️ Usar arrow functions para mantener "this"
  this.btnIncrementar.addEventListener('click', () => {
    this.incrementar();
  });

  this.btnDecrementar.addEventListener('click', () => {
    this.decrementar();
  });

  this.btnReset.addEventListener('click', () => {
    this.reset();
  });
};

WidgetContador.prototype.incrementar = function () {
  // TU CÓDIGO AQUÍ
  // 1. Incrementar this.cuenta
  // 2. Actualizar display
  this.cuenta += 1;
  this.actualizarDisplay();
  console.log('Contador incrementado a:', this.cuenta);
};

WidgetContador.prototype.decrementar = function () {
  // TU CÓDIGO AQUÍ
  // 1. Decrementar this.cuenta
  // 2. Validar que no sea negativo
  // 3. Actualizar display
  this.cuenta -= 1;
  this.cuenta = this.cuenta >= 0 ? this.cuenta : 0;
  this.actualizarDisplay();
  console.log('Contador decrementado a:', this.cuenta);
};

WidgetContador.prototype.reset = function () {
  // TU CÓDIGO AQUÍ
  // 1. this.cuenta = 0
  // 2. Actualizar display
  this.cuenta = 0;
  this.actualizarDisplay();
  console.log('RESET a:', this.cuenta);
};

WidgetContador.prototype.actualizarDisplay = function () {
  // TU CÓDIGO AQUÍ
  // Actualizar el elemento del DOM con this.cuenta
  this.displayElement.textContent = this.cuenta;
};


// ============================================
// WIDGET USUARIO (Día 2)
// ============================================

function WidgetUsuario(contenedorId) {
  // TU CÓDIGO AQUÍ (Día 2)
  this.contenedor = document.getElementById(contenedorId);
  this.renderizarUI();
  this.configurarEventos();
}

WidgetUsuario.prototype.renderizarUI = function () {
  // TU CÓDIGO AQUÍ
  // HTML necesario:
  // - Botón "Cargar Usuario"
  // - Div para mostrar usuario (inicialmente vacío)
  this.contenedor.innerHTML = `
    <div style="text-align: center; margin-bottom: 10px;">
      <button class="btn btn-primary" id="usuario-btn-cargar">
        🎲 Cargar Usuario Random
      </button>
    </div>
    <div id="usuario-contenido">
      <div class="empty-state">
        Haz click en el botón para cargar un usuario
      </div>
    </div>
    `;

  // Guardar referencias a elementos
  this.btnCargar = document.getElementById('usuario-btn-cargar');
  this.contenidoElement = document.getElementById('usuario-contenido');
  // this.emptyStateElement = document.querySelector('#usuario-contenido .empty-state');
};

WidgetUsuario.prototype.configurarEventos = function () {
  // TU CÓDIGO AQUÍ
  // Botón cargar → this.cargarUsuario()
  this.btnCargar.addEventListener('click', () => {
    this.cargarUsuario();
  });
};

WidgetUsuario.prototype.cargarUsuario = function () {
  // TU CÓDIGO AQUÍ
  // 1. Mostrar estado de carga
  // 2. Fetch a https://randomuser.me/api/
  // 3. ⚠️ IMPORTANTE: Usar arrow function en .then() para mantener "this"
  // 4. Llamar this.renderizarUsuario(datos)
  // 5. Manejo de errores en .catch()
  fetch('https://randomuser.me/api/')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      this.mostrarCargando();
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(data);  // Resuelve la Promise con los datos
        }, 1000);
      });
    })
    .then(data => {
      const userRandom = data.results[0];
      console.log('data:', userRandom);
      this.renderizarUsuario(userRandom);
    })
    .catch(error => {
      console.error('Error:', error);
      this.mostrarError(error.message);
    })
};

WidgetUsuario.prototype.renderizarUsuario = function (usuario) {
  // TU CÓDIGO AQUÍ
  // Mostrar: foto, nombre, email
  // usuario.picture.large
  // usuario.name.first + usuario.name.last
  // usuario.email
  const nombre = `${usuario.name.title}. ${usuario.name.first} ${usuario.name.last}`;
  const email = usuario.email;
  const foto = usuario.picture.large;
  this.contenidoElement.innerHTML = `
    <div class="usuario-card">
      <img src="${foto}" alt="${nombre}" class="usuario-avatar">
      <div class="usuario-info">
        <p style="font-size: 1.2rem; font-weight: bold; color: #333; margin: 5px;">
          ${nombre}
        </p>
        <p style="color: #666;">
          📧 ${email}
        </p>
      </div>
    </div>
  `;
};

WidgetUsuario.prototype.mostrarCargando = function () {
  // TU CÓDIGO AQUÍ
  // Mostrar "Cargando..."
  // this.contenidoElement.innerHTML = `Cargando...`;
  this.contenidoElement.innerHTML = `
    <div class="loading">
      ⏳ Cargando usuario...
    </div>
    `;
};

WidgetUsuario.prototype.mostrarError = function (mensaje) {
  // TU CÓDIGO AQUÍ
  // Mostrar mensaje de error
  // this.contenidoElement.innerHTML = `ERROR: ${mensaje}`;
  this.contenidoElement.innerHTML = `
    <div class="error">
      ❌ Error: ${mensaje}
    </div>
    `;
};


// ============================================
// WIDGET TAREAS (Día 2)
// ============================================

function WidgetTareas(contenedorId) {
  // TU CÓDIGO AQUÍ (Día 2)
  // Estado: this.tareas = []
  // Generar IDs únicos: this.nextId = 1
  this.contenedor = document.getElementById(contenedorId);
  this.tareas = [];
  this.nextId = 1;
  this.renderizarUI();
  this.configurarEventos();
}

WidgetTareas.prototype.renderizarUI = function () {
  // TU CÓDIGO AQUÍ
  // HTML necesario:
  // - Input text + botón "Agregar"
  // - <ul> para lista de tareas
  this.contenedor.innerHTML = `
    <div class="tareas-input-group">
      <input 
        type="text" 
        id="tareas-input" 
        placeholder="Escribe una nueva tarea..."
      >
      <button class="btn btn-primary" id="tareas-btn-agregar">
        ➕ Agregar
      </button>
    </div>
    <ul class="tareas-lista" id="tareas-lista">
      <!-- Las tareas se renderizan aquí -->
    </ul>
    `;

  // Guardar referencias a elementos
  this.inputElement = document.getElementById('tareas-input');
  this.btnAgregar = document.getElementById('tareas-btn-agregar');
  this.listaElement = document.getElementById('tareas-lista');
};

WidgetTareas.prototype.configurarEventos = function () {
  // TU CÓDIGO AQUÍ
  // 1. Botón agregar → this.handleAgregar()
  // 2. Enter en input → this.handleAgregar()
  // 3. ⚠️ Event delegation en la lista:
  //    this.listaElement.addEventListener('click', (e) => { ... })
  this.btnAgregar.addEventListener('click', () => {
    this.handleAgregar();
  });

  this.inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      console.log("Enter detectado");
      this.handleAgregar();
    }
  });

  this.listaElement.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar')) {
      const id = e.target.closest('.tarea-item').dataset.id;
      this.eliminarTarea(Number(id));
    }

    if (e.target.classList.contains('tarea-texto')) {
      const id = e.target.closest('.tarea-item').dataset.id;
      this.completarTarea(Number(id));
    }
  });
};

WidgetTareas.prototype.handleAgregar = function () {
  // TU CÓDIGO AQUÍ
  // 1. Obtener texto del input
  // 2. Validar que no esté vacío
  // 3. Llamar this.agregarTarea(texto)
  // 4. Limpiar input
  const texto = this.inputElement.value;
  if(texto === '') {
    console.log("Se detecto texto vacio");
    return;
  }
  this.agregarTarea(texto);
  this.inputElement.value = '';
};

WidgetTareas.prototype.agregarTarea = function (texto) {
  // TU CÓDIGO AQUÍ
  // 1. Crear objeto tarea: { id, texto, completada: false }
  // 2. Agregar a this.tareas
  // 3. Llamar this.renderizarTareas()
  const nuevaTarea = {
    id: this.nextId, 
    texto: texto, 
    completada: false };
  this.nextId += 1;
  this.tareas.push(nuevaTarea);
  this.renderizarTareas();
};

WidgetTareas.prototype.completarTarea = function (id) {
  // TU CÓDIGO AQUÍ
  // 1. Buscar tarea por id
  // 2. Toggle completada
  // 3. Rerenderizar
  const tarea = this.tareas.find(e => e.id == id);
  if(!tarea) {
    console.warn('Tarea no encontrada:', id);
    return;
  }
  tarea.completada = !tarea.completada;
  this.renderizarTareas();
};

WidgetTareas.prototype.eliminarTarea = function (id) {
  // TU CÓDIGO AQUÍ
  // 1. Filtrar this.tareas
  // 2. Rerenderizar
  const index = this.tareas.findIndex(e => e.id == id);
  if(index >= 0) {
    this.tareas.splice(index, 1);
    this.renderizarTareas();
  }
};

WidgetTareas.prototype.renderizarTareas = function () {
  // TU CÓDIGO AQUÍ
  // 1. Si no hay tareas → mostrar mensaje "No hay tareas"
  // 2. Mapear this.tareas a HTML
  // 3. Cada tarea debe tener:
  //    - data-id="${tarea.id}"
  //    - clase "completada" si está completada
  //    - botón eliminar con clase "btn-eliminar"
  //    - click en texto para completar
  if (this.tareas.length === 0) {
    this.listaElement.innerHTML = `
      <div class="empty-state">
        No hay tareas. ¡Agrega una nueva!
      </div>
        `;
    return;
  }

  // Generar HTML de todas las tareas
  const tareasHTML = this.tareas.map(tarea => {
    const claseCompletada = tarea.completada ? 'completada' : '';

    return `
      <li class="tarea-item ${claseCompletada}" data-id="${tarea.id}">
        <span class="tarea-texto">${tarea.texto}</span>
        <div class="tarea-actions">
          <button class="btn btn-sm btn-danger btn-eliminar">
            🗑️
          </button>
        </div>
      </li>
    `;
  }).join('');

  this.listaElement.innerHTML = tareasHTML;
};


// ============================================
// DASHBOARD MANAGER
// ============================================

const Dashboard = {
  /**
   * Inicializa todos los widgets
   */
  init: function () {
    console.log('Inicializando Dashboard...');

    // Crear instancias de los widgets
    this.reloj = new WidgetReloj('widget-reloj');
    this.contador = new WidgetContador('widget-contador');

    // Día 2: Descomentar estos
    this.usuario = new WidgetUsuario('widget-usuario');
    this.tareas = new WidgetTareas('widget-tareas');

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

