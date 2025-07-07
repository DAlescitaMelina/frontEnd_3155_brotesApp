import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


import { PrevencionService } from '../../../services/prevenciones.service';
import { TipoEnfermedadService } from '../../../services/tipo-enfermedad.service';
import { Prevencion } from '../../../models/prevencion';
import { TipoEnfermedad } from '../../../models/tipo-enfermedad';

@Component({
  selector: 'app-insertareditar-prevencion',
  standalone: true,
  templateUrl: './insertareditar-prevencion.component.html',
  styleUrls: ['./insertareditar-prevencion.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class InsertareditarPrevencionComponent implements OnInit {
  form: FormGroup;
  prevencion: Prevencion = new Prevencion();
  id: number = 0;
  edicion: boolean = false;
  listaTipos: TipoEnfermedad[] = [];

  constructor(
    private pS: PrevencionService,
    private tE: TipoEnfermedadService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      descripcion: ['', Validators.required],
      tipoE: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    // Cargar tipos de enfermedad
    this.tE.list().subscribe(data => {
      this.listaTipos = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      const tipo = new TipoEnfermedad();
      tipo.idTipoE = this.form.value.tipoE;

      this.prevencion.descripcionPrevencion = this.form.value.descripcion;
      this.prevencion.tipoEnfermedad = tipo;

      if (this.edicion) {
        this.prevencion.idPrevencion = this.id;
        this.pS.update(this.prevencion).subscribe(() => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data);
          });
        });
      } else {
        this.pS.insert(this.prevencion).subscribe(() => {
          this.pS.list().subscribe(data => {
            this.pS.setList(data);
          });
        });
      }

      this.router.navigate(['prevenciones']);
    }
  }

  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe(data => {
        this.form.patchValue({
          descripcion: data.descripcionPrevencion,
          tipoE: data.tipoEnfermedad.idTipoE
        });
      });
    }
  }
}