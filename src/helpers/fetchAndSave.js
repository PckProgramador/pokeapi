import fetch from "node-fetch";
import fs from "fs/promises";
//buscar con fetch y guardar
//va a guardar dentro del servidor lo que fetcheamos de la pokeapi
const apiUrl = "https://pokeapi.co/api/v2/pokemon/";
const filePath = "./server/db.json";
async function fetchAndSave() {
  //accedera a pokeapi, me traigo los pokemons (20) y guardare la informacion en server/db/json
  try {
    //voy a realizar una peticion a pokeapi
    const response = await fetch(apiUrl);
    const data = await response.json();
    const { results } = data;
    //funcion para guardarlo de node
    await fs.writeFile(filePath, JSON.stringify({ results }), null, 4);
  } catch (error) {
    console.log("error de acceso a la api", error.message);
  }
}

fetchAndSave();
