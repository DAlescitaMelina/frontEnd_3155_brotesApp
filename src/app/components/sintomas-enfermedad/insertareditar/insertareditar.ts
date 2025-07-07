 
import { SintomasEnfermedad } from '../sintomas-enfermedad';
import { SintomasEnfermedadService } from '../../../services/sintomas-enfermedad';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { sintomasEnfermedad } from '../../../models/sintomasEnfermedad';


@Component({
  selector: 'app-insertareditar',
   imports: [MatInputModule,CommonModule,MatFormFieldModule,
    MatDatepickerModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './insertareditar.html',
   providers: [provideNativeDateAdapter()],
  styleUrl: './insertareditar.css'
})
export class InsertareditarComponentSintomasEnfermedad implements OnInit {
  form:FormGroup=new FormGroup({})
  sintomasEn:sintomasEnfermedad = new sintomasEnfermedad()
  id:number=0
  edicion:boolean=false

  constructor(
    private formBuilder:FormBuilder,
    private tS:SintomasEnfermedadService,
    private router:Router,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
      this.route.params.subscribe((data:Params)=>{
        this.id=data['id']
        this.edicion=data['id']!=null
        this.init()
      })

      this.form=this.formBuilder.group({
        codigo:[''],
        sintomaE:['',Validators.required]
      })
  } 
  aceptar(){
    if(this.form.valid){
      this.sintomasEn.idSintomasE=this.form.value.codigo
      this.sintomasEn.nombreSintoma=this.form.value.nombreSintoma
  
      if(this.edicion){
          this.tS.update(this.sintomasEn).subscribe(data=>{
            this.tS.list().subscribe(data=>{
              this.tS.setList(data)
            })
          })
      }else{
          this.tS.insert(this.sintomasEn).subscribe(()=>{
            this.tS.list().subscribe(data=>{
              this.tS.setList(data)
            })
          })
      }
      this.router.navigate(['sintomasE'])     
    }
  }

  init(){
    if(this.edicion){
      this.tS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idSintomasE),
          sintomaE:new FormControl(data.nombreSintoma)    
        })
      })
    }
    
  }


}
 
