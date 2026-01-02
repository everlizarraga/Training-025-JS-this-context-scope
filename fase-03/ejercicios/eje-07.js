/**
**CONSIGNA:**
Creá ejemplos que demuestren las 4 reglas y su precedencia:
1. Función que muestra "this.nombre"
2. Demostrar cada una de las 4 reglas
3. Demostrar precedencia (explicit > implicit)
4. Crear versión con bind y probar que se mantiene
 */

// Función para usar en ejemplos
function mostrarNombre(saludo) {
  console.log(saludo + ", soy " + this.nombre);
}

// REGLA 1: DEFAULT BINDING
// TU CÓDIGO AQUÍ
// Llamar mostrarNombre() directamente (sin objeto)
mostrarNombre('Buen dia');

// REGLA 2: IMPLICIT BINDING
const persona = {
  nombre: "Juan",
  saludar: mostrarNombre
};
// TU CÓDIGO AQUÍ
// Llamar persona.saludar("Hola")
persona.saludar('Impl Binding');

// REGLA 3: EXPLICIT BINDING
const maria = { nombre: "María" };
// TU CÓDIGO AQUÍ
// Usar call para forzar "this" = maria
mostrarNombre.call(maria, 'Explicit Binding');

// REGLA 4: NEW BINDING
function Persona(nombre) {
  this.nombre = nombre;
}
// TU CÓDIGO AQUÍ
// Crear instancia con "new"
const newPersona = new Persona('EVER');
mostrarNombre.call(newPersona, 'new Persona');

// PRECEDENCIA: Explicit > Implicit
const carlos = { nombre: "Carlos" };
// TU CÓDIGO AQUÍ
// Llamar persona.saludar.call(carlos, "Hola")
// ¿Quién gana: persona (implicit) o carlos (explicit)?
persona.saludar.call(carlos, 'Call');

// BIND (crear función con "this" fijo)
// TU CÓDIGO AQUÍ
// Crear función con bind que siempre use "maria"
// Probá llamarla de diferentes formas
console.log('============');
const mifuncion = mostrarNombre.bind(maria);
mifuncion('Mi Fn');

