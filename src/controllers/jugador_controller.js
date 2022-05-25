import { Controller } from "../controllers/controller";
export { JugadorController }

class JugadorController extends Controller {
    constructor(service, view) {
        super(service, view);
        this.service.notificarCambios(this.onCambioItems);
        this.view.bindAddJugador(this.handleAddJugador);
        this.view.bindRemoveJugador(this.handleremoveJugador);
        this.view.bindEditJugador(this.handleUpdateJugador);
    }
    onCambioItems = Items => {
        this.view.mostrarItems(Items);
    }
    handleAddJugador = (jugador) => {
        this.service.add(jugador);
    }
    handleremoveJugador = (jugador) => {
        this.service.remove(jugador.id);
    }
    handleUpdateJugador = (jugador) => {
        this.service.update(jugador);
    }
}