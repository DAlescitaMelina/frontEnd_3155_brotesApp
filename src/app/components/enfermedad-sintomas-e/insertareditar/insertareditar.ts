import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EnfermedadSintomasE } from '../../../models/enfermedadSintomasE';
import { EnfermedadSintomasEService } from '../../../services/enfermedad-sintomas-e';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { sintomasEnfermedad } from '../../../models/sintomasEnfermedad';
import { Enfermedad } from '../../../models/enfermedad';
import { SintomasEnfermedadService } from '../../../services/sintomas-enfermedad';
import { EnfermedadService } from '../../../services/enfermedad';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-insertareditar',
  imports: [MatInputModule,CommonModule,MatFormFieldModule,
    MatDatepickerModule,ReactiveFormsModule,MatButtonModule, MatSelectModule],
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css'
})
export class Insertareditar implements OnInit{
  form:FormGroup=new FormGroup({})
  enfermedadSintomasE:EnfermedadSintomasE=new EnfermedadSintomasE()
  listasintomasEnfermedad: sintomasEnfermedad[] = [];
  listaenfermedad: Enfermedad[] = [];
  id:number=0
  edicion:boolean=false

  constructor(
    private formBuilder:FormBuilder,
    private eSe:EnfermedadSintomasEService,
    private sSe: SintomasEnfermedadService,
    private eS: EnfermedadService,
    private router:Router,
    private route:ActivatedRoute,
  ){}
  ngOnInit(): void {
      this.route.params.subscribe((data:Params)=>{
        this.id=data['id']
        this.edicion=data['id']!=null
        this.init()
      })


      this.form=this.formBuilder.group({
        codigo:[''],
        sintomaEnfermedad:['',Validators.required],
        enfermedad:['',Validators.required],
      });
      this.sSe.list().subscribe(data => {
        this.listasintomasEnfermedad= data;
      });
      this.eS.list().subscribe(data => {
        this.listaenfermedad = data;
      });

    }
    aceptar(){
    if(this.form.valid){
      this.enfermedadSintomasE.idEnfermedadSE=this.form.value.codigo
      this.enfermedadSintomasE.sintomasEnfermedad.idSintomasE = this.form.value.sintomaEnfermedad;
      this.enfermedadSintomasE.enfermedad.idEnfermedad = this.form.value.enfermedad;
      if(this.edicion){
          this.eSe.update(this.enfermedadSintomasE).subscribe(data=>{
            this.eSe.list().subscribe(data=>{
              this.eSe.setList(data)
            })
          })
      }else{
          this.eSe.insert(this.enfermedadSintomasE).subscribe(()=>{
                    this.eSe.list().subscribe(data=>{
                      this.eSe.setList(data)
                    })
                  })
      }
      this.router.navigate(['enfermedadSintomasE'])     
    }
   
  }

    init(){
    if(this.edicion){
      this.eSe.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idEnfermedadSE),
          sintomasEnfermedad: new FormControl(data.sintomasEnfermedad.idSintomasE, Validators.required),
          enfermedad: new FormControl(data.enfermedad.idEnfermedad, Validators.required)
        })
      })
    }
    
  }

}
