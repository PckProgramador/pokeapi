/**
 * Funcion que le pasas el array de pokemons y te los printea
 * @param {*} array
 * @param {*} cartaPokemon
 * @param {*} app
 */
export function mostrarPokemons(array, cartaPokemon, app) {
  let pokemons = getPokemonsPorPagina(paginaActual);
  for (let element of pokemons) {
    const cartaPokemon = renderCard(element);
    app.appendChild(cartaPokemon);
  }
}
