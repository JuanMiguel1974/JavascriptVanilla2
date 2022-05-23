export { Model }

class Model {
    static nombre;
    constructor(id) {
        this.id = id;
    }
    assign(plainObject) { // El que vinga del servidor cal asignar-ho a la classe actual
        Object.assign(this, plainObject);
    }
}