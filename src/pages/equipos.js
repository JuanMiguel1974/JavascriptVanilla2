import { Page } from "../pages/page"
import { EquipoController } from "../controllers/equipo_controller"
import { EquipoView } from "../views/equipo_view.js";
import { EquipoService } from "../services/equipo_service.js";
export { PageEquipos };

class PageEquipos extends Page {

    constructor(name) {
        super(name);
    }

    populate(container) {
        let equipoController = new EquipoController(new EquipoService(), new EquipoView(container));
    }
}