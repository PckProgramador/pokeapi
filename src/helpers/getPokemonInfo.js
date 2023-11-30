import fetch from "node-fetch";
import fs from "fs/promises";

//buscar con fetch y guardar
//va a guardar dentro del servidor lo que fetcheamos de la pokeapi
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const filePath = "./server/pokemonDetails.json";
let pokemonUrl = "";
export async function getPokemonInfo() {
  //accedera a pokeapi, me traigo los pokemons (20) y guardare la informacion en server/db/json
  try {
    //voy a realizar una peticion a pokeapi
    const response = await fetch(apiUrl);
    const data = await response.json();
    const { results } = data;
    let objetoDevolver = {};
    const pokemons = [];
    //funcion para guardarlo de node
    for (let pokemon of results) {
      pokemonUrl = pokemon["url"];
      const response2 = await fetch(pokemonUrl);
      const data2 = await response2.json();
      objetoDevolver = {
        name: pokemon["name"],
        url: pokemon["url"],
        imagenes: {
          urlfront: data2.sprites.front_default,
          urlback: data2.sprites.back_default,
        },
        abilities: data2["abilities"].map(
          (ability, index) => ability["ability"].name
        ),
      };
      pokemons.push(objetoDevolver);
    }
    await fs.writeFile(filePath, JSON.stringify({ pokemons }, null, 2));
  } catch (error) {
    console.log("error de acceso a la api", error.message);
  }
}

getPokemonInfo();
