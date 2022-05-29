import { View } from "./view.js"
import { componentes } from '../componentes/index.componentes'

export { EstadioView };

// Objeto predefinido

let estadioPredefinido = {
    id: '',
    nombre: '',
    ciudad: '',
    pais: '',
    imagen: ''
};

class EstadioView extends View {
    constructor(container) { super(container); }

    render(estadio) {
        // console.log(estadio);
        document.querySelector("#container").prepend(componentes.navegacion());
        let divEstadio = document.createElement('div');
        divEstadio.classList.add('col', 'mt-5', 'pt-5');
        divEstadio.innerHTML = `
        <div class="card position-relative">
        <img src="${estadio.imagen}" class="card-img-top" alt="${estadio.nombre}">
        <div class="card-body">
          <h5 class="card-title">${estadio.nombre}  </h5>
          <p class="card-text">Pais: ${estadio.pais}</p>
          <p class="card-text">Ciudad: ${estadio.ciudad}</p>
        </div>
<div class="position-absolute top-0 end-0">
<button type="button" class="btn btn-warning  edit">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>
</button>
        <button type="button" class="btn btn-danger  delete">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
</svg>
      </button>
      </div>
      
      </div>
        `;

        divEstadio.querySelector('button.delete').addEventListener('click', () => this.removeItem(estadio));
        divEstadio.querySelector('button.edit').addEventListener('click', () => this.editItem(estadio, divEstadio));

        this.divRow.append(divEstadio);

    }

    construirFormulario(estadio, divEstadio) {
        if (estadio == undefined) { estadio = estadioPredefinido }

        let formulario = `<div class="mb-3">
    <label for="formNombre" class="form-label">Nombre</label>
    <input type="text" class="form-control" id="formNombre" placeholder="Nombre" value="${estadio.nombre}">
  </div>
  <div class="mb-3">
    <label for="formCiudad" class="form-label">Ciudad</label>
    <input type="text" class="form-control" id="formCiudad" placeholder="Ciudad" value="${estadio.ciudad}">
  </div>
  <div class="mb-3">
    <label for="formPais" class="form-label">Pais</label>
    <input type="text" class="form-control" id="formPais" placeholder="Pais" value="${estadio.pais}">
  </div>
  <div class="mb-3">
    <label for="formFoto" class="form-label">Foto</label>
    <input type="file" class="form-control" id="formFoto" placeholder="Foto">
    <img class="formFotoPreview" style="width:200px"/>
  </div>`

        divEstadio.innerHTML = formulario;

        divEstadio.querySelector('#formFoto').imagen = estadio.imagen;
        divEstadio.querySelector('.formFotoPreview').src = estadio.imagen;

        divEstadio.querySelector('#formFoto').addEventListener('change', function() {
            let file = this.files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                this.imagen = reader.result;
                divEstadio.querySelector('.formFotoPreview').src = this.imagen;
            }
            reader.readAsDataURL(file);
        });
    }

    mostrarFormulario() {
        let divFormulario = document.createElement('div');
        divFormulario.classList.add('col', 'mt-5', 'pt-5');
        let botonNuevo = document.createElement('button');
        botonNuevo.classList.add('btn', 'btn-primary');
        botonNuevo.innerHTML = 'Nuevo';
        divFormulario.append(botonNuevo);
        let formularioEstadio = document.createElement('div');

        this.construirFormulario(null, formularioEstadio);
        formularioEstadio.style.display = 'none';


        let botonCancelar = document.createElement('button');
        botonCancelar.classList.add('btn', 'btn-danger');
        botonCancelar.innerHTML = 'Cancelar';
        divFormulario.append(botonCancelar);
        botonCancelar.style.display = 'none';

        botonNuevo.addEventListener('click', function() {
            botonCancelar.style.display = '';
            formularioEstadio.style.display = '';
            this.style.display = 'none';
        });

        botonCancelar.addEventListener('click', function() {
            botonNuevo.style.display = '';
            formularioEstadio.style.display = 'none';
            this.style.display = 'none';
        });

        divFormulario.append(formularioEstadio);
        this.formularioEstadio = formularioEstadio;

        this.botonEnviar.classList.add('btn', 'btn-success');
        this.botonEnviar.innerHTML = 'Enviar';
        formularioEstadio.append(this.botonEnviar);

        this.divRow.append(divFormulario);
    }

    bindAddEstadio(handler) {
        this.botonEnviar.addEventListener('click', () => {
            /* let nombre = this.formularioEstadio.querySelector('#formNombre').value;
            let ciudad = this.formularioEstadio.querySelector('#formCiudad').value;
            let pais = this.formularioEstadio.querySelector('#formPais').value;
            let imagen = this.formularioEstadio.querySelector('#formFoto').imagen; */

            //Destructuring de formulario estadio
            const [formNombre, formCiudad, formPais, formFoto] = [...this.formularioEstadio.querySelectorAll('input')]
            let nombre = formNombre.value;
            let ciudad = formCiudad.value;
            let pais = formPais.value;
            let imagen = formFoto.imagen;


            handler({ nombre, ciudad, pais, imagen });
        });
    }

    bindRemoveEstadio(handler) {
        this.removeItem = handler;
    }

    bindEditEstadio(handler) {
        this.updateItem = handler;
    }

    updateItemEnviar(Item, divItem) {

        Item.nombre = divItem.querySelector('#formNombre').value;
        Item.ciudad = divItem.querySelector('#formCiudad').value;
        Item.pais = divItem.querySelector('#formPais').value;
        Item.imagen = divItem.querySelector('#formFoto').imagen;
        this.updateItem(Item);
    }
}