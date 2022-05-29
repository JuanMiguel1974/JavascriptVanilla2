import { View } from "./view.js"
export { RegistroView };

class RegistroView extends View {
    constructor(container) {
        super(container);

    }

    render() {
        console.log('renderRegistro');
        this.divRegister = document.createElement('div');
        this.divRegister.classList.add('col', 'mt-5', 'pt-5');
        this.divRegister.innerHTML =
            `<div class="login">
        <h2>Registro</h2>
        <form id="formRegistre">
            <div class="container">
                <div id="logins">
                <div>
                    <label for="email"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="email" id="email" />
                    <div id="erroresEmail"></><br>
                </div>
                <div>
                    <label for="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="password" />
                    <div id="erroresPassword"></><br>
                </div>
                    <label for="nickname"> Nickname</label>
                    <input type="nickname" placeholder="Enter nickname" name="nickname" id="nickname" />
                    <div id="erroresNickname"></><br>
                </div>
                    <button type="submit" id="registro">Registrate</button>
                    <label>
           
                </div>
                <div id="error"></div>
        </form>
     </div>`;
        this.divRow.append(this.divRegister);
        this.divRow.classList.add('row', 'row-cols-4', 'row-cols-md-3', 'g-4');

    }

    bindRegister(handler) {
        console.log('bindRegistre');

        const expresiones = {
            password: new RegExp(/^.{6,12}$/), // 6 a 12 digitos.
            correo: new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
            nickname: new RegExp(/^[a-zA-Z0-9\_\-]{4,16}$/), // Letras, numeros, guion y guion_bajo
        }


        this.divRegister.querySelector('#formRegistre').addEventListener('submit', (event) => {
            event.preventDefault()
            let email = event.target.email.value
            let password = event.target.password.value
            let nickname = event.target.nickname.value
            let returnSecureToken = true;

            const getErrorsEmail = () => {
                let erroresEmail = []
                if (email == null || !email.length) {
                    erroresEmail.push('Ingresa un correo electrónico');
                }
                if (!expresiones.correo.test(email)) {
                    erroresEmail.push('Ingresa un mail valido');
                }
                return erroresEmail
            }
            var mensajesErrorEmail = getErrorsEmail();

            var erroresEmail = this.divRegister.querySelector('#erroresEmail');

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

            var erroresPassword = this.divRegister.querySelector('#erroresPassword');

            erroresPassword.innerHTML = mensajesErrorPassword.join(', ');

            const getErrorsNickname = () => {
                let erroresNickname = []
                if (nickname == null || !nickname.length) {
                    erroresNickname.push('Ingresa un nickname');
                }

                if (nickname.length < 4 || nickname.length > 16) {
                    erroresNickname.push('El nickname debe tener entre 4 y 16 caracteres')
                }

                if (!expresiones.nickname.test(nickname || '')) {
                    erroresNickname.push('Solo Letras, numeros, guion y guion_bajo');
                }
                return erroresNickname
            }
            var mensajesErrorNickname = getErrorsNickname();

            var erroresNickname = this.divRegister.querySelector('#erroresNickname');

            erroresNickname.innerHTML = mensajesErrorNickname.join(', ');

            if (mensajesErrorPassword.length || mensajesErrorEmail.length || mensajesErrorNickname.length) return false;

            handler({ email, password, nickname, returnSecureToken });
        });
    }
}