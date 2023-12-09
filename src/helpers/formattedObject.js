export function formattedObject(object, urlPokemon) {
  const objetoDevolver = {
    name: object.name,
    types: object.types,
    abilities: object.abilities,
    sprites: {
      front_default: object.sprites.front_default,
      back_default: object.sprites.back_default,
    },
    url: urlPokemon,
  };
  return objetoDevolver;
}
