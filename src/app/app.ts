import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { Router, RouterOutlet,NavigationEnd } from '@angular/router';
import { MenuEntidades } from "./components/menu-entidades/menu-entidades";
import { filter } from 'rxjs/operators'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,MenuComponent, RouterOutlet, MenuEntidades,MatSnackBarModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'frontBrotesApp';
  
   currentUrl: string = '';

  constructor(private router: Router) {
    
    // Escucha los cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = event.urlAfterRedirects;
    });
  }

  mostrarMenuNormal(): boolean {
    return this.currentUrl.includes('/verinicio') || this.currentUrl.includes('/pantalla-login');
  }

  
  mostrarMenuEntidades(): boolean {
  const rutas = [
    '/homes',
    
    '/zonas','/zonas/nuevo','/zonas/ediciones/:id',
    '/roles','/roles/nuevo','/roles/ediciones/:id',
    '/tiposT','/tiposT/nuevo','/tiposT/ediciones/:id',
    '/contagios','/contagios/nuevo','/contagios/ediciones/:id',
    '/usuarios','/usuarios/ediciones/:id',
    '/enfermedades','/enfermedades/nuevo','/enfermedades/ediciones/:id',
    '/brotes','/brotes/nuevo','/brotes/ediciones/:id',
    '/notificaciones','/notificaciones/nuevo','/notificaciones/ediciones/:id',
    '/EnfermedadSintomasE','/EnfermedadSintomasE/nuevo','/EnfermedadSintomasE/ediciones/:id',
    '/tiposE','/tiposE/nuevo','/tiposE/ediciones/:id',

    //Brenda (Q_1BDTO Y Q_2BDTO )
    '/reportes','/reportes/cantidades-BrotesActivos-PorZona','/reportes/cantidadBrotesTotales',
    //Wilson
    '/reportes','/reportes/qw1',

    //DAlessandra
    '/reportes','/reportes/qd1','/reportes/qd2',

    //Tony
  ];
  return rutas.some(ruta => this.currentUrl.includes(ruta));
}

}
