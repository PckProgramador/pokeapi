/**
 * Imports
 */
import { renderCard } from "./src/components/renderCardPokemon/renderCardPokemon";
import {
  getPokemonByName,
  getPokemonData,
  getRandomPokemons,
} from "./src/helpers/fetchApi";
import {
  getPaginasExistentes,
  getPokemonsPorPagina,
} from "./src/helpers/getLocalStorage";

/**
 * Variables globales
 */
const urlPokemon = "https://pokeapi.co/api/v2/pokemon/";
const app = document.getElementById("app");
const botonBuscar = document.getElementById("boton");
const input = document.getElementById("buscadorInput");
const inputPaginaSiguiente = document.getElementById("botonSiguiente");
const inputPaginaAnterior = document.getElementById("botonAnterior");
const paginaIndex = document.getElementById("pagina");
let paginaActual = 1;

/**
 * funciones
 */
function init() {
  if (!localStorage.getItem("pokemons")) {
    //INICIO DE LA APLICACION
    paginaActual = 1;
    getRandomPokemons(urlPokemon, (data) => {
      const carta = renderCard(data);
      app.appendChild(carta);
    });
  } else {
    let pokemons = getPokemonsPorPagina(paginaActual);
    for (let element of pokemons) {
      const cartaPokemon = renderCard(element);
      app.appendChild(cartaPokemon);
    }
  }
}

/**
 * Funcion que borra todas las cartas mostradas en la vista
 */
function borrarCartas() {
  let get = document.querySelectorAll(".card");
  get.forEach((element) => {
    element.remove();
  });
}

/**
 * Logica
 */
init();
paginaIndex.textContent = "Pagina : " + paginaActual;

/**
 * Eventos
 */

/**
 * Evento dar vuelta a las imagenes
 */
app.addEventListener("dblclick", (e) => {
  if (e.target.classList.contains("card-img-top")) {
    const card = e.target.closest(".card");
    const nombre = card.querySelector(".card-title").textContent;
    const cardBody = card.querySelector(".card-body");
    //Fetcheamos la información de los pokemon y la pintamos
    getPokemonData(urlPokemon, nombre, e, card, cardBody);
  }
});

/**
 * Evento buscador de pokemons por BOTON
 */
botonBuscar.addEventListener("click", (e) => {
  //Si ya existe un dialog previo lo borramos
  const dialog = document.getElementsByTagName("dialog");
  if (dialog[0]) {
    dialog[0].remove();
  }
  //Creamos el dialog para el pokemon buscado
  getPokemonByName(urlPokemon, input.value, (data) => {
    let carta1 = renderCard(data);
    const modal = document.createElement("dialog");
    //Unimos al div contenedor el dialog y mostramos la información
    app.appendChild(modal);
    modal.appendChild(carta1);
    modal.showModal();
    modal.addEventListener("click", (r) => {
      modal.close();
    });
  });
});

/**
 * Evento buscador de pokemons por TECLA
 */
input.addEventListener("keydown", (e) => {
  //Si ya existe un dialog previo lo borramos
  const dialog = document.getElementsByTagName("dialog");
  if (dialog[0]) {
    dialog[0].remove();
  }
  //Creamos el dialog para el pokemon buscado
  if (e.key == "Enter") {
    getPokemonByName(urlPokemon, input.value, (data) => {
      let carta1 = renderCard(data);
      const modal = document.createElement("dialog");
      //Unimos al div contenedor el dialog y mostramos la información
      app.appendChild(modal);
      modal.appendChild(carta1);
      modal.showModal();
      modal.addEventListener("click", (r) => {
        modal.close();
      });
    });
  }
});

/**
 * Evento BOTON pagina siguiente
 */
inputPaginaAnterior.addEventListener("click", (e) => {
  if (paginaActual > 1) {
    paginaActual--;
    borrarCartas();
    let pokemons = getPokemonsPorPagina(paginaActual);
    for (let element of pokemons) {
      const cartaPokemon = renderCard(element);
      app.appendChild(cartaPokemon);
    }
  }

  paginaIndex.textContent = "Pagina : " + paginaActual;
});

/**
 * Evento BOTON pagina anterior
 */
inputPaginaSiguiente.addEventListener("click", (e) => {
  let numeroPaginas = getPaginasExistentes();
  borrarCartas();
  paginaActual++;
  if (paginaActual > numeroPaginas) {
    getRandomPokemons(urlPokemon, (data) => {
      const carta = renderCard(data);
      app.appendChild(carta);
    });
  } else {
    let pokemons = getPokemonsPorPagina(paginaActual);
    for (let element of pokemons) {
      const cartaPokemon = renderCard(element);
      app.appendChild(cartaPokemon);
    }
  }
  paginaIndex.textContent = "Pagina : " + paginaActual;
});
