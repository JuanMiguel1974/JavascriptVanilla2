import view from '../views/registro.html'
import { pages } from '../controllers/index.controller'
import '../css/toast.css'
import '../css/registro.css'

export default () => {
    const url = "https://futbol-7727b-default-rtdb.firebaseio.com/usuarios";
    const registroPage = document.createElement('div');
    registroPage.innerHTML = view;

    const validaCampos = () => {
        //capturar los valores ingresados por el usuario
        const usuarioValor = usuario.value.trim()
        const emailValor = email.value.trim()
        const passValor = pass.value.trim()
        const passConfirmaValor = passConfirma.value.trim();

        //validando campo usuario
        //(!usuarioValor) ? console.log('CAMPO VACIO') : console.log(usuarioValor)
        if (!usuarioValor) {
            //console.log('CAMPO VACIO')
            validaFalla(usuario, 'Campo vacío')
        } else {
            validaOk(usuario)
        }

        //validando campo email
        if (!emailValor) {
            validaFalla(email, 'Campo vacío')
        } else if (!validaEmail(emailValor)) {
            validaFalla(email, 'El e-mail no es válido')
        } else {
            validaOk(email)
        }
        //validando campo password
        const er = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/
        if (!passValor) {
            validaFalla(pass, 'Campo vacío')
        } else if (passValor.length < 8) {
            validaFalla(pass, 'Debe tener 8 caracteres cómo mínimo.')
        } else if (!passValor.match(er)) {
            validaFalla(pass, 'Debe tener al menos una may., una min. y un núm.')
        } else {
            validaOk(pass)
        }

        //validando campo password Confirmación
        if (!passConfirmaValor) {
            validaFalla(passConfirma, 'Confirme su password')
        } else if (passValor !== passConfirmaValor) {
            validaFalla(passConfirma, 'La password no coincide')
        } else {
            validaOk(passConfirma)
        }
    }

    const validaFalla = (input, msje) => {
        const formControl = input.parentElement
        const aviso = formControl.querySelector('p')
        aviso.innerText = msje

        formControl.className = 'form-control falla'
    }
    const validaOk = (input, msje) => {
        const formControl = input.parentElement
        formControl.className = 'form-control ok'
    }

    const validaEmail = (email) => {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    }

    registroPage
        .querySelector("#formulario")
        .addEventListener("submit", function(event) {

            let datosFormData = new FormData(this);
            let objecteFormData = Object.fromEntries(datosFormData);
            objecteFormData.returnSecureToken = true;
            delete objecteFormData.remember;
            let datos = JSON.stringify(objecteFormData);
            console.log('datos =>', datos);
            event.preventDefault();
            validaCampos();

            console.log(this);

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
                        let usuarioNuevo = {
                            email: registroPage.querySelector("#email").value,
                            nickname: registroPage.querySelector('#usuario').value,
                        };
                        console.log(usuarioNuevo);

                        fetch(url + ".json", {
                            method: "post",
                            headers: { "Content-type": "application/json; charset=UTF-8" },
                            body: JSON.stringify(usuarioNuevo),
                        })

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
        });
    return registroPage;
};