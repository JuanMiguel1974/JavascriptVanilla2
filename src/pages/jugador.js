import { Page } from "../pages/page"
import { JugadorController } from "../controllers/jugador_controller"
import { JugadorView } from "../views/jugador_view.js";
import { JugadoresService } from "../services/jugador_service.js";
export { PageJugadores };

class PageJugadores extends Page {

    constructor(name) {
        super(name);
    }

    populate(container) {

        let jugadorController = new JugadorController(new JugadoresService(), new JugadorView(container));
    }
}