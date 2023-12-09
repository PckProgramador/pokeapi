import { createListBack, createListFront } from "./createList";
import { formattedObject } from "./formattedObject";
import { guardarLocalStorage } from "./guardarLocalStorage";

/**
 * Funcion que llama a la pokeapi para saber en directo cuantos
 * pokemons hay en su base de datos en total
 * @param {String} url
 * @returns number
 */
async function getNumeroPokemonsAPI(url) {
  const response = await fetch(url);
  const objeto = await response.json();
  //devolveria 1282 pero esta rota la pokemon api, te dice un total que no existe luego, el real es 1017
  return 120;
}

/**
 * Funcion que fetchea 9 pokemons aleatorios de la api
 * @param {String} urlStandard
 */

const contador = 0;
export async function getRandomPokemons(urlStandard, callback) {
  let totalPokemons = await getNumeroPokemonsAPI(urlStandard);
  await generar9pokemons(urlStandard, callback, totalPokemons);

  //guardas en el localStorage todos los pokemons que renderices
}

async function generar9pokemons(urlStandard, callback, totalPokemons) {
  for (let i = 0; i < 9; i++) {
    let numeroAleatorio = Math.floor(Math.random() * totalPokemons) + 1;
    fetch(urlStandard + numeroAleatorio)
      .then((response) => response.json())
      .then((data) => {
        guardarLocalStorage(formattedObject(data));
        callback(data);
      })
      .catch((error) => console.log(error));
  }
}

export async function getPokemonByName(urlStandard, name, callback) {
  fetch(urlStandard + name)
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((error) => console.log(error));
}

export async function getPokemonData(url, nombre, e, card, cardBody) {
  fetch(url + nombre)
    .then((response) => response.json())
    .then((data) => {
      if (e.target.src === data.sprites.back_default) {
        e.target.src = data.sprites.front_default;
        createListFront(data, card, cardBody);
      } else {
        e.target.src = data.sprites.back_default;
        createListBack(data, card, cardBody);
      }
    });
}
