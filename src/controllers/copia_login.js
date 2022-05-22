import view from '../views/login.html'
import { pages } from '../controllers/index.controller'
import '../css/toast.css'
import '../css/login.css'


export default () => {

    const loginPage = document.createElement('div');
    loginPage.innerHTML = view;

    var email = loginPage.querySelector('#email');
    var password = loginPage.querySelector('#password');
    var error = loginPage.querySelector('#error');
    error.getElementsByClassName.color = 'red';


    var form = loginPage.querySelector('#formLogin');
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        var mensajesError = [];
        if (email.value === null || email.value === '') {
            mensajesError.push('Ingresa un correo electrónico');
        }
        if (password.value === null || password.value === '') {
            mensajesError.push('Ingresa tu password');
        }

        error.innerHTML = mensajesError.join(', ');

        let datosFormData = new FormData(this);
        let objecteFormData = Object.fromEntries(datosFormData);
        objecteFormData.returnSecureToken = true;
        delete objecteFormData.remember;
        let datos = JSON.stringify(objecteFormData);
        console.log(datos);


        fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8hfH8YVdrzF4LkhLi4q5lKhVludOeG_k", {
                    method: "post",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                    body: datos,
                }
            )
            .then((response) => {
                if (response.ok) {

                    pages.toast.init();
                    pages.toast.show('Logeado con exito', 'success');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);

                    return response.json();

                } else {
                    pages.toast.init();
                    pages.toast.show('Compruebe sus datos e intentelo de nuevo', 'error');
                    setTimeout(() => {
                        window.location.reload();
                    }, 998);
                    return response.json().then((text) => {
                        console.log(text);
                        throw new Error(text.error.message);
                    });
                }
            })
            .then((datos) => {

                localStorage.setItem("idToken", datos.idToken);
                localStorage.setItem("email", datos.email);

                console.log(datos);
            })
            .catch((error) => {
                console.error("Error;", error);

            });
    });

    return loginPage;
};