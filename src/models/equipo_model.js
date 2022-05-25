import { Model } from "./model.js";
export { Equipo }

class Equipo extends Model {
    constructor(id) {
        super(id);
    }
    static nombre = 'equipos'
}