import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarBrotesComponent } from './listar-brotes/listar-brotes.component';

@Component({
  selector: 'app-brotes',
  imports: [RouterOutlet, ListarBrotesComponent],
  templateUrl: './brotes.component.html',
  styleUrl: './brotes.component.css'
})
export class BrotesComponent {
constructor(public route:ActivatedRoute){}
}
