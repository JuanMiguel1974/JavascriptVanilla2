import { View } from "./view.js"
import { componentes } from '../componentes/index.componentes'

export { EquipoView };

class EquipoView extends View {
    constructor(container) { super(container); }

    render(equipo) {
        // console.log(equipo);
        document.querySelector("#container").prepend(componentes.navegacion());
        let divEquipo = document.createElement('div');
        divEquipo.classList.add('col', 'mt-5', 'pt-5');
        divEquipo.innerHTML = `
        <div class="card position-relative">
        <img src="${equipo.escudo}" class="card-img-top" alt="${equipo.nombre}">
        <div class="card-body">
          <h5 class="card-title">${equipo.nombre}  </h5>
          <p class="card-text">Pais: ${equipo.pais}</p>
          <p class="card-text">Ciudad: ${equipo.ciudad}</p>
          <p class="card-text">Año de fundacion ${equipo.anyFundacion}</p>
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

        divEquipo.querySelector('button.delete').addEventListener('click', () => this.removeItem(equipo));
        divEquipo.querySelector('button.edit').addEventListener('click', () => this.editItem(equipo, divEquipo));

        this.divRow.append(divEquipo);

    }

    construirFormulario(equipo, divEquipo) {
        if (equipo == undefined) { equipo = { id: '', nombre: '', ciudad: '', anyFundacion: '', pais: '', escudo: '' } }

        let formulario = `<div class="mb-3">
    <label for="formNombre" class="form-label">Nombre</label>
    <input type="text" class="form-control" id="formNombre" placeholder="Nombre" value="${equipo.nombre}">
  </div>
  <div class="mb-3">
    <label for="formCiudad" class="form-label">Ciudad</label>
    <input type="text" class="form-control" id="formCiudad" placeholder="Ciudad" value="${equipo.ciudad}">
  </div>
  <div class="mb-3">
    <label for="formPais" class="form-label">Pais</label>
    <input type="text" class="form-control" id="formPais" placeholder="Pais" value="${equipo.pais}">
  </div>
  <div class="mb-3">
    <label for="formAnyFundacion" class="form-label">Año fundacion</label>
    <input type="text" class="form-control" id="formAnyFundacion" placeholder="Año fundacion" value="${equipo.anyFundacion}">
  </div>
  <div class="mb-3">
    <label for="formFoto" class="form-label">Foto</label>
    <input type="file" class="form-control" id="formFoto" placeholder="Foto">
    <img class="formFotoPreview" style="width:200px"/>
  </div>`

        divEquipo.innerHTML = formulario;

        divEquipo.querySelector('#formFoto').escudo = equipo.escudo; // per a afegir l'atribut foto a l'input
        divEquipo.querySelector('.formFotoPreview').src = equipo.escudo;

        divEquipo.querySelector('#formFoto').addEventListener('change', function() {
            let file = this.files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                    this.escudo = reader.result;
                    divEquipo.querySelector('.formFotoPreview').src = this.escudo;
                } // this.foto es guarda en el input
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
        let formularioequipo = document.createElement('div');

        this.construirFormulario(null, formularioequipo);
        formularioequipo.style.display = 'none';


        let botonCancelar = document.createElement('button');
        botonCancelar.classList.add('btn', 'btn-danger');
        botonCancelar.innerHTML = 'Cancelar';
        divFormulario.append(botonCancelar);
        botonCancelar.style.display = 'none';

        botonNuevo.addEventListener('click', function() {
            botonCancelar.style.display = '';
            formularioequipo.style.display = '';
            this.style.display = 'none';
        });

        botonCancelar.addEventListener('click', function() {
            botonNuevo.style.display = '';
            formularioequipo.style.display = 'none';
            this.style.display = 'none';
        });

        divFormulario.append(formularioequipo);
        this.formularioequipo = formularioequipo;

        this.botonEnviar.classList.add('btn', 'btn-success');
        this.botonEnviar.innerHTML = 'Enviar';
        formularioequipo.append(this.botonEnviar);

        this.divRow.append(divFormulario);
    }

    bindAddEquipo(handler) {
        this.botonEnviar.addEventListener('click', () => {
            let nombre = this.formularioequipo.querySelector('#formNombre').value;
            let ciudad = this.formularioequipo.querySelector('#formCiudad').value;
            let anyFundacion = this.formularioequipo.querySelector('#formAnyFundacion').value;
            let pais = this.formularioequipo.querySelector('#formPais').value;
            let escudo = this.formularioequipo.querySelector('#formFoto').escudo;

            handler({ nombre, ciudad, anyFundacion, pais, escudo });
        });
    }

    bindRemoveEquipo(handler) {
        this.removeItem = handler;
    }

    bindEditEquipo(handler) {
        this.updateItem = handler;
    }

    updateItemEnviar(Item, divItem) {

        Item.nombre = divItem.querySelector('#formNombre').value;
        Item.ciudad = divItem.querySelector('#formCiudad').value;
        Item.anyFundacion = divItem.querySelector('#formAnyFundacion').value;
        Item.pais = divItem.querySelector('#formPais').value;
        Item.escudo = divItem.querySelector('#formFoto').escudo;
        this.updateItem(Item);
    }


}