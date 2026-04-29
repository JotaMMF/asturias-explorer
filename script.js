
/**
 * ==========================================
 * ESTADO GLOBAL DE LA APLICACIÓN
 * ==========================================
 * Aquí almacenamos todos los lugares cargados
 * desde el archivo places.json.
 */
let lugares = [];

/**
 * ==========================================
 * REFERENCIAS AL DOM
 * ==========================================
 * Elementos principales de la interfaz.
 */
const rejilla = document.getElementById("grid");       // Contenedor de tarjetas
const buscador = document.getElementById("search");    // Campo de búsqueda
const filtro = document.getElementById("filter");      // Filtro por tipo de lugar
const botonInstalar = document.getElementById("installBtn"); // Botón PWA

/**
 * ==========================================
 * CARGA DE DATOS (JSON)
 * ==========================================
 * Se obtienen los lugares desde places.json
 * y se almacenan en memoria.
 */
fetch("places.json")
  .then(respuesta => {
    if (!respuesta.ok) {
      throw new Error("Error al cargar los datos de lugares");
    }
    return respuesta.json();
  })
  .then(datos => {
    lugares = datos;        // Guardamos datos globalmente
    renderizar(datos);      // Render inicial
  })
  .catch(error => {
    console.error("Error cargando JSON:", error);
    rejilla.innerHTML = "<p>No se pudieron cargar los lugares.</p>";
  });

/**
 * ==========================================
 * EVENTOS DE FILTRADO
 * ==========================================
 * Se actualiza la vista cuando el usuario
 * escribe o cambia el filtro.
 */
buscador.addEventListener("input", aplicarFiltros);
filtro.addEventListener("change", aplicarFiltros);

/**
 * ==========================================
 * FUNCIÓN: APLICAR FILTROS
 * ==========================================
 * Filtra los lugares por:
 * - Texto (nombre o ubicación)
 * - Tipo de categoría
 */
function aplicarFiltros() {
  const termino = buscador.value.toLowerCase().trim();
  const tipoSeleccionado = filtro.value;

  const filtrados = lugares.filter(lugar => {
    // Coincidencia por texto
    const coincideTexto =
      lugar.name.toLowerCase().includes(termino) ||
      lugar.location.toLowerCase().includes(termino);

    // Coincidencia por tipo
    const coincideTipo =
      tipoSeleccionado === "all" || lugar.type === tipoSeleccionado;

    return coincideTexto && coincideTipo;
  });

  renderizar(filtrados);
}

/**
 * ==========================================
 * FUNCIÓN: RENDERIZAR INTERFAZ
 * ==========================================
 * Genera dinámicamente las tarjetas de lugares
 * y las inserta en la rejilla principal.
 */
function renderizar(datos) {
  // Limpiar contenido anterior
  rejilla.innerHTML = "";

  // Si no hay resultados
  if (!datos.length) {
    rejilla.innerHTML = "<p>No se encontraron lugares.</p>";
    return;
  }

  // Crear tarjetas
  datos.forEach(lugar => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "card";

    tarjeta.innerHTML = `
      <img 
        src="${lugar.image}" 
        alt="Imagen de ${lugar.name} en ${lugar.location}"
        loading="lazy"
      >

      <div class="card-content">

        <h3>${lugar.name}</h3>

        <div class="location" aria-label="Ubicación del lugar">
          📍 ${lugar.location}
        </div>

        <p class="description">
          ${lugar.description}
        </p>

        <div class="tags" aria-label="Etiquetas del lugar">
          ${lugar.tags
            .map(etiqueta => `<span class="tag">${etiqueta}</span>`)
            .join("")}
        </div>

        <div class="note" role="note">
          ⚠️ ${lugar.honesty_note}
        </div>

      </div>
    `;

    // Accesibilidad: navegación por teclado
    tarjeta.setAttribute("tabindex", "0");

    rejilla.appendChild(tarjeta);
  });
}

/**
 * ==========================================
 * INSTALACIÓN COMO PWA
 * ==========================================
 * Maneja el evento de instalación de la app.
 */
let eventoInstalacionDiferida;

/**
 * Se dispara cuando el navegador detecta que
 * la app puede instalarse como PWA.
 */
window.addEventListener("beforeinstallprompt", (evento) => {
  evento.preventDefault(); // Evita popup automático

  eventoInstalacionDiferida = evento;

  // Mostrar botón de instalación
  if (botonInstalar) {
    botonInstalar.style.display = "inline-block";
  }
});

/**
 * Usuario pulsa el botón de instalar
 */
botonInstalar?.addEventListener("click", async () => {
  if (!eventoInstalacionDiferida) return;

  eventoInstalacionDiferida.prompt(); // Mostrar instalación

  // Limpieza del evento
  eventoInstalacionDiferida = null;
});