// Mostrar mes y año actual en el título del presupuesto
const titulo = document.getElementById("tituloPresupuesto");
const fecha = new Date();
const opcionesMes = { month: "long" };
const nombreMes = fecha.toLocaleDateString("es-ES", opcionesMes);
const año = fecha.getFullYear();
titulo.textContent = `Presupuesto de ${
  nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1)
} ${año}`;

// Referencias a elementos del DOM
const lista = document.getElementById("listaTransacciones");
const balanceEl = document.getElementById("balance");
const ingresosEl = document.getElementById("ingresosTotal");
const egresosEl = document.getElementById("egresosTotal");
const porcentajeEl = document.getElementById("porcentajeGastos");

// Lista que almacenará las transacciones
let transacciones = [];

/**
 * Agrega una nueva transacción a la lista.
 * Realiza validaciones básicas antes de agregar.
 */
function agregarTransaccion() {
  const tipo = document.getElementById("tipo").value;
  const descripcion = document.getElementById("descripcion").value;
  const monto = parseFloat(document.getElementById("monto").value);

  if (!descripcion || isNaN(monto) || monto <= 0) {
    alert("Por favor completa todos los campos correctamente.");
    return;
  }

  transacciones.push({ tipo, descripcion, monto });

  // Limpiar campos del formulario
  document.getElementById("descripcion").value = "";
  document.getElementById("monto").value = "";

  // Actualizar vista con nueva transacción
  actualizarVista();
}

/**
 * Actualiza la visualización del balance, ingresos, egresos y listado según filtro.
 * @param {string} filtro - "ingreso" o "egreso"
 */
function actualizarVista(filtro = "ingreso") {
  lista.innerHTML = "";

  let ingresos = 0;
  let egresos = 0;

  transacciones.forEach((t) => {
    if (t.tipo === "ingreso") ingresos += t.monto;
    else egresos += t.monto;

    // Mostrar solo las transacciones filtradas
    if (t.tipo === filtro) {
      const item = document.createElement("div");
      item.classList.add("item");
      item.innerHTML = `
        <span>${t.descripcion}</span>
        <span>${t.tipo === "ingreso" ? "+" : "-"} ${t.monto.toFixed(2)}</span>`;
      lista.appendChild(item);
    }
  });

  const balance = ingresos - egresos;
  const porcentaje = ingresos > 0 ? Math.round((egresos / ingresos) * 100) : 0;

  // Actualizar datos en pantalla
  balanceEl.textContent =
    (balance >= 0 ? "+ " : "- ") + Math.abs(balance).toFixed(2);
  ingresosEl.textContent = "+ " + ingresos.toFixed(2);
  egresosEl.textContent = "- " + egresos.toFixed(2);
  porcentajeEl.textContent = porcentaje + "%";
}

/**
 * Cambia el filtro de visualización (ingresos o egresos).
 * Actualiza el estado de los botones y la vista.
 * @param {string} filtro - "ingreso" o "egreso"
 */
function mostrar(filtro) {
  document.querySelectorAll(".tabs button").forEach((btn) => {
    btn.classList.remove("active");
    btn.classList.add("inactive");
  });

  event.target.classList.add("active");
  event.target.classList.remove("inactive");

  actualizarVista(filtro);
}

// Carga inicial de la vista
actualizarVista();
