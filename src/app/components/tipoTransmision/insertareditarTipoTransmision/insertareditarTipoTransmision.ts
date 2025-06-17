import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule, FormControl  } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TipoTransmision } from '../../../models/tipoTransmision';
import { TipoTransmisionService } from '../../../services/tipo-transmision';

@Component({
  selector: 'app-insertareditar',
  imports: [MatInputModule,CommonModule,MatFormFieldModule,
    MatDatepickerModule,ReactiveFormsModule,MatButtonModule  ],
  templateUrl: './insertareditarTipoTransmision.html', 
  providers: [provideNativeDateAdapter()],
  styleUrl: './insertareditarTipoTransmision.css'
})
export class insertareditarTipoTransmision implements OnInit{
  form:FormGroup=new FormGroup({})
  tipoTransmision:TipoTransmision=new TipoTransmision()

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
        name:['',Validators.required]
      })
  } 
  aceptar(){
    if(this.form.valid){
      this.tipoTransmision
      this.tipoTransmision.idTipoT=this.form.value.codigo
      this.tipoTransmision.transmision=this.form.value.name
  
      if(this.edicion){
          this.tS.update(this.tipoTransmision).subscribe(data=>{
            this.tS.list().subscribe(data=>{
              this.tS.setList(data)
            })
          })
      }else{
          this.tS.insert(this.tipoTransmision).subscribe(()=>{
                    this.tS.list().subscribe(data=>{
                      this.tS.setList(data)
                    })
                  })
      }
      this.router.navigate(['tipoTransmision'])     
    }
   
  }

  init(){
    if(this.edicion){
      this.tS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idTipoT),
          name:new FormControl(data.transmision)
        })
      })
    }
    
  }

}
