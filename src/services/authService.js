import { componentes } from '../componentes/index.componentes'
import '../css/toast.css'
export { AuthService };

class AuthService {
    constructor() {
            this.urlLogin = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD8hfH8YVdrzF4LkhLi4q5lKhVludOeG_k';
            this.urlRegister = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD8hfH8YVdrzF4LkhLi4q5lKhVludOeG_k';
            this.user = "";
        }
        /**
         * @param {*} user {
         *  email: "",
         *  password: "",
         *  returnSecureToken: true
         * }
         * @returns {Promise<Response>}

         */
    async login(user) {
        try {
            return await fetch(this.urlLogin, {
                    method: "post",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8",
                    },
                    body: JSON.stringify(user),
                })
                .then((response) => {
                    if (response.ok) {

                        componentes.toast.init();
                        componentes.toast.show('Logeado con exito', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);

                        console.log(response);
                        return response.json();
                    } else {
                        componentes.toast.init();
                        componentes.toast.show('Login incorrecto. Compruebe sus datos e intentelo de nuevo', 'error');
                        setTimeout(() => {
                            window.location.reload();
                        }, 998);
                        return response.json().then((text) => {
                            console.log(text);
                            throw new Error(text.error.message);
                        });
                    }
                })
                .then((user) => {

                    localStorage.setItem("idToken", user.idToken);
                    localStorage.setItem("email", user.email);
                    // localStorage.setItem("uid", user.localId);
                    console.log(user);
                })
        } catch (error) {
            return Promise.reject(error);
        }
    }

    /**
     * @param {*} usuario 
     * email: "",
     * password: "",
     * nickname: "",
     *  returnSecureToken: true
     * @returns {Promise<Response>}
     */
    async register(usuario) {
        try {
            return await fetch(
                    this.urlRegister, {
                        method: "post",
                        headers: {
                            "Content-type": "application/json; charset=UTF-8",
                        },
                        body: JSON.stringify(usuario),
                    }
                )
                .then((response) => {
                    if (response.ok) {
                        let usuarioNuevo = {
                            email: email.value,
                            nickname: nickname.value,
                        };
                        console.log('usuarioNuevo', usuarioNuevo);

                        fetch(app.url + "usuarios.json", {
                            method: "post",
                            headers: { "Content-type": "application/json; charset=UTF-8" },
                            body: JSON.stringify(usuarioNuevo),
                        })
                        componentes.toast.init();
                        componentes.toast.show('Registrado con exito . Ya puedes hacer login', 'success');
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);

                        return response.json();
                    } else {
                        return response.json().then((text) => {
                            console.log(text);
                            componentes.toast.init();
                            componentes.toast.show('su email ya está registrado', 'error');
                            setTimeout(() => {
                                window.location.reload();
                            }, 2000);
                            throw new Error(text.error.message);
                        });
                    }
                })
        } catch (error) {
            return Promise.reject(error);
        }
    }

}