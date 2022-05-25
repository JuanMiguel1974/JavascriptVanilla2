import { Controller } from "../controllers/controller";
export { EstadioController }

class EstadioController extends Controller {
    constructor(service, view) {
        super(service, view);
        this.service.notificarCambios(this.onCambioItems);
        this.view.bindAddEstadio(this.handleAddEstadio);
        this.view.bindRemoveEstadio(this.handleremoveEstadio);
        this.view.bindEditEstadio(this.handleUpdateEstadio);
    }
    onCambioItems = Items => {
        this.view.mostrarItems(Items);
    }
    handleAddEstadio = (estadio) => {
        this.service.add(estadio);
    }
    handleremoveEstadio = (estadio) => {
        this.service.remove(estadio.id);
    }
    handleUpdateEstadio = (estadio) => {
        this.service.update(estadio);
    }
}