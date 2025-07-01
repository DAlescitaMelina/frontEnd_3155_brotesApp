import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BrotesService } from '../../../services/brotes.service';
import { Contagios } from '../../../models/contagios';
import { Brotes } from '../../../models/brotes';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ContagiosService } from '../../../services/contagios';

@Component({
  selector: 'app-insertareditar-brotes',
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
  templateUrl: './insertareditar-brotes.component.html',
  styleUrls: ['./insertareditar-brotes.component.css'],
})
export class InsertareditarBrotesComponent implements OnInit {
  form: FormGroup;
  brotes: Brotes = new Brotes();
  id: number = 0;
  edicion: boolean = false;
  listaContagios: Contagios[] = [];

  constructor(
    private cS: ContagiosService,
    private bS: BrotesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
      this.form = this.formBuilder.group({
      fechain: [Validators.required],
      fechafin: [Validators.required],
      conta: ['', Validators.required],
});
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.cS.list().subscribe((data) => {
      this.listaContagios = data;
    });
  }

  aceptar() {
    if (this.form.valid) {
      const contagio = new Contagios();
      contagio.idContagio = this.form.value.conta;

      this.brotes.fechaInicio = this.form.value.fechain;
      this.brotes.fechaFin = this.form.value.fechafin;
      this.brotes.contagios = contagio;

      if (this.edicion) {
        this.brotes.idBrote = this.id;
        this.bS.update(this.brotes).subscribe(() => {
          this.bS.list().subscribe((data) => {
            this.bS.setList(data);
          });
        });
      } else {
        this.bS.insert(this.brotes).subscribe(() => {
          this.bS.list().subscribe((data) => {
            this.bS.setList(data);
          });
        });
      }

      this.router.navigate(['brotes']);
    }
  }

  init() {
    if (this.edicion) {
      this.bS.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          codigo: data.idBrote,
          fechain: data.fechaInicio,
          fechafin: data.fechaFin,
          conta: data.contagios.idContagio,
        });
      });
    }
  }
}