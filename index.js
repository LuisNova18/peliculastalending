// 1. Funcion para crear la tarjeta
function crearTarjetaSerie(serie) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("serieTarjetaClass");

  tarjeta.innerHTML = `
    <img src="${serie.poster}" alt="${serie.titulo}">
    <h3>${serie.titulo}</h3>
    <p>${serie.anio}</p>
    <p>${serie.rating}</p>
  `;

  return tarjeta;
}

// 2. Función para cargar varias series
async function cargarSeries(url, contenedor) {
  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    // Limpiamos el contenedor
    contenedor.innerHTML = "";

    const seriesLimitadas = datos.slice(0, 3);

    // datos es un ARRAY. Cada elemento tiene { score, show }
    seriesLimitadas.forEach(item => {
      const serie = item.show; // ← Aquí está la información real de la serie

      const serieFormateada = {
        titulo: serie.name,
        anio: serie.premiered ? serie.premiered.slice(0, 4) : "N/A",
        rating: serie.rating?.average || "N/A",
        poster: serie.image?.medium || "https://via.placeholder.com/210x295?text=Sin+imagen"
      };

      const tarjeta = crearTarjetaSerie(serieFormateada);
      contenedor.appendChild(tarjeta);
    });

  } catch (error) {
    console.log("Error al cargar las series:", error);
  }
}

// 3. Seleccionar contenedores
const destacadasGrid = document.querySelector("#destacadas-grid");
const resultadosGrid = document.querySelector("#resultados-grid");

// 4. Ejemplo: cargar series al iniciar (destacadas)
cargarSeries("https://api.tvmaze.com/schedule?country=US", destacadasGrid);

// 5. Cuando el usuario busque desde el formulario
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#search");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const texto = searchInput.value.trim();

  if (texto === "") {
    alert("Debes escribir el nombre de una serie");
    return;
  }

  const url = `https://api.tvmaze.com/search/shows?q=${texto}`;
  cargarSeries(url, resultadosGrid);
});



