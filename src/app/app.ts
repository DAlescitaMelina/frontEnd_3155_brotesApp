import { Component } from '@angular/core';
import { MenuComponent } from './components/menu/menu';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'frontBrotesApp';
}
