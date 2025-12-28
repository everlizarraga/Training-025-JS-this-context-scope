/**
**CONSIGNA:**
Creá una función `crearBanco` que simule una cuenta bancaria con datos privados:
1. Variable privada `saldo = 0`
2. Método `depositar(monto)` que suma al saldo
3. Método `retirar(monto)` que resta del saldo (solo si hay suficiente)
4. Método `verSaldo()` que retorna el saldo actual
5. Probá crear 2 cuentas independientes
 */

function crearBanco() {
  // 1. Variable privada "saldo"
  // TU CÓDIGO AQUÍ
  let saldo = 0;

  return {
    // 2. Método depositar
    depositar: function (monto) {
      // Sumar monto al saldo
      // Mostrar mensaje
      // TU CÓDIGO AQUÍ
      if(monto < 0) console.error('Monto no reconocido');
      saldo += monto;
      console.log(`Deposito: $${monto} [Saldo: $${saldo}]`);
    },

    // 3. Método retirar
    retirar: function (monto) {
      // Verificar si hay suficiente saldo
      // Si hay: restar monto
      // Si no hay: mostrar error
      // TU CÓDIGO AQUÍ
      if(monto <= saldo) {
        saldo -= monto;
        console.log(`Retirado: $${monto} [Saldo: $${saldo}]`);
      } else {
        console.error('No hay saldo suficiente !!!');
      }
    },

    // 4. Método verSaldo
    verSaldo: function () {
      // Retornar saldo
      // TU CÓDIGO AQUÍ
      return saldo;
    }
  };
}

// 5. Crear dos cuentas
const cuenta1 = crearBanco();
const cuenta2 = crearBanco();

// Probar cuenta1
cuenta1.depositar(100);
cuenta1.depositar(50);
cuenta1.retirar(30);
console.log("Saldo cuenta1:", cuenta1.verSaldo());

// Probar cuenta2
cuenta2.depositar(500);
cuenta2.retirar(600);  // Error: insuficiente
console.log("Saldo cuenta2:", cuenta2.verSaldo());

// Verificar que son independientes
console.log("Cuenta1 final:", cuenta1.verSaldo());
