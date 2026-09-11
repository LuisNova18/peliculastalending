
// 1. SELECCIONAR LOS ELEMENTOS DEL HTML


const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#search");

const destacadasGrid = document.querySelector("#destacadas-grid");
const resultadosGrid = document.querySelector("#resultados-grid");



// 2. FUNCIÓN PARA CREAR UNA TARJETA


function crearTarjetaSerie(serie) {

    // Creamos un div
    const tarjeta = document.createElement("div");

    // Le agregamos una clase CSS
    tarjeta.classList.add("serieTarjetaClass");

    // Colocamos el contenido dentro del div
    tarjeta.innerHTML = `
        <img src="${serie.poster}" alt="${serie.titulo}">

        <h3>${serie.titulo}</h3>

        <p>Año: ${serie.anio}</p>

        <p>Rating: ${serie.rating}</p>

        <button class="btn-favorito" data-id="${serie.id}">
            ❤️ Favorito
        </button>
    `;

    // Devolvemos la tarjeta
    return tarjeta;
}


// 3. FUNCIÓN PARA CARGAR SERIES DESDE LA API


async function cargarSeries(url, contenedor) {

    try {

        // Hacemos la petición a la API
        const respuesta = await fetch(url);

        // Convertimos la respuesta a JSON
        const datos = await respuesta.json();

        // Limpiamos el contenedor
        contenedor.innerHTML = "";

        // Tomamos solamente las primeras 3 series
        const seriesLimitadas = datos.slice(0, 3);

        // Recorremos las series
        seriesLimitadas.forEach((item) => {

            // La información de la serie está dentro de "show"
            const serie = item.show;

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

            // Creamos la tarjeta
            const tarjeta = crearTarjetaSerie(serieFormateada);

            // Agregamos la tarjeta al contenedor
            contenedor.appendChild(tarjeta);

        });

    } catch (error) {

        console.log("Error al cargar las series:", error);

    }
}



// 4. CARGAR SERIES DESTACADAS AL ABRIR LA PÁGINA


const urlDestacadas =
    "https://api.tvmaze.com/schedule?country=US";

cargarSeries(urlDestacadas, destacadasGrid);


// 5. BUSCAR SERIES


searchForm.addEventListener("submit", async (e) => {

    // Evita que el formulario recargue la página
    e.preventDefault();

    // Obtenemos lo que escribió el usuario
    const texto = searchInput.value.trim();

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



// 6. GUARDAR Y QUITAR FAVORITOS


document.addEventListener("click", (e) => {

    // Verificamos si hicieron clic en un botón favorito
    if (!e.target.classList.contains("btn-favorito")) {

        return;
    }

    // Obtenemos el ID de la serie
    const id = e.target.dataset.id;

    // Obtenemos los favoritos guardados
    const guardado = localStorage.getItem("favoritos");

    // Si existen favoritos, los convertimos de JSON a array
    // Si no existen, comenzamos con un array vacío
    let favoritos = guardado
        ? JSON.parse(guardado)
        : [];



    // ¿LA SERIE YA ES FAVORITA?


    if (favoritos.includes(id)) {

        // Si ya estaba, la eliminamos
        favoritos = favoritos.filter((favorito) => {

            return favorito !== id;

        });

        // Cambiamos el texto del botón
        e.target.textContent = "❤️ Favorito";

    } else {

        // Si no estaba, la agregamos
        favoritos.push(id);

        // Cambiamos el texto del botón
        e.target.textContent = "✅ En Favoritos";
    }


    // Guardamos nuevamente los favoritos
    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );

});