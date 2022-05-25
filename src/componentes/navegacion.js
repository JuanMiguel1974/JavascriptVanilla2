import view from '../html/navegacion.html'
import { PageEquipos } from '../pages/equipos'
import { PageEstadios } from '../pages/estadio'
import { PageJugadores } from '../pages/jugador'

export default () => {
    const navPage = document.createElement('div');
    navPage.innerHTML = view;
    /*  const myIcon = new Image();
     myIcon.src = Login;
     navPage.appendChild(myIcon); */
    navPage.querySelector('#logout').addEventListener("click", function(event) {
        event.preventDefault;
        localStorage.clear();
        window.location.reload();
    });

    app.equipos = new PageEquipos('Equipos')
    app.estadios = new PageEstadios('Estadios')
    app.jugadores = new PageJugadores('Futbolistas')

    function cargarEquipos() {
        app.equipos.populate(app.container)
    };

    function cargarEstadios() {
        app.estadios.populate(app.container)
    };

    function cargarJugadores() {
        app.jugadores.populate(app.container)
    };

    navPage.querySelector('#equipos').addEventListener('click', cargarEquipos);
    navPage.querySelector('#estadios').addEventListener('click', cargarEstadios);
    navPage.querySelector('#jugadores').addEventListener('click', cargarJugadores);

    return navPage;
}