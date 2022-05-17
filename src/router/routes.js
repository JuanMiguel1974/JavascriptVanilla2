import { pages } from "../controllers/index.controller";
import { componentes } from "../componentes/index.componentes";

let content = document.getElementById('container')
const router = async(route) => {
    content.innerHTML = '';

    switch (route) {

        case '#/':
            return content.appendChild(componentes.home());

        case '#/login':

            return content.appendChild(pages.login());

        case '#/registro':

            return content.appendChild(pages.registro());

        case '#/nuevo_estadio':
            return content.appendChild(pages.nuevo_estadio());


        case '#/navegacion':

            return content.appendChild(componentes.navegacion());

        case '#/lista_estadios':

            return content.appendChild(await pages.lista_estadios());

        case '#/logout':

            return content.appendChild(componentes.home());
    }
};
export { router };