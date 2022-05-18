import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import { router } from '../src/router/routes';
import { checkUsuario } from './utils/chekUsuario';
import { componentes } from './componentes/index.componentes';

window.app = {};
app.url = 'https://futbol-7727b-default-rtdb.firebaseio.com/';

(function autoinvocada() {
    document.addEventListener("DOMContentLoaded",
        async function domLoad() {

            if (checkUsuario()) {

                window.location.hash = '#/navegacion';

            } else {
                document.querySelector("body").prepend(componentes.menu());
                window.location.hash = '#/';

            }

            router(window.location.hash);
        })


    window.addEventListener("hashchange", () => {
        router(window.location.hash);
    });
})();