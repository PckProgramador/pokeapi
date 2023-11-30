export function renderCardPokemon(container, pokemonData, callback) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.widht = "18rem";
  card.innerHTML = `
  <img src="${pokemonData.imagenes.urlfront}" class="card-img-top" alt="${pokemonData.name}">
  <div class="card-body">
    <h5 class="card-title">${pokemonData.name}</h5>
        <p class="card-text">Lore ipsum </p>
    </div>
  `;
  container.appendChild(card);
  //   container.innerHTML= ``
}
