import { Model } from "./model.js";
export { Estadio }

class Estadio extends Model {
    constructor(id) {
        super(id);
    }
    static nombre = 'estadios'
}