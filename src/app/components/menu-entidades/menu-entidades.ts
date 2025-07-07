import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-entidades',
  imports:  [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './menu-entidades.html',
  styleUrl: './menu-entidades.css'
})
export class MenuEntidades {

  role: string = '';
  constructor(private loginService: LoginService) {}
  cerrar() {
    
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isPersona() {
    return this.role === 'PERSONA';
  }

  isAutoridad() {
    return this.role === 'AUTORIDAD';
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }

}


