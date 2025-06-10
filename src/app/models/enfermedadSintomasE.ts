import { Enfermedad } from "./enfermedad"
import { sintomasEnfermedad } from "./sintomasEnfermedad"

export class EnfermedadSintomasE{
    idEnfermedadSE: number = 0
    sintomasEnfermedad: sintomasEnfermedad = new sintomasEnfermedad()
    enfermedad: Enfermedad = new Enfermedad()
}