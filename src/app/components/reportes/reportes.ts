import { Component } from '@angular/core';
 
import { Q1bdto } from "./q1bdto/q1bdto";
 
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-reportes',
 
  imports: [RouterOutlet, Q1bdto],
 
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class ReportesComponent {
 
  constructor(public route:ActivatedRoute){}
 
}
