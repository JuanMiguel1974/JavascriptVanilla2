import { Model } from "./model.js";
export { Usuario }

class Usuario extends Model {
    constructor(email, password, nickname, returnSecureToken) {
        super();
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.returnSecureToken = returnSecureToken;
    }
    static nombre = 'usuarios'
}