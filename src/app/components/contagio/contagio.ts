import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarcontagio } from "./listarcontagio/listarcontagio";

@Component({
  selector: 'app-contagio',
  imports: [
    RouterOutlet,
    Listarcontagio
  ],
  templateUrl: './contagio.html',
  styleUrl: './contagio.css'
})
export class ContagioComponent {
 constructor(public route:ActivatedRoute){}
}
