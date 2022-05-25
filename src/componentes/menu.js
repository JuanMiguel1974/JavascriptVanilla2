import view from '../html/menu.html'
import { PageLogin } from '../pages/login'
export { menu };

function menu() {
    let navMenu = document.createElement("header");
    navMenu.innerHTML = view;

    app.login = new PageLogin('Login')

    function cargarLogin() {
        app.login.populate(app.container)
    };

    navMenu.querySelector('#login').addEventListener('click', cargarLogin);
    return navMenu;
}