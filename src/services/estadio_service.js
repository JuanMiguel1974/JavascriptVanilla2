import { BaseDatosService } from "./base_datos_service"
export { EstadioService }

class EstadioService extends BaseDatosService {
    constructor() {
        super(`${app.url}estadios`);

    }
}

class ListaService extends BaseDatosService {
    constructor() {
        super(`${app.url}/estadios.json`);

    }
}