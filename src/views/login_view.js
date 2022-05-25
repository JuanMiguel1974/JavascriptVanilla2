import { View } from "./view.js"
export { LoginView };

class LoginView extends View {
    constructor(container) { super(container); }

    construirFormulario(user, divLogin) {
        // let divLogin = document.createElement('div');
        if (user == undefined) { user = { email: '', password: '' } }
        let formulario = `<div class="login">
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
                
            <div id="error"></div>
        </form>
    </div>`

        this.container.innerHTML = formulario;

        this.botonEnviar.classList.add('btn', 'btn-success');
        this.botonEnviar.innerHTML = 'Enviar';

    }
    bindLogin(handler) {
        this.botonEnviar.addEventListener('click', () => {
            let email = this.formulario.querySelector('#email').value;
            let password = this.formulario.querySelector('#password').value;
            handler({ email, password });
        });
    }
}

/* </div>
    
                <button type="submit" id="login">Login</button>
            </div> */