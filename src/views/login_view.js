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
        console.log('divlogin', this.divLogin);
    }

    /* construirLogin(user, container) {
        console.log('mostrarFormulario');
        if (user == undefined) { user = { email: '', password: '', returnSecureToken: false } }
        container.append(divLogin);
        let divLogin = document.createElement('div');
        let formulario =
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
            </div>`
        divLogin.innerHTML = formulario;
        console.log(divLogin);
    }

    mostrarLogin() {

        let formularioLogin = document.createElement('div');
        this.construirLogin(null, formularioLogin);
        divLogin.append(formularioLogin);
        this.formularioLogin = formularioLogin

        this.botonEnviar.classList.add('btn', 'btn-success');
        this.botonEnviar.innerHTML = 'Enviar';
        formularioLogin.append(this.botonEnviar);

        this.divRow.append(divLogin);

    } */

    bindLogin(handler) {
        //console.log('bindLogin');
        console.log('divlogin', this.divLogin);

        /*  console.log(this.botonEnviar); */
        /*  this.botonEnviar.addEventListener('click', () => {
             let email = this.formularioLogin.querySelector('#email').value;
             let password = this.formularioLogin.querySelector('#password').value;
             let returnSecureToken = true;
             handler({ email, password, returnSecureToken });
         }) */

    }
}