//import { pages } from "../controllers/index.controller";
import { componentes } from "../componentes/index.componentes";

let content = document.getElementById('container')
const router = async(route) => {

    switch (route) {

        case '#/':
            return content.appendChild(componentes.home());
            /* 
                    case '#/registro':

                        return content.appendChild(pages.registro()); */

        case '#/navegacion':

            return content.appendChild(componentes.navegacion());

        case '#/logout':

            return content.appendChild(componentes.home());
    }

};
export { router };