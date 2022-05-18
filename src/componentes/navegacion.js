import view from '../views/navegacion.html'

export default () => {
    const navPage = document.createElement('div');
    navPage.innerHTML = view;
    navPage.querySelector('#logout').addEventListener("click", function(event) {
        event.preventDefault;
        localStorage.clear();
        window.location.reload();
    });
    //window.location.hash = '/#/'

    return navPage;
}