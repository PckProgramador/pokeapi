/**
 *
 * @param {*} pagina
 * @returns El array de pokemons de la pagina en concreto
 */
export function getPokemonsPorPagina(pagina) {
  const pokemonsLocalStorage = JSON.parse(localStorage.getItem("pokemons"));
  //calculamos en que pagina estamos y del localstorage las posiciones del array que queremos de el
  let arrayPokemons = pokemonsLocalStorage.slice(9 * pagina - 9, 9 * pagina);
  return arrayPokemons;
}

/**
 *
 * @returns Devuelve el numero de paginas que existen en el localstorage
 */
export function getPaginasExistentes() {
  let arrayLocalStorage = JSON.parse(localStorage.getItem("pokemons"));
  return arrayLocalStorage.length / 9;
}
