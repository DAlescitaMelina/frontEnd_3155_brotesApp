import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarPrevencionComponent } from './listar-prevencion/listar-prevencion.component';

@Component({
  selector: 'app-prevencion',
  standalone: true,
imports: [RouterOutlet, ListarPrevencionComponent],
  templateUrl: './prevencion.component.html',
  styleUrls: ['./prevencion.component.css'] // ← aquí va con "styleUrls"
})
export class PrevencionComponent {
  constructor(public route: ActivatedRoute) {}
}
