import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu';
import { Router, RouterOutlet,NavigationEnd } from '@angular/router';
import { MenuEntidades } from "./components/menu-entidades/menu-entidades";
import { filter } from 'rxjs/operators'; 
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,MenuComponent, RouterOutlet, MenuEntidades],
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
    '/pantalla-entidades',
    '/zonas','/zonas/nuevo','/zonas/ediciones/:id',
    '/roles','/roles/nuevo','/roles/ediciones/:id',
    '/tiposT','/tiposT/nuevo','/tiposT/ediciones/:id',
    '/contagios','/contagios/nuevo','/contagios/ediciones/:id'
  ];
  return rutas.some(ruta => this.currentUrl.includes(ruta));
}

}
