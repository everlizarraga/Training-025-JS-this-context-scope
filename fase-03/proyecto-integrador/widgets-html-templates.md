# 📝 HTML PARA LOS WIDGETS RESTANTES

Copiá y pegá cada bloque en el método `renderizarUI` correspondiente.

---

## 🔢 WIDGET CONTADOR

**Método:** `WidgetContador.prototype.renderizarUI`

```javascript
WidgetContador.prototype.renderizarUI = function() {
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
```

---

## 👤 WIDGET USUARIO

**Método:** `WidgetUsuario.prototype.renderizarUI`

```javascript
WidgetUsuario.prototype.renderizarUI = function() {
    this.contenedor.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
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
};
```

**Método auxiliar:** `WidgetUsuario.prototype.renderizarUsuario`

```javascript
WidgetUsuario.prototype.renderizarUsuario = function(usuario) {
    // usuario viene del API: data.results[0]
    const nombre = `${usuario.name.first} ${usuario.name.last}`;
    const email = usuario.email;
    const foto = usuario.picture.large;
    
    this.contenidoElement.innerHTML = `
        <div class="usuario-card">
            <img src="${foto}" alt="${nombre}" class="usuario-avatar">
            <div class="usuario-info">
                <p style="font-size: 1.2rem; font-weight: bold; color: #333;">
                    ${nombre}
                </p>
                <p style="color: #666;">
                    📧 ${email}
                </p>
            </div>
        </div>
    `;
};
```

**Método auxiliar:** `WidgetUsuario.prototype.mostrarCargando`

```javascript
WidgetUsuario.prototype.mostrarCargando = function() {
    this.contenidoElement.innerHTML = `
        <div class="loading">
            ⏳ Cargando usuario...
        </div>
    `;
};
```

**Método auxiliar:** `WidgetUsuario.prototype.mostrarError`

```javascript
WidgetUsuario.prototype.mostrarError = function(mensaje) {
    this.contenidoElement.innerHTML = `
        <div class="error">
            ❌ Error: ${mensaje}
        </div>
    `;
};
```

---

## ✅ WIDGET TAREAS

**Método:** `WidgetTareas.prototype.renderizarUI`

```javascript
WidgetTareas.prototype.renderizarUI = function() {
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
```

**Método auxiliar:** `WidgetTareas.prototype.renderizarTareas`

```javascript
WidgetTareas.prototype.renderizarTareas = function() {
    // Si no hay tareas, mostrar mensaje
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
```

---

## 📋 RESUMEN DE QUÉ COPIAR DÓNDE

### 1. WidgetContador
```javascript
function WidgetContador(contenedorId) {
    this.contenedor = document.getElementById(contenedorId);
    this.cuenta = 0;
    
    this.renderizarUI();
    this.configurarEventos();
}

// ⬇️ COPIAR AQUÍ el HTML del contador
WidgetContador.prototype.renderizarUI = function() {
    // ... código del HTML arriba
};
```

---

### 2. WidgetUsuario
```javascript
function WidgetUsuario(contenedorId) {
    this.contenedor = document.getElementById(contenedorId);
    
    this.renderizarUI();
    this.configurarEventos();
}

// ⬇️ COPIAR AQUÍ el HTML inicial
WidgetUsuario.prototype.renderizarUI = function() {
    // ... código del HTML arriba
};

// ⬇️ COPIAR AQUÍ el HTML del usuario
WidgetUsuario.prototype.renderizarUsuario = function(usuario) {
    // ... código del HTML arriba
};

// ⬇️ COPIAR AQUÍ el HTML de cargando
WidgetUsuario.prototype.mostrarCargando = function() {
    // ... código del HTML arriba
};

// ⬇️ COPIAR AQUÍ el HTML de error
WidgetUsuario.prototype.mostrarError = function(mensaje) {
    // ... código del HTML arriba
};
```

---

### 3. WidgetTareas
```javascript
function WidgetTareas(contenedorId) {
    this.contenedor = document.getElementById(contenedorId);
    this.tareas = [];
    this.nextId = 1;
    
    this.renderizarUI();
    this.configurarEventos();
}

// ⬇️ COPIAR AQUÍ el HTML inicial
WidgetTareas.prototype.renderizarUI = function() {
    // ... código del HTML arriba
};

// ⬇️ COPIAR AQUÍ el HTML de la lista
WidgetTareas.prototype.renderizarTareas = function() {
    // ... código del HTML arriba
};
```

---

## 💡 NOTAS IMPORTANTES

### Para WidgetUsuario:
- `renderizarUI()` se llama UNA vez al inicio (botón + placeholder)
- `renderizarUsuario(usuario)` se llama cada vez que cargas un usuario
- `mostrarCargando()` se llama antes del fetch
- `mostrarError(mensaje)` se llama si el fetch falla

### Para WidgetTareas:
- `renderizarUI()` se llama UNA vez al inicio (input + lista vacía)
- `renderizarTareas()` se llama cada vez que cambia el array de tareas
- Las tareas tienen `data-id="${tarea.id}"` para identificarlas en event delegation

### Clases CSS importantes:
- Ya están en el HTML base que te di
- `completada` → pone texto tachado y opacidad
- `empty-state` → mensaje cuando está vacío
- `loading` → estado de carga
- `error` → mensaje de error
- `btn-eliminar` → para event delegation

---

## ✅ CON ESTO YA TENÉS TODO EL HTML

Ahora solo te falta implementar la **lógica** (los métodos que manipulan datos), pero el HTML ya está listo para copiar y pegar.

¿Te quedó claro? ¿Algún otro HTML que necesites?
