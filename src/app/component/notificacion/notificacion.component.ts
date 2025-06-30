import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarNotificacionComponent } from "./listar-notificacion/listar-notificacion.component";

@Component({
  selector: 'app-notificacion',
  imports: [RouterOutlet, ListarNotificacionComponent],
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css'
})
export class NotificacionComponent {
constructor(public route:ActivatedRoute){}
}
