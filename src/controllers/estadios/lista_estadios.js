import view from '../../views/lista_estadios.html'
import { componentes } from '../../componentes/index.componentes'

const listaEstadiosPage = document.createElement('div');
listaEstadiosPage.innerHTML = view;
listaEstadiosPage.querySelector("div").prepend(componentes.navegacion());

const getEstadios = async() => {
    const response = await fetch("https://futbol-7727b-default-rtdb.firebaseio.com/estadios.json");
    console.log(response);
    return await response.json();
};
export default async() => {


    const estadiosElement = listaEstadiosPage.querySelector("#estadios");

    const estadios = await getEstadios();

    Object.values(estadios).forEach((estadio) => {
        estadiosElement.innerHTML += `

        <div class="card" style="width: 100rem;">
        <div class="card-body">
            <h5 class="card-title">${estadio.nombre}</h5>

        </div>
        <ul class="list-group list-group-flush">
            <img class="card-img-top" src="${estadio.imagen}" alt="Foto estadio">
            <li class="list-group-item">Ciudad: ${estadio.ciudad}</li>
            <li class="list-group-item">Pais: ${estadio.pais}</li>
            <li class="list-group-item">Aforo: ${estadio.aforo}</li>

        </ul>
        <div class="card-body">
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
        </div>
      `;
        console.log(estadio)
    })

    return listaEstadiosPage;

}