export { View }

class View {

    constructor(container) {
        this.container = container;
        this.divRow = document.createElement('div');
        this.Items = []
    }
    mostrarItems(Items = []) {
        this.Items = Items;
        // console.log("mostrarItems");
        this.container.innerHTML = '<h1>Login</h1>';
        this.divRow.innerHTML = '';
        this.divRow.classList.add('col', 'row-cols-4', 'row-cols-md-3', 'g-4');
        this.container.append(this.divRow);

        for (let key of Items) {
            this.render(key);
        }

        // Si no hay items, es solo una vista
        if (Items.length == 0) {
            this.render()
        }
    }
    render(Item) { // Esta funció serà sobreescrita per cada vista

    }

    removeItem(Item) {
        console.log(Item); // al fer el bind, aquesta funció es sobreescriu
    }

    updateItem(Item) {
        console.log(Item);
    }

    construirFormulario(Item, divItem) {} // Este és per a crear un formulari en un producte concret en un div concret

    mostrarFormulario() { // Este és per a mostrar el formulari de creació, crida internament a construirFormulario
    }

    editItem(Item, divItem) { // funció base que crea el formular i cancelar. El botó enviar es tindrà que escriurer
        divItem.innerHTML = '';
        this.construirFormulario(Item, divItem);
        let botonCancelar = document.createElement('button');
        botonCancelar.classList.add('btn', 'btn-danger');
        botonCancelar.innerHTML = 'Cancelar';
        divItem.append(botonCancelar);
        let botonEnviar = document.createElement('button');
        botonEnviar.classList.add('btn', 'btn-success');
        botonEnviar.innerHTML = 'Enviar';
        divItem.append(botonEnviar);
        botonCancelar.addEventListener('click', () => {
            this.mostrarItems(this.Items); // cal refrescar els items
        });
        botonEnviar.addEventListener('click', () => {
            this.updateItemEnviar(Item, divItem);
        });

    }

    updateItemEnviar(Item, divItem) {
        console.log(divItem); // esta funció es fa per separat per poder sobreescriure en la vista específica
    }

    botonEnviar = document.createElement('button'); // Necessari per associar events abans de crear la vista
}