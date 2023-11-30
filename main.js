import { renderCardPokemon } from "./src/components/renderCardPokemon/renderCardPokemon.js";

const URL = "http://localhost:4001/pokemons";
const app = document.querySelector("#app");

fetch(URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("no se ha podido cumplir la promesa");
    }
  })
  .then((data) => {
    data.map((pokemon) =>
      renderCardPokemon(app, pokemon, () => console.log("hola"))
    );
  })
  .catch((e) => {
    console.log(e);
  });
