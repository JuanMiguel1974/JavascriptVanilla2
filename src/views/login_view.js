import { View } from "./view.js"
export { LoginView };

class LoginView extends View {
    constructor(container) {
        super(container);

    }

    render() {
        console.log('render');
        this.divLogin = document.createElement('div');
        this.divLogin.classList.add('col', 'mt-5', 'pt-5');
        this.divLogin.innerHTML =
            `<div class="login">
        <h2>Entrar</h2>
        <form id="formLogin">
            <div class="container">
                <div class="form-control">
                    <label for="email"><b>Email</b></label>
                    <input type="email" placeholder="Enter Username" name="email" id="email" />
                    <p></p>
                </div>

                <div class="form-control">
                    <label for="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="password" />
                    <p></p>
                </div>
                    <button type="submit" id="login">Login</button>
            </div>
            <div id="error"></div>
        </form>
    </div>`;
        this.divRow.append(this.divLogin);
        this.divRow.classList.add('row', 'row-cols-4', 'row-cols-md-3', 'g-4');

    }

    bindLogin(handler) {
        console.log('bindLogin');

        const expresiones = {
            password: /^.{6,12}$/, // 6 a 12 digitos.
            correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        }
        this.divLogin.querySelector('#formLogin').addEventListener('submit', (event) => {
            event.preventDefault()
            let email = event.target.email.value
            let password = event.target.password.value
            let returnSecureToken = true;

            var mensajesError = [];
            var error = this.divLogin.querySelector('#error');

            if (email.value === null || email.value === '') {
                mensajesError.push('Ingresa un correo electrónico');
            }
            if (!expresiones.correo.test(email.value)) {
                mensajesError.push('Ingresa un mail valido');
            }
            if (password.value === null || password.value === '') {
                mensajesError.push('Ingresa tu password');

            }
            if (!expresiones.password.test(password.value)) {
                mensajesError.push('Password entre 6 y 12 caracteres');
            }

            error.innerHTML = mensajesError.join(', ');

            if (mensajesError.length) return false;
            handler({ email, password, returnSecureToken });
        });
    }
}