import view from '../../html/registro.html'
import { pages } from '../index.controller'
import '../../css/toast.css'

export default () => {
    const url = "https://futbol-7727b-default-rtdb.firebaseio.com/usuarios";
    const registroPage = document.createElement('div');
    registroPage.innerHTML = view;

    registroPage.querySelector("#registro").addEventListener("click", function(event) {
        registroPage
            .querySelector("#formRegistre")
            .addEventListener("submit", function(event) {

                let datosFormData = new FormData(this);
                let objecteFormData = Object.fromEntries(datosFormData);
                objecteFormData.returnSecureToken = true;
                delete objecteFormData.remember;
                let datos = JSON.stringify(objecteFormData);
                console.log(datos);
                event.preventDefault();
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
                                nickname: registroPage.querySelector('#nickname').value,
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
    });
    return registroPage;
};