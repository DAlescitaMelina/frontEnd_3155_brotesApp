import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarsintomasE } from './listarsintomas-e/listarsintomas-e';

@Component({
  selector: 'app-sintomas-enfermedad',
  imports: [RouterOutlet, ListarsintomasE],
  templateUrl: './sintomas-enfermedad.html',
  styleUrl: './sintomas-enfermedad.css'
})
export class SintomasEnfermedad {
   constructor(public route:ActivatedRoute){}

}
