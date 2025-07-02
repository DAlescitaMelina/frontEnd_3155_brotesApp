import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Enfermedad } from '../../../models/enfermedad';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { EnfermedadService } from '../../../services/enfermedad';
import { TipoEnfermedad } from '../../../models/tipoEnfermedad';
import { TipoTransmision } from '../../../models/tipoTransmision';
import { MatOption, MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertareditar',
  imports: [
    MatInputModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatOption,
    MatSelectModule,
  ],
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css',
})
export class Insertareditar implements OnInit {
  form: FormGroup = new FormGroup({});
  enfermedad: Enfermedad = new Enfermedad();
  tipoEnfermedad: TipoEnfermedad[] = [];
  tipoTransmision: TipoTransmision[] = [];
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private eS: EnfermedadService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.tipoEnfermedad = [
      { idTipoE: 1, nombreTipoE: 'Infecciosa' },
      { idTipoE: 2, nombreTipoE: 'Crónica' },
      { idTipoE: 3, nombreTipoE: 'Genética' },
      { idTipoE: 4, nombreTipoE: 'Autoimmune' },
    ];
    this.tipoTransmision = [
      { idTipoT: 1, transmision: 'Aérea' },
      { idTipoT: 2, transmision: 'Contacto directo' },
      { idTipoT: 3, transmision: 'Vectorial' },
      { idTipoT: 4, transmision: 'Alimentos o agua contaminados' },
    ];

    this.form = this.formBuilder.group({
      codigo: [''],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipoEnfermedad: ['', Validators.required],
      tipoTransmision: ['', Validators.required],
    });
  }
  aceptar() {
    if (this.form.valid) {
      this.enfermedad.idEnfermedad = this.form.value.codigo;
      this.enfermedad.nombre = this.form.value.nombre;
      this.enfermedad.descripcionEnfermedad = this.form.value.descripcion;
      this.enfermedad.tipoEnfermedad.idTipoE = this.form.value.tipoEnfermedad;
      this.enfermedad.tipoTransmision.idTipoT = this.form.value.tipoTransmision;
      if (this.edicion) {
        this.eS.update(this.enfermedad).subscribe((data) => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      } else {
        this.eS.insert(this.enfermedad).subscribe(() => {
          this.eS.list().subscribe((data) => {
            this.eS.setList(data);
          });
        });
      }
      this.router.navigate(['enfermedades']);
    }
  }

  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.idEnfermedad),
          nombre: new FormControl(data.nombre),
          descripcion: new FormControl(data.descripcionEnfermedad),
          tipoEnfermedad: new FormControl(
            data.tipoEnfermedad.idTipoE,
            Validators.required
          ),
          tipoTransmision: new FormControl(
            data.tipoTransmision.idTipoT,
            Validators.required
          ),
        });
      });
    }
  }
}
