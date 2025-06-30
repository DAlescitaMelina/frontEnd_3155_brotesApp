import { Rol } from "./rol";
import { Zona } from "./zona";

export class UsuarioModi{
    idUsuario: number = 0;
    nombre: string = "";
    apellido: string = "";
    enabled: boolean = true;
    username: string = "";
    password: string = "";
    zona: Zona = new Zona();
    rol: Rol = new Rol();
}