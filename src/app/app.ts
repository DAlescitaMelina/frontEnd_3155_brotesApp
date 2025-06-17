import { Component } from '@angular/core';
import { ZonaComponent } from './components/zona/zona';
import { RolComponent } from './components/rol/rol';

@Component({
  selector: 'app-root',
  imports: [ZonaComponent, RolComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'frontBrotesApp';
}
