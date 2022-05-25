import { Controller } from "../controllers/controller";
export { EquipoController }

class EquipoController extends Controller {
    constructor(service, view) {
        super(service, view);
        this.service.notificarCambios(this.onCambioItems);
        this.view.bindAddEquipo(this.handleAddEquipo);
        this.view.bindRemoveEquipo(this.handleremoveEquipo);
        this.view.bindEditEquipo(this.handleUpdateEquipo);
    }
    onCambioItems = Items => {
        this.view.mostrarItems(Items);
    }
    handleAddEquipo = (equipo) => {
        this.service.add(equipo);
    }
    handleremoveEquipo = (equipo) => {
        this.service.remove(equipo.id);
    }
    handleUpdateEquipo = (equipo) => {
        this.service.update(equipo);
    }
}