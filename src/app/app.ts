import { Component } from '@angular/core';
import { Contagio } from "./components/contagio/contagio";
import { TipoTransmision } from "./components/tipo-transmision/tipo-transmision";

@Component({
  selector: 'app-root',
  imports: [Contagio, TipoTransmision],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 title = 'frontBrotesApp';
}
