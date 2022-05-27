import view from '../html/menu.html'
import { PageLogin } from '../pages/login'
import { PageRegister } from '../pages/registro';

export function menu() {
    let navMenu = document.createElement("header");
    navMenu.innerHTML = view;

    app.login = new PageLogin('Login')
    app.register = new PageRegister('Register')

    function cargarLogin() {
        app.login.populate(app.container)
    };

    function cargarRegister() {
        app.register.populate(app.container)
    };

    navMenu.querySelector('#login').addEventListener('click', cargarLogin);
    navMenu.querySelector('#registro').addEventListener('click', cargarRegister);
    return navMenu;
}