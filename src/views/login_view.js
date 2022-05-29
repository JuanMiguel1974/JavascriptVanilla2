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
                    <div id="erroresEmail"></>
                </div><br>

                <div class="form-control">
                    <label for="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="password" />
                    <div id="erroresPassword"></>
                </div><br>
                    <button type="submit" id="login">Login</button>
            </div>
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

            let formularioLogin = new FormData(document.querySelector("form"))
            event.preventDefault()

            let email = formularioLogin.get('email');
            let password = formularioLogin.get('password');
            let returnSecureToken = true;

            const getErrorsEmail = () => {
                let erroresEmail = []
                if (!expresiones.correo.test(email)) {
                    erroresEmail.push('Ingresa un mail valido');
                }
                return erroresEmail
            }
            var mensajesErrorEmail = getErrorsEmail();

            var erroresEmail = this.divLogin.querySelector('#erroresEmail');

            erroresEmail.innerHTML = mensajesErrorEmail.join(', ');

            const getErrorsPassword = () => {
                let erroresPassword = []
                if (password == null || !password.length) {
                    erroresPassword.push('Ingresa tu password');
                }
                if (!expresiones.password.test(password || '')) {
                    erroresPassword.push('Password entre 6 y 12 caracteres');
                }
                return erroresPassword
            }
            var mensajesErrorPassword = getErrorsPassword();

            var erroresPassword = this.divLogin.querySelector('#erroresPassword');

            erroresPassword.innerHTML = mensajesErrorPassword.join(', ');

            if (mensajesErrorPassword.length || mensajesErrorEmail.length) return false

            handler({ email, password, returnSecureToken });
        });
    }
}