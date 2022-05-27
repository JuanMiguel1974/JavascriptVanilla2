import { Page } from "../pages/page"
import { EstadioController } from "../controllers/estadio_controller"
import { EstadioView } from "../views/estadio_view.js";
import { EstadioService } from "../services/estadio_service.js";
export { PageEstadios };

class PageEstadios extends Page {

    constructor(name) {
        super(name);
    }

    populate(container) {
        let estadioController = new EstadioController(new EstadioService(), new EstadioView(container));
    }
}