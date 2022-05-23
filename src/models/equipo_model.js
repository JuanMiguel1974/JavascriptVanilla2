import { Model } from "./model.js";
export { Equipo, EquipoList }

class Equipo extends Model {
    constructor(id) { // En realitat no necessitem indicar tots els camps perquè els assignarem amb assign
        super(id);
    }
    static nombre = 'equipos'
}

class EquipoList extends Model {
    constructor(id) {
        super(id);
    }
    static nombre = 'listas'
}