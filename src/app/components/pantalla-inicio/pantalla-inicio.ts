import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import {  VerpantallaComponent } from "./verpantalla/verpantalla";

@Component({
  selector: 'app-pantalla-inicio',
  imports: [RouterOutlet, VerpantallaComponent],
  templateUrl: './pantalla-inicio.html',
  styleUrl: './pantalla-inicio.css'
})
export class PantallaInicioComponent {
  constructor(public route:ActivatedRoute){}
}
