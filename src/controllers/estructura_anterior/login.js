import view from '../views/login.html'
import { pages } from '../controllers/index.controller'
import '../css/toast.css'

export default () => {
    const expresiones = {
        //usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        //nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        password: /^.{6,12}$/, // 6 a 12 digitos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        //telefono: /^\d{7,14}$/ // 7 a 14 numeros.
    }
    const loginPage = document.createElement('div');
    loginPage.innerHTML = view;

    loginPage
        .querySelector("#formLogin")
        .addEventListener("submit", function(event) {

            let datosFormData = new FormData(this);
            let objecteFormData = Object.fromEntries(datosFormData);
            console.log('objectformdata', objecteFormData);
            objecteFormData.returnSecureToken = true;
            delete objecteFormData.remember;
            let datos = JSON.stringify(objecteFormData);
            console.log('datos =>', email);
            event.preventDefault();

            var mensajesError = [];
            var error = loginPage.querySelector('#error');
            if (email.value === null || email.value === '') {
                mensajesError.push('Ingresa un correo electrónico');
            }
             if (!expresiones.correo.test(email.value)) {
                 mensajesError.push('Ingresa un correo valido');
             } 
            if (password.value === null || password.value === '') {
                mensajesError.push('Ingresa tu password');

            }
               if (!expresiones.password.test(password.value)) {
                  mensajesError.push('Password entre 6 y 12 caracteres');
              } 

            error.innerHTML = mensajesError.join(', ');
            console.log(mensajesError);

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
                        /*  pages.toast.init();
                         pages.toast.show('Compruebe sus datos e intentelo de nuevo', 'error'); */
                        /*   setTimeout(() => {
                              window.location.reload();
                          }, 998); */
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