console.log("Hola, js cargando");

// Creamos la variable links y la igualamos a .nav-links (Lo que estamos buscando)
const links = document.querySelector(".nav-links");
const button = document.querySelector(".menu-button");

// Escuchamos el evento click del boton
button.addEventListener("click", () => {
  // Cuerpo de la funcion
  console.log("El boton fue presionado");
  links.classList.toggle("open");
});

// Declaramos las variables del texto a cambiar y el boton que lo cambia
const message = document.querySelector("#message");
const changeTextButton = document.querySelector("#changeTextButton");

changeTextButton.addEventListener("click", () => {
  message.textContent = "El texto ha sido actualizado";
  console.log("El texto ha cambiado");
});

const addItemButton = document.querySelector(".addItemButton");
const list = document.querySelector(".list");
let items = 1;

addItemButton.addEventListener("click", () => {
  // Creamos el elemento que no existe en la pagina
  const item = document.createElement("li");

  // Configuramos con el texto, y lo que necesite
  item.textContent = `Elemento de la lista numero ${items}`;
  items++;

  // Mostramos el elemento insertandolo en el DOM real
  list.appendChild(item);
});

const searchForm = document.querySelector("#searchForm");
const search = document.querySelector("#search");
const formResult = document.querySelector(".formResult");

searchForm.addEventListener("submit", (e) => {
  console.log("Entrando a preventDefault");
  console.log(e);
  e.preventDefault();

  if (search.value.trim() === "") {
    formResult.textContent = "Debes escribir algo";
  } else {
    formResult.textContent = `Estoy buscando a ${search.value}`;
  }
});

function sendMessage() {
  // Mensaje de contacto
}
