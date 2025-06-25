import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarenfermedadComponent } from './listarenfermedad/listarenfermedad';

@Component({
  selector: 'app-enfermedad',
  imports: [RouterOutlet, ListarenfermedadComponent],
  templateUrl: './enfermedad.html',
  styleUrls: ['./enfermedad.css']
})
export class EnfermedadComponent {
  constructor(public route: ActivatedRoute) {
  }
}
