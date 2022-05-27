import { Page } from "../pages/page"
import { RegistroController } from "../controllers/registro_controller"
import { RegistroView } from "../views/registro_view.js";
import { LoginService } from "../services/loginService";
export { PageRegister };

class PageRegister extends Page {

    constructor(name) {
        super(name);
    }

    populate(container) {
        let loginController = new RegistroController(new LoginService(), new RegistroView(container));
    }
}