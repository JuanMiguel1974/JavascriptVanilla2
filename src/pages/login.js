import { Page } from "../pages/page"
import { LoginController } from "../controllers/login_controller"
import { LoginView } from "../views/login_view.js";
import { LoginService } from "../services/loginService";
export { PageLogin };

class PageLogin extends Page {

    constructor(name) {
        super(name);
    }

    populate(container) {
        let loginController = new LoginController(new LoginService(), new LoginView(container));
    }
}