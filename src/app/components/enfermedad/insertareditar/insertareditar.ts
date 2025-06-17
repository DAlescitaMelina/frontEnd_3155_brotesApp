import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Enfermedad } from '../../../models/enfermedad';
import { ActivatedRoute, Params,Router } from '@angular/router';

import { EnfermedadService } from '../../../services/enfermedad';

@Component({
  selector: 'app-insertareditar',
  imports: [MatInputModule,CommonModule,MatFormFieldModule,
    MatDatepickerModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css'
})
export class Insertareditar implements OnInit{
  form:FormGroup=new FormGroup({})
  enfermedad:Enfermedad=new Enfermedad()

  id:number=0
  edicion:boolean=false
  constructor(
    private formBuilder:FormBuilder,
    private eS:EnfermedadService,
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
        nombre:['',Validators.required],
        descripcion:['',Validators.required],
        tipoEnfermedad:['',Validators.required],
        tTransmision:['',Validators.required]
      })
    }
    aceptar(){
    if(this.form.valid){
      this.enfermedad.idEnfermedad=this.form.value.codigo
      this.enfermedad.nombre=this.form.value.nombre
      this.enfermedad.descripcionEnfermedad=this.form.value.descripcion
      this.enfermedad.tipoEnfermedad=this.form.value.tipoEnfermedad
      this.enfermedad.tipoTransmision=this.form.value.tTransmision
      if(this.edicion){
          this.eS.update(this.enfermedad).subscribe(data=>{
            this.eS.list().subscribe(data=>{
              this.eS.setList(data)
            })
          })
      }else{
          this.eS.insert(this.enfermedad).subscribe(()=>{
                    this.eS.list().subscribe(data=>{
                      this.eS.setList(data)
                    })
                  })
      }
      this.router.navigate(['enfermedad'])     
    }
   
  }

    init(){
    if(this.edicion){
      this.eS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idEnfermedad),
          nombre:new FormControl(data.nombre),
          descripcion:new FormControl(data.descripcionEnfermedad),
          tipoEnfermedad: new FormControl(data.tipoEnfermedad),
          tTransmision:new FormControl(data.tipoTransmision)
        })
      })
    }
    
  }
  }
