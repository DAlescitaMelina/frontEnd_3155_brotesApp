import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  nombreUsuario: string = '';

 
  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.nombreUsuario = this.loginService.getNombreUsuario();

}
}