
/////////SELECCIONAR LOS ELEMENTOS DEL HTML
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#search");

const destacadasGrid = document.querySelector("#destacadas-grid");
const resultadosGrid = document.querySelector("#resultados-grid");


/////////FUNCION PARA CREAR UNA TARJETA

function crearTarjetaSerie(serie) {
    
    const tarjeta = document.createElement("div");  // Creamos un div
    tarjeta.classList.add("serieTarjetaClass");   // Le agregamos la clase CSS que tenemos en el CSS

    //Colocamos el contenido dentro del div
    tarjeta.innerHTML = `
        <img src="${serie.poster}" alt="${serie.titulo}">
        <h3>${serie.titulo}</h3>
        <p>Año: ${serie.anio}</p>
        <p>Rating: ${serie.rating}</p>
        <button class="btn-favorito" data-id="${serie.id}">
            ❤️ Favorito
        </button>
    `;
  
    return tarjeta;   // Devolvemos la tarjeta
}


//////////FUNCION PARA CARGAR SERIES DESDE LA API


async function cargarSeries(url, contenedor) {

    try {
        const respuesta = await fetch(url); // Hacemos la peticion a la API
        const datos = await respuesta.json();  // Convertimos la respuesta a JSON      
        contenedor.innerHTML = ""; // Limpiamos el contenedor
        const seriesLimitadas = datos.slice(0, 3); // Tomamos solamente las primeras 3 series
        seriesLimitadas.forEach((item) => {    // Recorremos las series
            const serie = item.show; // La información de la serie está dentro de "show"

            // Creamos un objeto con solamente
            // los datos que necesitamos
            const serieFormateada = {

                id: serie.id,
                titulo: serie.name,
                anio: serie.premiered
                    ? serie.premiered.slice(0, 4)
                    : "N/A",
                rating: serie.rating && serie.rating.average
                    ? serie.rating.average
                    : "N/A",
                poster: serie.image
                    ? serie.image.medium
                    : ""
            };

            
            const tarjeta = crearTarjetaSerie(serieFormateada); // Creamos la tarjeta
           
            contenedor.appendChild(tarjeta); // Agregamos la tarjeta al contenedor

        });

    } catch (error) {

        console.log("Error al cargar las series:", error);

    }
}



//////////CARGAR SERIES DESTACADAS AL ABRIR LA PÁGINA
const urlDestacadas =
    "https://api.tvmaze.com/schedule?country=US";
cargarSeries(urlDestacadas, destacadasGrid);


/////////BUSCAR SERIES
searchForm.addEventListener("submit", async (e) => {
     e.preventDefault();
     const texto = searchInput.value.trim();  // Obtenemos lo que escribió el usuario
    // Validamos que no esté vacío
    if (texto === "") {
        alert("Debes escribir el nombre de una serie");
        return;
    }

    // Creamos la URL de búsqueda
    const url =
        `https://api.tvmaze.com/search/shows?q=${texto}`;

    // Cargamos los resultados
    cargarSeries(url, resultadosGrid);

});



/////////GUARDAR Y QUITAR FAVORITOS
document.addEventListener("click", (e) => {
  
    if (!e.target.classList.contains("btn-favorito")) {   // Verificamos si hicieron clic en un boton favorito

        return;
    }
   
    const id = e.target.dataset.id; // Obtenemos el ID de la serie
   
    const guardado = localStorage.getItem("favoritos"); // Obtenemos los favoritos guardados

    // Si existen favoritos, los convertimos de JSON a array
    // Si no existen, comenzamos con un array vacío
    let favoritos = guardado
        ? JSON.parse(guardado)
        : [];

    // ¿LA SERIE YA ES FAVORITA?

    if (favoritos.includes(id)) {
       
        favoritos = favoritos.filter((favorito) => {      // Si ya estaba, la eliminamos

            return favorito !== id;

        });

        
        e.target.textContent = "❤️ Favorito";  // Cambiamos el texto del boton
    } else {

      
        favoritos.push(id);    // Si no estaba, la agregamos

        // Cambiamos el texto del boton
        e.target.textContent = "✅ En Favoritos";
    }

    // Guardamos nuevamente los favoritos
    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

});