import view from '../views/registro.html'
import { pages } from '../controllers/index.controller'
import '../css/toast.css'
import '../css/registro.css'

export default () => {

    const expresiones = {
        nickname: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
        password: /^.{6,12}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    }

    const campos = {
        //nickname: false,
        password: false,
        email: false,

    }

    const url = "https://futbol-7727b-default-rtdb.firebaseio.com/usuarios";
    const registroPage = document.createElement('div');
    registroPage.innerHTML = view;
    const formulario = registroPage.querySelector("#formulario");
    const inputs = registroPage.querySelectorAll('#formulario input');

    /*  let user = registroPage.querySelector("#user");

     registroPage.querySelector(".formulario__btn").addEventListener("click", function(event) {
         event.preventDefault();
         let usuarioNuevo = {
             email: registroPage.querySelector("#email").value,
             nickname: registroPage.querySelector('#nickname').value,
         };
         console.log(usuarioNuevo);

         fetch(url + ".json", {
             method: "post",
             headers: { "Content-type": "application/json; charset=UTF-8" },
             body: JSON.stringify(usuarioNuevo),
         })
     });

     if (localStorage.getItem("idToken")) {
         user.innerHTML = `Logged: ${localStorage.getItem("email")}`;
     } */

    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "nickname":
                validarCampo(expresiones.nickname, e.target, 'nickname');
                break;
            case "password":
                validarCampo(expresiones.password, e.target, 'password');
                validarPassword();
                break;
            case "email":
                validarCampo(expresiones.email, e.target, 'email');
                break;

        }
    }

    /*   const validarPassword = () => {
        const inputPassword = document.getElementById('password');


        if (inputPassword.value) {

            campos['password'] = true;


        } else {
            document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
            campos['password'] = false;
        }
    }
 */
    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
            campos[campo] = true;
        } else {
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
            campos[campo] = false;
        }
    }

    inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });
    formulario.addEventListener("submit", function(event) {
        registroPage
            .querySelector(".formulario__btn")
            .addEventListener("submit", function(event) {

                if (campos.nickname && campos.password && campos.email) {
                    formulario.reset();

                    /*  let datosFormData = new FormData();
                     let objecteFormData = Object.fromEntries(datosFormData);
                     objecteFormData.returnSecureToken = true;
                     delete objecteFormData.remember;
                     let datos = JSON.stringify(objecteFormData);
                     console.log(datos);
                     event.preventDefault();
                     console.log(this); */
                    fetch(
                            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8hfH8YVdrzF4LkhLi4q5lKhVludOeG_k", {
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
                                pages.toast.show('Registrado con exito . Ya puedes hacer login', 'success');
                                setTimeout(() => {
                                    window.location.reload();
                                }, 2000);

                                return response.json();
                            } else {
                                return response.json().then((text) => {
                                    console.log(text);
                                    pages.toast.init();
                                    pages.toast.show('Compruebe sus datos. Intetalo de nuevo', 'error');
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 2000);
                                    throw new Error(text.error.message);
                                });
                            }
                        })

                    document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
                    setTimeout(() => {
                        document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
                    }, 5000);

                    document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                        icono.classList.remove('formulario__grupo-correcto');
                    });
                } else {
                    document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
                }

            });
    });
    return registroPage;
};