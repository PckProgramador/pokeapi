export function guardarLocalStorage(objeto) {
  if (localStorage.getItem("pokemons")) {
    const arrayAntiguo = JSON.parse(localStorage.getItem("pokemons"));
    const arrayNuevo = [].concat(arrayAntiguo, objeto);
    localStorage.setItem("pokemons", JSON.stringify(arrayNuevo));
  } else {
    localStorage.setItem("pokemons", JSON.stringify(objeto));
  }
}
