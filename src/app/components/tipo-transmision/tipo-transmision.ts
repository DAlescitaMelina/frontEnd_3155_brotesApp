import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {ListartipoTrasnmisionComponent } from './listartipo-trasnmision/listartipo-trasnmision';


@Component({
  selector: 'app-tipo-transmision',
  imports: [RouterOutlet, ListartipoTrasnmisionComponent],
  templateUrl: './tipo-transmision.html',
  styleUrl: './tipo-transmision.css'
})
export class TipoTransmisionComponent {
   constructor(public route:ActivatedRoute){}
}
