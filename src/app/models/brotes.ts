import { Contagios } from "./contagios"

export class Brotes{
    idBrote: number = 0
    fechaInicio: Date = new Date()
    fechaFin: Date | null = null
    contagios: Contagios = new Contagios()
}