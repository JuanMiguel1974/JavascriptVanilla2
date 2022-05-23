import { Service } from "./service.js"
export { EquipoService }

class EquipoService extends Service {
    constructor() {
        super(`${app.url}equipos`);

    }
}


/* class ListaService extends Service {
	constructor() {
		super(`${app.url}/listas.json`);
	
	}
} */