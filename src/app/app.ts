import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu';
import { RouterOutlet } from '@angular/router';
import { EnfermedadComponent } from "./components/enfermedad/enfermedad";

@Component({
  selector: 'app-root',

  imports: [MenuComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'frontBrotesApp';
}
