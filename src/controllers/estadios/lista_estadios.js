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

const draw = async() => {

    const estadiosElement = listaEstadiosPage.querySelector("#estadios");
    const estadios = await getEstadios();


    estadiosElement.innerHTML = ""
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
        </div>
        <div class="card-body">
        <button type="button" ref="${estadio.id}" class="btn btn-warning modificar" >Modificar</button>
        </div>`;

        console.log(estadio.id)


    }

    let botonesEliminar = estadiosElement.querySelectorAll(".borrar")
    let botonesModificar = estadiosElement.querySelectorAll('.modificar')

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function(event) {
            let id = event.target.getAttribute("ref");

            let url = `https://futbol-7727b-default-rtdb.firebaseio.com/estadios/${id}.json`
            fetch(url, {
                method: "delete",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: {},
            }).then(() => draw());
        });
    });

    botonesModificar(Item).forEach(boton => {
        boton.addEventListener("click", function(event) {
            let id = event.target.getAttribute("ref");
            delete this.id;

            fetch(`https://futbol-7727b-default-rtdb.firebaseio.com/estadios/${id}.json`, { method: 'put', headers: { "Content-type": "application/json; charset=UTF-8" }, body: JSON.stringify(Item) })
                .then(response => response.json())

        });
    });
    return listaEstadiosPage;
}

export default draw