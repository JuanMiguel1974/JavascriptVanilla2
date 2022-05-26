import { Model } from "./model.js";
export { User }

class User extends Model {
    constructor(email, password, returnSecureToken) {
        super();
        this.email = email;
        this.password = password;
        this.returnSecureToken = returnSecureToken;
    }
    static nombre = 'users'
}