import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Contagios } from '../../../models/contagios';
import { Zona } from '../../../models/zona';
import { Enfermedad } from '../../../models/enfermedad';
import { ContagiosService } from '../../../services/contagios';
import { UsuarioService } from '../../../services/usuario';
import { EnfermedadService } from '../../../services/enfermedad';

import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertareditar',
  providers: [provideNativeDateAdapter()],
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule

  ],
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class InsertareditarComponentContagio implements OnInit {
  form: FormGroup = new FormGroup({});
  contagio: Contagios = new Contagios();
  id: number = 0;
  edicion: boolean = false;

  nombreZona: string = '';
  nombreUsuario: string = '';
  listaEnfermedades: Enfermedad[] = [];

  constructor(
    private cS: ContagiosService,
    private formBuilder: FormBuilder,
    private router: Router,
    private uS: UsuarioService,
    private eS: EnfermedadService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.init();
    });

    // Estructura base del formulario
    this.form = this.formBuilder.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      enf: ['', Validators.required],
      zon: ['', Validators.required],
      usr: ['', Validators.required]
    });

    // Fecha y hora actual por defecto
    const ahora = new Date();
    const fechaISO = ahora.toISOString().split('T')[0];
    const horaStr = ahora.toTimeString().substring(0, 5);

    this.form.patchValue({
      fecha: fechaISO,
      hora: horaStr
    });

    // 👇 Solo precargar usuario si es modo registro
    if (!this.edicion) {
      this.uS.getZonaYUsuario().subscribe(data => {
        this.form.patchValue({
          zon: data.zonaId,
          usr: data.idUsuario
        });
        this.nombreUsuario = data.nombreU;
        this.nombreZona = data.nombreZona;
        this.cdr.detectChanges();
      });
    }

    // Carga lista de enfermedades
    this.eS.list().subscribe(data => {
      this.listaEnfermedades = data;
    });
  }


  aceptar(): void {
    if (this.form.valid) {
      const valores = this.form.getRawValue();

      this.contagio.fechaContagio = valores.fecha;
      this.contagio.horaContagio = valores.hora;
      this.contagio.zona.idZona = valores.zon;
      this.contagio.usuario.idUsuario = valores.usr;
      this.contagio.enfermedad.idEnfermedad = valores.enf;


      if (this.edicion) {
        this.contagio.idContagio = this.id;
        this.cS.update(this.contagio).subscribe(() => {
          this.cS.list().subscribe(data => this.cS.setList(data));
        });
      } else {
        this.cS.insert(this.contagio).subscribe(() => {
          this.cS.list().subscribe(data => this.cS.setList(data));
        });
      }


      this.router.navigate(['homes']);

      this.snackBar.open('Contagio registrado exitosamente', 'Cerrar', {
        duration: 3500,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  }

  init(): void {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe(data => {
        this.form = this.formBuilder.group({
          codigo: new FormControl(data.idContagio),
          fecha: new FormControl(data.fechaContagio),
          hora: new FormControl(data.horaContagio),
          enf: new FormControl(data.enfermedad.idEnfermedad),
          zon: new FormControl(data.zona.idZona),
          usr: new FormControl(data.usuario.idUsuario)
        });
      });
    }
  }
}
