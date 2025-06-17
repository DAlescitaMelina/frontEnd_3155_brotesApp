import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarContagio } from "./listar-contagio/listar-contagio";

@Component({
  selector: 'app-contagio',
  imports: [RouterOutlet, ListarContagio],
  templateUrl: './contagio.html',
  styleUrl: './contagio.css'
})
export class Contagio {
//inyección de dependencia
  constructor(public route: ActivatedRoute){}
}
