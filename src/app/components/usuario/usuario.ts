import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarusuario } from './listarusuario/listarusuario';

@Component({
  selector: 'app-usuario',
  imports: [RouterOutlet,Listarusuario],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class UsuarioComponent {
 constructor(public route:ActivatedRoute){} 
}
