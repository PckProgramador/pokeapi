/**
 * Funcion que edita la carta para mostrar la imagen frontal y la informacion deseada
 * @param {Object} objeto el objeto pokemon del que sacamos los datos
 * @param {HTMLElement} card carta a la que vamos a añadir la informacion
 * @param {HTMLElement} cardBody parte de la carta donde va la informacion como el tipo o las habiliades
 */
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

/**
 * Funcion que edita la carta para mostrar la imagen trasera y la informacion deseada
 * @param {Object} objeto el objeto pokemon del que sacamos los datos
 * @param {HTMLElement} card carta a la que vamos a añadir la informacion
 * @param {HTMLElement} cardBody parte de la carta donde va la informacion como el tipo o las habiliades
 */

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
