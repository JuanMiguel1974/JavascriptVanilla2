import view from '../html/menu.html'
import Home from '../imagenes/home/home4.jpg'
export { menu };

function menu() {
    let navMenu = document.createElement("header");
    navMenu.innerHTML = view;
    return navMenu;
}