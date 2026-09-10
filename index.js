//////////////////////////////////////////////////// funcion para crear la tarjeta
function crearTarjetaSerie(serie) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("serieTarjetaClass");

  tarjeta.innerHTML = `
    <img src="${serie.poster}" alt="${serie.titulo}">
    <h3>${serie.titulo}</h3>
    <p>${serie.anio}</p>
    <p>${serie.rating}</p>
    <button class="btn-favorito" data-id="${serie.id}"> Favorito </button>
    `;
  return tarjeta;
}
//////////////////////////////////////////////////// funcion para crear la tarjeta



/////////////////////////////////////////////////// funcion para cargar varias series
async function cargarSeries(url, contenedor) {
  try {
    const respuesta = await fetch(url); // Solicitamos los datos a la url del api y esperamos
    const datos = await respuesta.json(); // los datos que regresan lo guardamos en la varible "datos y le decimos que es un Json"
      
    contenedor.innerHTML = "";  // limpiamos el contenedor para que esta vacio al momento de agregarle los datos

     // el json que viene tiene muchas series y se almacenan en la variables de datos y con la instruccion de abajo solo tomamos tres
    const seriesLimitadas = datos.slice(0, 3); 
    
    seriesLimitadas.forEach(item => {  // recoremos el array al cual solo le dejamos tres series y almacenamoes esteas series en  item}
      const serie = item.show; // las series vienen en un arreglo debajo de show por eso los tengo que iterar con item.show
// asociamos los datos de la serie formateada con los datos de la tarjeta, 
      const serieFormateada = {
        id: serie.id,
        titulo: serie.name,
        anio: serie.premiered ? serie.premiered.slice(0, 4) : "N/A", // con esto se le dice que si tiene el campo solo presente los primeros 4 de lo contrario coloque n/a
        rating: serie.rating?.average || "N/A",
        poster: serie.image.medium 
      
      };

      const tarjeta = crearTarjetaSerie(serieFormateada);
      contenedor.appendChild(tarjeta);
    });

  } catch (error) {
    console.log("Error al cargar las series:", error);
  }
}


//  Seleccionar contenedores
const destacadasGrid = document.querySelector("#destacadas-grid");
const resultadosGrid = document.querySelector("#resultados-grid");

// cargar series al iniciar (destacadas)
cargarSeries("https://api.tvmaze.com/schedule?country=US", destacadasGrid);

// Cuando el usuario busque desde el formulario
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#search");

// validamos que el input no este en blanco y setiamos la url de busqueda y le pasamos el valor del
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


//////////////////// Guardar favoritos ////////////////////////////


