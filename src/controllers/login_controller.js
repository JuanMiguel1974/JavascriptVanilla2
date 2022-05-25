import { Controller } from "../controllers/controller";
export { LoginController }

class LoginController extends Controller {
    constructor(service, view) {
        super(service, view);
        this.view.bindLogin(this.handleLogin);
    }
    handleLogin = (user) => {
        this.service.login(user);
    }
}