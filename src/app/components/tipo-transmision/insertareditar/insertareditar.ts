import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TipoTransmision } from '../../../models/tipoTransmision';
import { TipoTransmisionService } from '../../../services/tipo-transmision';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertareditar',
    imports: [MatInputModule,CommonModule,MatFormFieldModule,
    MatDatepickerModule,ReactiveFormsModule,MatButtonModule],
    templateUrl: './insertareditar.html',
    providers: [provideNativeDateAdapter()],
    styleUrl: './insertareditar.css'
})
export class InsertareditarComponentTipoTransmision implements OnInit {
  form:FormGroup=new FormGroup({})
  tipotrasmision:TipoTransmision=new TipoTransmision()
  id:number=0
  edicion:boolean=false

  constructor(
    private formBuilder:FormBuilder,
    private tS:TipoTransmisionService,
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
        transmision:['',Validators.required]
      })
  } 
  aceptar(){
    if(this.form.valid){
      this.tipotrasmision.idTipoT=this.form.value.codigo
      this.tipotrasmision.transmision=this.form.value.transmision
  
      if(this.edicion){
          this.tS.update(this.tipotrasmision).subscribe(data=>{
            this.tS.list().subscribe(data=>{
              this.tS.setList(data)
            })
          })
      }else{
          this.tS.insert(this.tipotrasmision).subscribe(()=>{
            this.tS.list().subscribe(data=>{
              this.tS.setList(data)
            })
          })
      }
      this.router.navigate(['tiposT'])     
    }
  }

  init(){
    if(this.edicion){
      this.tS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idTipoT),
          transmision:new FormControl(data.transmision)    
        })
      })
    }
    
  }


}
 
