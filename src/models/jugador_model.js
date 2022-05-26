import { Model } from "./model.js";
export { Jugador }

class Jugador extends Model {
    constructor(id) {
        super(id);
    }
    static nombre = 'jugadores'
}