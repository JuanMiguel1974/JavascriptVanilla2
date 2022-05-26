import Login from './estructura_anterior/login'
import Registro from '../controllers/estructura_anterior/registro'
import { Toast } from '../controllers/toast'
import '../css/toast.css'

const pages = {

    login: Login,
    registro: Registro,
    toast: Toast,

};
export { pages };