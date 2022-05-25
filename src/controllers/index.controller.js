import Login from './estructura_anterior/login'
import Registro from '../controllers/estructura_anterior/registro'
import Estadios from './estructura_anterior/estadios/nuevo_estadio'
import ListaEstadios from '../controllers/estructura_anterior/estadios/lista_estadios'
import { Toast } from '../controllers/toast'
import '../css/toast.css'

const pages = {

    login: Login,
    registro: Registro,
    nuevo_estadio: Estadios,
    lista_estadios: ListaEstadios,
    toast: Toast,

};
export { pages };