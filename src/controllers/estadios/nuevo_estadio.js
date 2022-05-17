import view from '../../views/nuevo_estadio.html'
import { pages } from '../index.controller'
import { componentes } from '../../componentes/index.componentes'
import '../../css/toast.css'

export default () => {

    const estadiosPage = document.createElement('div');
    estadiosPage.innerHTML = view;
    estadiosPage.querySelector("div").prepend(componentes.navegacion());

    const url = "https://futbol-7727b-default-rtdb.firebaseio.com/estadios";

    function encodeImageFileAsURL() {
        var file = this.files[0];
        var reader = new FileReader();

        reader.onloadend = () => {
            console.log('RESULT', reader.result)
            this.imagen = reader.result;
            console.log(this.imagen);
            estadiosPage.querySelector("#formFoto").src = reader.result;
        };
        reader.readAsDataURL(file);
    }
    estadiosPage
        .querySelector("#formFoto")
        .addEventListener("change", encodeImageFileAsURL);

    estadiosPage.querySelector("#crear").addEventListener("click", function(event) {
        event.preventDefault();
        let estdioNuevo = {
            nombre: estadiosPage.querySelector("#nombre").value,
            aforo: estadiosPage.querySelector("#aforo").value,
            imagen: estadiosPage.querySelector("#formFoto").imagen,
            ciudad: estadiosPage.querySelector("#ciudad").value,
            pais: estadiosPage.querySelector("#pais").value,
        };
        console.log(estdioNuevo);

        fetch(url + ".json", {
            method: "post",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify(estdioNuevo),
        })

        .then((response) => response.json());
        pages.toast.init();
        pages.toast.show('Ingresado nuevo estadio con exito', 'success');
    });

    return estadiosPage;
}