import { Enfermedad } from "./enfermedad"
import { Usuario } from "./usuario"
import { Zona } from "./zona"

export class Contagios{
    idContagio: number = 0
    fechaContagio: Date = new Date()
    horaContagio: string = "" 
    enfermedad: Enfermedad = new Enfermedad()
    zona: Zona = new Zona()
    usuario: Usuario = new Usuario()
}