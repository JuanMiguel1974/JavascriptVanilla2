import view from '../../views/lista_estadios.html'
import { componentes } from '../../componentes/index.componentes'

const listaEstadiosPage = document.createElement('div');
listaEstadiosPage.innerHTML = view;
listaEstadiosPage.querySelector("div").prepend(componentes.navegacion());


const getEstadios = async() => {
    const response = await (await fetch("https://futbol-7727b-default-rtdb.firebaseio.com/estadios.json"));

    console.log(response);
    return await response.json();
};

export default async() => {

    const estadiosElement = listaEstadiosPage.querySelector("#estadios");
    const estadios = await getEstadios();

    /*  Object.values(estadios).forEach((estadio) => {

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
        <button type="button" ref = "${estadio.id}" class="btn btn-danger borrar" >Elimimnar</button>
            <a href="#" class="card-link">Another link</a>
        </div>`;
        console.log(estadio);

        const deleteButtons = estadiosElement.querySelectorAll('.borrar');
        deleteButtons.forEach((button) => {

            button.addEventListener("click", function(event) {
                let array = Object.entries(estadios).map(entrie => { entrie[1].id = entrie[0]; return entrie[1] });
                let id = event.target.getAttribute("ref");
                console.log('id =>', id);
                fetch(`https://futbol-7727b-default-rtdb.firebaseio.com/estadios/${id}.json`, { method: 'delete', headers: { "Content-type": "application/json; charset=UTF-8" }, body: {} })
                    .then(response => response.json());
            });
        })

    });


    return listaEstadiosPage;

} */
    for (let id in estadios) {
        let estadio = estadios[id];
        estadio.id = id;

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
        <button type="button" ref="${estadio.id}" class="btn btn-danger borrar" >Elimimnar</button>
            <a href="#" class="card-link">Another link</a>
        </div>`;

        estadiosElement
            .querySelector(".borrar")
            .addEventListener("click", function(event) {
                let id = event.target.getAttribute("ref");

                fetch(
                    `https://futbol-7727b-default-rtdb.firebaseio.com/estadios/${id}.json`, {
                        method: "delete",
                        headers: { "Content-type": "application/json; charset=UTF-8" },
                        body: {},
                    }
                ).then((response) => response.json());
            });
        return listaEstadiosPage;
    }
}