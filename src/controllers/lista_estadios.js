import view from '../views/lista_estadios.html'
import { estadio } from '../utils/models'

export default async() => {

    const getEstadios = async() => {
        const response = await fetch("https://futbol-7727b-default-rtdb.firebaseio.com/estadios.json");
        return await response.json();
    };

    const listaEstadiosPage = document.createElement('div');
    listaEstadiosPage.innerHTML = view;

    const estadiosElement = listaEstadiosPage.querySelector("#estadios");
    const totalEstadios = divElement.querySelector('#estadios');

    const estadios = await getEstadios();

    estadios.forEach((estadio) => {
        estadiosElement.innerHTML += `
           <li class="list-group-item border-light bg-dark text-white">
           <h5>${estadio.nombre}</h5>
           <p>
           ${estadio.aforo}
           </p>
           </li>
         `;
    });

    totalEstadios.innerHTML += estadios.length;

    return listaEstadiosPage;
}