export function createListFront(objeto, card, cardBody) {
  //Borramos  la  lista previa  dentro de la card
  const lista1 = card.querySelector("ul");
  lista1.remove();

  //Creamos la nueva lista dentro de la card
  const lista = document.createElement("ul");
  const cajita = card.querySelector(".card-text");

  //Creamos un bucle para crear tantos elementos li como habilidades haya en la BBDD
  let contador = 1;
  cajita.textContent = "";
  for (let tipo of objeto.types) {
    let li = document.createElement("li");
    li.textContent = "Tipo " + contador + " :" + tipo.type.name;
    contador++;
    lista.appendChild(li);
  }

  //Introducimos la lista al body de la carta
  cardBody.appendChild(lista);
}

export function createListBack(objeto, card, cardBody) {
  //Borramos  la  lista previa  dentro de la card
  const lista1 = card.querySelector("ul");
  lista1.remove();

  //Creamos la nueva lista dentro de la card
  const lista = document.createElement("ul");
  const cajita = card.querySelector(".card-text");

  //Creamos un bucle para crear tantos elementos li como habilidades haya en la BBDD
  let contador = 1;
  cajita.textContent = "";
  for (let habilidad of objeto.abilities) {
    let li = document.createElement("li");
    li.textContent = "Habilidad " + contador + " :" + habilidad.ability.name;
    contador++;
    lista.appendChild(li);
  }

  //Introducimos la lista al body de la carta
  cardBody.appendChild(lista);
}
