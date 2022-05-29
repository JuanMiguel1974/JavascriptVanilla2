import { Page } from "../pages/page"
import { LoginController } from "../controllers/login_controller"
import { LoginView } from "../views/login_view.js";
import { AuthService } from "../services/authService";
export { PageLogin };

class PageLogin extends Page {

    constructor(name) {
        super(name);
    }

    populate(container) {
        let loginController = new LoginController(new AuthService(), new LoginView(container));
    }
}