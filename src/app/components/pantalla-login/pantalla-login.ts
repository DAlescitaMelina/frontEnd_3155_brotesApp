import { Component } from '@angular/core';
import { VerpantallaLogin } from './verpantalla-login/verpantalla-login';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pantalla-login',
  imports: [RouterOutlet, VerpantallaLogin],
  templateUrl: './pantalla-login.html',
  styleUrl: './pantalla-login.css'
})
export class PantallaLoginComponent {
 constructor(public route:ActivatedRoute){}
}
