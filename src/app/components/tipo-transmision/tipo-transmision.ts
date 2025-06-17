import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListartipoTransmision } from '../tipoTransmision/listartipo-transmision/listartipo-transmision';

@Component({
  selector: 'app-tipo-transmision',
  imports: [RouterOutlet, ListartipoTransmision],
  templateUrl: './tipo-transmision.html',
  styleUrl: './tipo-transmision.css'
})
export class TipoTransmision {
//inyección de dependencia
  constructor(public route: ActivatedRoute){}
}
 