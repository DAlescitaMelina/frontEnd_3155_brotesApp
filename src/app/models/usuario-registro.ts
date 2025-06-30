import { Rol } from "./rol";
import { Zona } from "./zona";

export class UsuarioRegistro{
    idUsuario: number = 0;
    nombre: string = "";
    apellido: string = "";
    username: string = "";
    password: string = "";
    zona: Zona = new Zona();
    rol: Rol = new Rol();
}