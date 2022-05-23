import { View } from "./view.js"

export { EquipoListView, EquipoView };

class EquipoView extends View {
    constructor(container) { super(container); }

    render(producto) {
        // console.log(producto);
        let divProducto = document.createElement('div');
        divProducto.classList.add('col');
        divProducto.innerHTML = `
        <div class="card position-relative">
        <img src="${producto.foto}" class="card-img-top" alt="${producto.referencia}">
        <div class="card-body">
          <h5 class="card-title">${producto.marca}  ${producto.referencia}</h5>
          <p class="card-text">${producto.precio}</p>
        </div>
<div class="position-absolute top-0 end-0">
<button type="button" class="btn btn-secondary  edit">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
</button>
        <button type="button" class="btn btn-secondary  delete">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
</svg>
      </button>
      </div>
      
      </div>
        `;
        // El botó d'esborrat crida a removeItem que ha sigut sobreescrit per binRemoveProduct a la funció del controlador
        // que crida a la funció del servici
        divProducto.querySelector('button.delete').addEventListener('click', () => this.removeItem(producto));
        divProducto.querySelector('button.edit').addEventListener('click', () => this.editItem(producto, divProducto));

        this.divRow.append(divProducto);

    }

    construirFormulario(producto, divProducto) {
        if (producto == undefined) { producto = { id: '', marca: '', referencia: '', precio: '', foto: '' } }

        let formulario = `<div class="mb-3">
    <label for="formMarca" class="form-label">Marca</label>
    <input type="text" class="form-control" id="formMarca" placeholder="Marca" value="${producto.marca}">
  </div>
  <div class="mb-3">
    <label for="formReferencia" class="form-label">Rerefencia</label>
    <input type="text" class="form-control" id="formReferencia" placeholder="Referencia" value="${producto.referencia}">
  </div>
  <div class="mb-3">
    <label for="formPrecio" class="form-label">Precio</label>
    <input type="text" class="form-control" id="formPrecio" placeholder="Precio" value="${producto.precio}">
  </div>
  <div class="mb-3">
    <label for="formFoto" class="form-label">Foto</label>
    <input type="file" class="form-control" id="formFoto" placeholder="Foto">
    <img class="formFotoPreview" style="width:200px"/>
  </div>`

        divProducto.innerHTML = formulario;

        divProducto.querySelector('#formFoto').foto = producto.foto; // per a afegir l'atribut foto a l'input
        divProducto.querySelector('.formFotoPreview').src = producto.foto;

        divProducto.querySelector('#formFoto').addEventListener('change', function() {
            let file = this.files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                    this.foto = reader.result;
                    divProducto.querySelector('.formFotoPreview').src = this.foto;
                } // this.foto es guarda en el input
            reader.readAsDataURL(file);
        });
    }

    mostrarFormulario() {
        let divFormulario = document.createElement('div');
        divFormulario.classList.add('col');
        let botonNuevo = document.createElement('button');
        botonNuevo.classList.add('btn', 'btn-primary');
        botonNuevo.innerHTML = 'Nuevo';
        divFormulario.append(botonNuevo);
        let formularioProducto = document.createElement('div');

        this.construirFormulario(null, formularioProducto);
        formularioProducto.style.display = 'none';


        let botonCancelar = document.createElement('button');
        botonCancelar.classList.add('btn', 'btn-danger');
        botonCancelar.innerHTML = 'Cancelar';
        divFormulario.append(botonCancelar);
        botonCancelar.style.display = 'none';

        botonNuevo.addEventListener('click', function() {
            botonCancelar.style.display = '';
            formularioProducto.style.display = '';
            this.style.display = 'none';
        });

        botonCancelar.addEventListener('click', function() {
            botonNuevo.style.display = '';
            formularioProducto.style.display = 'none';
            this.style.display = 'none';
        });

        divFormulario.append(formularioProducto);
        this.formularioProducto = formularioProducto; // Per comoditat he fet una variable de la funció però després ho assigne a un atribut

        this.botonEnviar.classList.add('btn', 'btn-success');
        this.botonEnviar.innerHTML = 'Enviar';
        formularioProducto.append(this.botonEnviar);

        this.divRow.append(divFormulario);
    }

    bindAddProduct(handler) {
        this.botonEnviar.addEventListener('click', () => {
            let marca = this.formularioProducto.querySelector('#formMarca').value;
            let referencia = this.formularioProducto.querySelector('#formReferencia').value;
            let precio = this.formularioProducto.querySelector('#formPrecio').value;
            let foto = this.formularioProducto.querySelector('#formFoto').foto;

            handler({ marca, referencia, precio, foto }); // La vista sols crea un objecte que envia al manejador
            // El controlador assignarà un manejador per a que el servici cree el producte
        });
    }


    bindRemoveProduct(handler) {
        this.removeItem = handler;
    }

    bindEditProduct(handler) {
        this.updateItem = handler; // associem l'edició del producte a la funció que diga el controlador
        // aquesta rebrà el producte a modificar
    }

    updateItemEnviar(Item, divItem) {

        Item.marca = divItem.querySelector('#formMarca').value;
        Item.referencia = divItem.querySelector('#formReferencia').value;
        Item.precio = divItem.querySelector('#formPrecio').value;
        Item.foto = divItem.querySelector('#formFoto').foto;
        this.updateItem(Item); // cal refrescar els items
    }


}

class EquipoListView extends View {
    constructor() { super(); }
}