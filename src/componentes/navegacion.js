import view from '../html/navegacion.html'
import { PageEquipos } from '../pages/equipos';

export default () => {
    const navPage = document.createElement('div');
    navPage.innerHTML = view;
    navPage.querySelector('#logout').addEventListener("click", function(event) {
        event.preventDefault;
        localStorage.clear();
        window.location.reload();
    });

    app.equipos = new PageEquipos('Equipos')

    function cargarEquipos() {
        app.equipos.populate(app.container)
    };
    navPage.querySelector('#equipos').addEventListener('click', cargarEquipos);
    return navPage;
}