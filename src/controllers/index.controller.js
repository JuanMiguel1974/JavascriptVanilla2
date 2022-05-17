import Login from '../controllers/login'
import Registro from '../controllers/registro'
import Estadios from './estadios/nuevo_estadio'
import ListaEstadios from '../controllers/estadios/lista_estadios'
import ListaJugadores from './jugadores/lista_jugadores'
import ListaEquipos from './equipos/lista_equipos'
import Jugadores from './jugadores/nuevo_jugador'
import Equipos from './equipos/nuevo_equipo'

import { Toast } from '../controllers/toast'
import '../css/toast.css'

const pages = {

    login: Login,
    registro: Registro,
    nuevo_estadio: Estadios,
    nuevo_equipo: Equipos,
    nuevo_jugador: Jugadores,
    lista_estadios: ListaEstadios,
    lista_equipos: ListaEquipos,
    lista_jugadores: ListaJugadores,
    toast: Toast
};
export { pages };