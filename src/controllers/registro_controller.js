import { Controller } from "../controllers/controller";
export { RegistroController }

class RegistroController extends Controller {
    constructor(service, view) {
        super(service, view);
        this.view.mostrarItems([])
        this.view.bindRegister(this.handleRegister)
    }
    handleRegister = (usuario) => {
        this.service.register(usuario);
    }
}