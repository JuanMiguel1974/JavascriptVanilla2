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
                    <label for="email"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="email" id="email" required />
    
                    <label for="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="password" required />
    
                    <label for="nickname"> Nickname</label>
                    <input type="nickname" placeholder="Enter nickname" name="nickname" id="nickname" required />
    
                    <button type="submit" id="registro">Registrate</button>
                    <label>
           
                </div>
        </form>
     </div>`;
        this.divRow.append(this.divRegister);
        this.divRow.classList.add('row', 'row-cols-4', 'row-cols-md-3', 'g-4');

    }

    bindRegister(handler) {
        console.log('bindRegistre');

        this.divRegister.querySelector('#formRegistre').addEventListener('submit', (event) => {
            event.preventDefault()
            let email = event.target.email.value
            let password = event.target.password.value
            let nickname = event.target.nickname.value
            let returnSecureToken = true;
            handler({ email, password, nickname, returnSecureToken });
        });
    }
}