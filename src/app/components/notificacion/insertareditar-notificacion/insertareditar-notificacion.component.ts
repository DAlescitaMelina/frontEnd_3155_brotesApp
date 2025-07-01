import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { NotificacionService } from '../../../services/notificacion.service';
import { Notificacion } from '../../../models/notificacion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { BrotesService } from '../../../services/brotes.service';
import { Brotes } from '../../../models/brotes';

@Component({
  selector: 'app-insertareditar-notificacion',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  templateUrl: './insertareditar-notificacion.component.html',
  styleUrls: ['./insertareditar-notificacion.component.css']
})
export class InsertareditarNotificacionComponent implements OnInit {
  form: FormGroup; // Declaración sin afirmación (!) 
  noti: Notificacion = new Notificacion();
  id: number = 0;
  edicion: boolean = false;
  listaBrotes: any[] = [];

  constructor(
    private nS: NotificacionService,
    private bS: BrotesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Inicialización del formulario en el constructor
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      estate: ['', Validators.required],
      fechaenvio: ['', Validators.required],  // Asegúrate de que se utiliza fechaenvio
      bro: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    // Obtener lista de brotes
    this.bS.list().subscribe(data => {
      this.listaBrotes = data;
    });
  }
  
  aceptar() {
    if (this.form.valid) {
      const brote = new Brotes();
      brote.idBrote = this.form.value.bro;

      this.noti.titulo = this.form.value.title;
      this.noti.contenido = this.form.value.content;
      this.noti.estado = this.form.value.estate;
      this.noti.fechaEnvio = new Date(this.form.value.fechaenvio);  // Convertir fecha a formato Date
      this.noti.brotes = brote;

      if (this.edicion) {
        this.noti.idNotificacion = this.id;
        this.nS.update(this.noti).subscribe(() => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      } else {
        this.nS.insert(this.noti).subscribe(() => {
          this.nS.list().subscribe((data) => {
            this.nS.setList(data);
          });
        });
      }

      this.router.navigate(['notificaciones']);
    }
  }

  init() {
    if (this.edicion) {
      this.nS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          title: data.titulo,
          content: data.contenido,
          estate: data.estado,
          fechaenvio: data.fechaEnvio,
          bro: data.brotes.idBrote
        });
      });
    }
  }
}