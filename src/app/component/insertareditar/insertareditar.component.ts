import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { TipoEnfermedad } from '../../models/tipoEnfermedad';
import { TipoEnfermedadService } from '../../services/tipoEnfermedad.service';
@Component({
  selector: 'app-insertareditar',
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule

  ],
  templateUrl: './insertareditar.component.html',
  styleUrl: './insertareditar.component.css'
})
export class InsertareditarComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  tipoEnfermedad:TipoEnfermedad = new TipoEnfermedad();
  id:number = 0;
  edicion: boolean=false
  constructor(
    private formBuilder: FormBuilder,
    private tS:TipoEnfermedadService,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
 this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.edicion = data['id'] != null;

    this.form = this.formBuilder.group({
      codigo: [''],
      name: ['', Validators.required],
    });

    if (this.edicion) {
      this.init(); 
    }
  });
}

  aceptar(){
    if(this.form.valid){
      this.tipoEnfermedad.idTipoE = this.form.value.codigo
      this.tipoEnfermedad.nameTipoE = this.form.value.name
      if(this.edicion){
        this.tS.update(this.tipoEnfermedad).subscribe(data=>{
          this.tS.list().subscribe(data=>{
            this.tS.setList(data)
          })
        })
      } 
      else{
          this.tS.insert(this.tipoEnfermedad).subscribe(()=>{
          this.tS.list().subscribe(data=>{
          this.tS.setList(data)
             })
          })
      }
      this.router.navigate(['tipoEnfermedad'])
    }
  }

  init(){
    if(this.edicion){
      this.tS.listId(this.id).subscribe(data=>{
        this.form = new FormGroup({
          codigo:new FormControl(data.idTipoE),
          name:new FormControl(data.nameTipoE),
        })
      })
    }
  }

  

}
