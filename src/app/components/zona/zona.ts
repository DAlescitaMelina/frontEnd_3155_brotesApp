import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarzona } from './listarzona/listarzona';

@Component({
  selector: 'app-zona',
  imports: [RouterOutlet, Listarzona],
  templateUrl: './zona.html',
  styleUrl: './zona.css'
})
export class ZonaComponent {
  constructor(public route:ActivatedRoute){}
}
