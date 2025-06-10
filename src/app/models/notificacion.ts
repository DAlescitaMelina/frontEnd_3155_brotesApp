import { Brotes } from "./brotes"

export class Notificacion{
    idNotificacion: number=0
    titulo: string = ""
    contenido: string = ""
    estado: string = ""
    fechaEnvio: Date = new Date()
    brotes: Brotes= new Brotes()
}