/**
 * ============================
 * ESTADO GLOBAL DE LA APLICACIÓN
 * ============================
 * Almacena todos los lugares cargados desde el archivo JSON.
 */
let lugares = [];

/**
 * Referencias a elementos del DOM
 */
const rejilla = document.getElementById("grid");        // Contenedor de tarjetas
const buscador = document.getElementById("search");     // Input de búsqueda
const filtro = document.getElementById("filter");       // Selector de tipo de lugar

/**
 * ============================
 * CARGA DE DATOS (JSON)
 * ============================
 * Se obtienen los lugares desde el archivo places.json
 */
fetch("places.json")
  .then(respuesta => respuesta.json())
  .then(datos => {
    lugares = datos;     // Guardamos los datos en memoria
    renderizar(datos);   // Mostramos todos los lugares inicialmente
  });

/**
 * ============================
 * EVENTOS DE FILTRADO
 * ============================
 * Escucha cambios en el buscador y el filtro
 * para actualizar la vista automáticamente.
 */
buscador.addEventListener("input", aplicarFiltros);
filtro.addEventListener("change", aplicarFiltros);

/**
 * ============================
 * APLICAR FILTROS
 * ============================
 * Filtra los lugares según:
 * - Texto buscado (nombre o ubicación)
 * - Tipo seleccionado (naturaleza, playa, etc.)
 */
function aplicarFiltros() {
  const termino = buscador.value.toLowerCase(); // texto introducido
  const tipo = filtro.value;                    // tipo seleccionado

  const filtrados = lugares.filter(lugar => {
    // Coincidencia de texto (nombre o ubicación)
    const coincideTexto =
      lugar.name.toLowerCase().includes(termino) ||
      lugar.location.toLowerCase().includes(termino);

    // Coincidencia de tipo o "todos"
    const coincideTipo = tipo === "all" || lugar.type === tipo;

    return coincideTexto && coincideTipo;
  });

  // Renderizamos resultados filtrados
  renderizar(filtrados);
}

/**
 * ============================
 * RENDERIZADO DE INTERFAZ
 * ============================
 * Genera las tarjetas dinámicamente y las inserta en la rejilla.
 */
function renderizar(datos) {
  // Limpiamos el contenido anterior
  rejilla.innerHTML = "";

  // Recorremos todos los lugares
  datos.forEach(lugar => {
    // Creamos una tarjeta
    const tarjeta = document.createElement("div");
    tarjeta.className = "card";

    // Insertamos contenido HTML dinámico
    tarjeta.innerHTML = `
      <img src="${lugar.image}" alt="${lugar.name}">
      
      <div class="card-content">
        <h3>${lugar.name}</h3>

        <!-- Ubicación -->
        <div class="location">📍 ${lugar.location}</div>

        <!-- Descripción -->
        <p>${lugar.description}</p>

        <!-- Etiquetas -->
        <div class="tags">
          ${lugar.tags.map(etiqueta => `<span class="tag">${etiqueta}</span>`).join("")}
        </div>

        <!-- Nota adicional -->
        <div class="note">⚠️ ${lugar.honesty_note}</div>
      </div>
    `;

    // Añadimos la tarjeta al grid
    rejilla.appendChild(tarjeta);
  });
}

/**
 * ============================
 * INSTALACIÓN COMO PWA
 * ============================
 * Permite instalar la aplicación como una app nativa.
 */
let eventoInstalacionDiferida;

/**
 * Captura el evento antes de que el navegador muestre
 * el popup automático de instalación.
 */
window.addEventListener("beforeinstallprompt", (evento) => {
  evento.preventDefault(); // Evita el popup automático

  eventoInstalacionDiferida = evento; // Guardamos el evento

  // Mostramos el botón de instalación
  document.getElementById("installBtn").style.display = "inline-block";
});

/**
 * Cuando el usuario pulsa el botón de instalación
 */
document.getElementById("installBtn").addEventListener("click", async () => {
  // Mostramos el diálogo de instalación del navegador
  eventoInstalacionDiferida.prompt();

  // Limpiamos el evento después de usarlo
  eventoInstalacionDiferida = null;
});