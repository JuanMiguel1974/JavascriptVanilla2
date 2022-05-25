import { BaseDatosService } from "./base_datos_service"
export { EquipoService }

class EquipoService extends BaseDatosService {
    constructor() {
        super(`${app.url}equipos`);

    }
}

class ListaService extends BaseDatosService {
    constructor() {
        super(`${app.url}/equipos.json`);

    }
}