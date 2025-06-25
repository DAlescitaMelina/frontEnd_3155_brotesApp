import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnfermedadComponent } from "./components/enfermedad/enfermedad";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EnfermedadComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontBrotesApp';
}
