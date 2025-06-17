import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarenfermedadS } from './listarenfermedad-s/listarenfermedad-s';

@Component({
  selector: 'app-enfermedad-sintomas-e',
  imports: [RouterOutlet, ListarenfermedadS],
  templateUrl: './enfermedad-sintomas-e.html',
  styleUrl: './enfermedad-sintomas-e.css'
})
export class EnfermedadSintomasEComponent {
  constructor(public route: ActivatedRoute) {
  }
}
