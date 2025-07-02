
import { TipoEnfermedad } from "./tipoEnfermedad"
import { TipoTransmision } from "./tipoTransmision"

export class Enfermedad{
    idEnfermedad: number = 0
    nombre: string = ""
    descripcionEnfermedad: string = ""
    tipoEnfermedad: TipoEnfermedad = new TipoEnfermedad()
    tipoTransmision: TipoTransmision = new TipoTransmision()
}