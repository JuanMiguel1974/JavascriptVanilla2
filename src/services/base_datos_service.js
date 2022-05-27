export { BaseDatosService };

class BaseDatosService {
    constructor(url) {
        this.url = url;
        this.Items = {};
        this.read();
    }

    read() {
        fetch(this.url + '.json')
            .then(response => response.json())
            .then(datosItems => {
                this.Items = Object.entries(datosItems).map(entrie => { entrie[1].id = entrie[0]; return entrie[1] });
                this.onCambioItems(this.Items);
            });
    }

    add(Item) {
        console.log('add', Item);
        fetch(this.url + '.json', { method: 'post', headers: { "Content-type": "application/json; charset=UTF-8" }, body: JSON.stringify(Item) })
            .then(response => response.json())
            .then(datos => {
                this.read();
            });
    }
    update(Item) {
        // Com que volem actualizar, els Items tenen id, que no és necessari en firebase, ja que és la clau
        // primer li llevem el id:
        let key = Item.id;
        delete Item.id;
        console.log('update', key);
        fetch(`${this.url}/${key}.json`, { method: 'put', headers: { "Content-type": "application/json; charset=UTF-8" }, body: JSON.stringify(Item) })
            .then(response => response.json())
            .then(datos => {
                this.read();
            });
    }
    remove(id) {
        console.log('remove', id);
        fetch(`${this.url}/${id}.json`, { method: 'delete', headers: { "Content-type": "application/json; charset=UTF-8" }, body: {} })
            .then(response => response.json())
            .then(datos => {
                this.read();
            });
    }

    notificarCambios(callback) {
        this.onCambioItems = callback;
    }

}