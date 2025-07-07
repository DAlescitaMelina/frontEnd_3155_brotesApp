import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { PrevencionesService } from '../../../services/prevenciones';
import { TipoEnfermedadService } from '../../../services/tipoEnfermedad.service';
import { Prevenciones } from '../../../models/prevenciones';
import { TipoEnfermedad } from '../../../models/tipoEnfermedad'; 
@Component({
  selector: 'app-insertareditar-prevencion',
  standalone: true,
  templateUrl: './insertareditar-prevencion.component.html',
  styleUrls: ['./insertareditar-prevencion.component.css'],
    imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule,
  ],
})
export class InsertareditarPrevencionComponent implements OnInit {
  form:FormGroup=new FormGroup({})
   prevencion:Prevenciones=new Prevenciones()
   id:number=0
   edicion:boolean=false
    
  listaTipos: TipoEnfermedad[] = [];

  constructor(
    private pS: PrevencionesService,
    private tE: TipoEnfermedadService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {} 

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.tE.list().subscribe(data => {
      this.listaTipos = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      this.prevencion.descripcionPrevencion=this.form.value.descripcion
      this.prevencion.tipoEnfermedad=this.form.value.tipoE

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
