/**
**CONSIGNA:**
Creá un constructor `CuentaBancaria` que demuestre "new" y "this":
1. Recibe `titular` y `saldoInicial`
2. Método `depositar(monto)` que suma al saldo
3. Método `retirar(monto)` que resta si hay fondos
4. Método `verSaldo()` que retorna el saldo
5. Creá 2 instancias y probá que son independientes
 */

function CuentaBancaria(titular, saldoInicial) {
  // 1. Propiedades
  // TU CÓDIGO AQUÍ (this.titular, this.saldo)
  this.titular = titular;
  this.saldoInicial = saldoInicial;

  // 2. Método depositar
  this.depositar = function (monto) {
    // TU CÓDIGO AQUÍ
    this.saldoInicial += monto;
    console.log(`Depositado: $${monto} [Saldo: $${this.saldoInicial}]`);
  };

  // 3. Método retirar
  this.retirar = function (monto) {
    // Verificar si hay fondos suficientes
    // TU CÓDIGO AQUÍ
    if(monto > this.saldoInicial) {
      console.log('[ERROR] Saldo insuficiente !!!');
      return;
    }
    this.saldoInicial -= monto
    console.log(`Retirado: $${monto} [Saldo: $${this.saldoInicial}]`);
  };

  // 4. Método verSaldo
  this.verSaldo = function () {
    // TU CÓDIGO AQUÍ
    return `${this.saldoInicial}`;
  };
}

// 5. Crear dos cuentas
const cuenta1 = new CuentaBancaria("Juan", 1000);
const cuenta2 = new CuentaBancaria("María", 500);

// Probar cuenta1
cuenta1.depositar(500);
cuenta1.retirar(200);
console.log("Saldo Juan:", cuenta1.verSaldo());

// Probar cuenta2
cuenta2.depositar(100);
cuenta2.retirar(700);  // No debería permitir (fondos insuficientes)
console.log("Saldo María:", cuenta2.verSaldo());

// Verificar que son independientes
console.log("¿Son la misma cuenta?", cuenta1 === cuenta2);
