import view from '../../../html/lista_estadios.html'
import '../../../css/toast.css'
import { pages } from '../../index.controller'


const listaEstadiosPage = document.createElement('div');
listaEstadiosPage.innerHTML = view;

function encodeImageFileAsURL() {
    var file = this.files[0];
    var reader = new FileReader();

    reader.onloadend = () => {
        console.log('RESULT', reader.result)
        this.imagen = reader.result;
        console.log(this.imagen);
        //estadiosElement.querySelector("#formFoto").src = reader.result;
    };
    reader.readAsDataURL(file);
}
const getEstadios = async() => {
    const response = await (await fetch("https://futbol-7727b-default-rtdb.firebaseio.com/estadios.json"));

    console.log('getEstadios =>', response);
    return await response.json();
};

const draw = async() => {

    const estadiosElement = listaEstadiosPage.querySelector("#estadios");
    const estadios = await getEstadios();

    estadiosElement.innerHTML = ""

    for (let id in estadios) {
        let estadio = estadios[id];
        estadio.id = id;
        console.log('estadio=>', estadio);
        console.log('listado de estadios =>', estadio.id)

        estadiosElement.innerHTML += `
        <h2>
        ${estadio.id}</h2>
        <div class="card" style="width: 30rem;">
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
    }

    let botonesEliminar = estadiosElement.querySelectorAll(".borrar")
    let botonesModificar = estadiosElement.querySelectorAll('.modificar')

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function(event) {
            let id = event.target.getAttribute("ref");
            console.log('id que borro =>', id);

            let url = `https://futbol-7727b-default-rtdb.firebaseio.com/estadios/${id}.json`
            fetch(url, {
                    method: "delete",
                    headers: { "Content-type": "application/json; charset=UTF-8" },
                    body: {},
                })
                .then(() => draw())
        });
    });

    botonesModificar.forEach(boton => {
        boton.addEventListener("click", function(event) {
            let key = event.target.getAttribute("ref");
            console.log('update', key);

            let estadio = estadios[key];
            estadio.id = key;
            console.log('key que muestra los datos', key);

            console.log('este_nombre', estadio.nombre);

            estadiosElement.innerHTML = `
            <h2>Modifica el estadio</h2>
            <label for="nombre" class="form-label">Cambia el nombre</label>
             <input type="text" class="form-control" id="nombre" placeholder="nombre" value="${estadio.nombre}">
           </div>
           <div class="mb-3">
             <label for="ciudad" class="form-label">Cambia la ciudad</label>
             <input type="text" class="form-control" id="ciudad" placeholder="ciudad" value="${estadio.ciudad}">
           </div>
           <div class="mb-3">
             <label for="pais" class="form-label">Cambia el pais</label>
             <input type="text" class="form-control" id="pais" placeholder="pais" value="${estadio.pais}">
           </div>

           <div class="mb-3">
             <img class="card-img-top" src="${estadio.imagen}" alt="Foto estadio">
           </div>

         
           <div class="col-md-6">
           <label for="formFoto" class="form-label">Cambia la imagen</label>
           <input type="file" id="formFoto" class="form-control" onchange="encodeImageFilesAsURL()">
       </div>
       <button type="button" ref="${estadio.id}" class="btn btn-warning modificar" href="#/nuevo_estadio" >Modificar</button>
       </div>`;

            estadiosElement
                .querySelector("#formFoto")
                .addEventListener("change", encodeImageFileAsURL);

            estadiosElement.querySelector(".modificar").addEventListener("click", function(event) {
                let key = event.target.getAttribute("ref");
                delete event.target.getAttribute("ref");
                event.preventDefault();
                let estadioModificado = {
                    nombre: estadiosElement.querySelector("#nombre").value,
                    //aforo: estadiosElement.querySelector("#aforo").value,
                    imagen: estadiosElement.querySelector("#formFoto").imagen,
                    ciudad: estadiosElement.querySelector("#ciudad").value,
                    pais: estadiosElement.querySelector("#pais").value,

                };
                console.log(estadioModificado);

                fetch(`https://futbol-7727b-default-rtdb.firebaseio.com/estadios/${key}.json`, {
                        method: 'put',
                        headers: { "Content-type": "application/json; charset=UTF-8" },
                        body: JSON.stringify(estadioModificado),
                    })
                    .then((response) => {
                        if (response.ok) {

                            pages.toast.init();
                            pages.toast.show('Modificado con exito', 'success');
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);

                            return response.json();

                        } else {
                            pages.toast.init();
                            pages.toast.show('no se ha podido modificar', 'error');
                            setTimeout(() => {
                                window.location.reload();
                            }, 998);
                            return response.json().then((text) => {
                                console.log(text);
                                throw new Error(text.error.message);
                            });
                        }
                    })
            });

        });

    })

    return listaEstadiosPage;
}
export default draw