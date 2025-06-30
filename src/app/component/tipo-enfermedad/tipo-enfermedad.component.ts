import { Component } from '@angular/core';
import { ListarTipoEnfermedadComponent } from "./listar-tipo-enfermedad/listar-tipo-enfermedad.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tipo-enfermedad',
  imports: [RouterOutlet,ListarTipoEnfermedadComponent],
  templateUrl: './tipo-enfermedad.component.html',
  styleUrl: './tipo-enfermedad.component.css'
})
export class TipoEnfermedadComponent {
constructor(public route:ActivatedRoute){}
}
