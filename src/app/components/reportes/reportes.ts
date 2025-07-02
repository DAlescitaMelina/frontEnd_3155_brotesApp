import { Component } from '@angular/core';
import { QD2Component } from './q-d2/q-d2';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes',
  imports: [RouterOutlet,QD2Component ],
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class Reportescomponent {
  constructor(public route:ActivatedRoute){}
}
