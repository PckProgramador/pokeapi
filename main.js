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
//Si ya hemos estado en esta pagina
/**
 * Eventos
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

botonBuscar.addEventListener("click", (e) => {
  const dialog = document.getElementsByTagName("dialog");
  if (dialog[0]) {
    dialog[0].remove();
  }
  getPokemonByName(urlPokemon, input.value, (data) => {
    let carta1 = renderCard(data);
    const modal = document.createElement("dialog");
    app.appendChild(modal);
    modal.appendChild(carta1);
    modal.showModal();
    modal.addEventListener("click", (r) => {
      modal.close();
    });
  });
});

input.addEventListener("keydown", (e) => {
  const dialog = document.getElementsByTagName("dialog");
  if (dialog[0]) {
    dialog[0].remove();
  }
  if (e.key == "Enter") {
    getPokemonByName(urlPokemon, input.value, (data) => {
      let carta1 = renderCard(data);
      //esto es pra insertarlo el primero
      // app.insertBefore(carta1, app.firstChild);
      //con un DIALOG
      const modal = document.createElement("dialog");
      app.appendChild(modal);
      modal.appendChild(carta1);
      modal.showModal();
      modal.addEventListener("click", (r) => {
        modal.close();
      });
    });
  }
});

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
