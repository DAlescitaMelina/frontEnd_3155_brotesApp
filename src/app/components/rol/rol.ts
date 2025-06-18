import { Component } from '@angular/core';
import { Listarrol } from "./listarrol/listarrol";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-rol',
  imports: [RouterOutlet, Listarrol],
  templateUrl: './rol.html',
  styleUrl: './rol.css'
})
export class RolComponent {
  constructor(public route:ActivatedRoute){}
}
