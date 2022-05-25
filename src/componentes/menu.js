import view from '../html/menu.html'
export { menu };

function menu() {
    let navMenu = document.createElement("header");
    navMenu.innerHTML = view;
    return navMenu;
}