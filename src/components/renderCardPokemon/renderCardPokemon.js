/**
 * HTLM de una card
 * 
 <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>
 */

export function renderCard(objeto) {
  //Contenedor carta
  let card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";
  //Imagen del pokemon
  let imagen = document.createElement("img");
  imagen.classList.add("card-img-top");
  //Cuerpo con la información de la carta
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  //Nombre del pokemon
  let nombre = document.createElement("h5");
  nombre.classList.add("card-title");
  //Tipo del pokemon
  let tipo = document.createElement("p");
  tipo.classList.add("card-text");

  //Estructura de la carta
  card.appendChild(imagen);
  card.appendChild(cardBody);
  cardBody.appendChild(nombre);
  cardBody.appendChild(tipo);

  //Rellenar la carta
  imagen.src = objeto.sprites.front_default;
  nombre.textContent = objeto.name;
  const lista = document.createElement("ul");
  cardBody.appendChild(lista);
  let contador = 1;
  for (let tipo of objeto.types) {
    let li = document.createElement("li");
    li.textContent = "Tipo " + contador + " :" + tipo.type.name;
    contador++;
    lista.appendChild(li);
  }

  return card;
}
