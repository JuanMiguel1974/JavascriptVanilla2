import { BaseDatosService } from "./base_datos_service"
export { JugadoresService }

class JugadoresService extends BaseDatosService {
    constructor() {
        super(`${app.url}futbolistas`);

    }
}

class ListaService extends BaseDatosService {
    constructor() {
        super(`${app.url}/futbolistas.json`);

    }
}