import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Zona } from '../../../models/zona';
import { ZonaService } from '../../../services/zona';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-insertareditar',
  imports: [MatInputModule,CommonModule,MatFormFieldModule,
    MatDatepickerModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css'
})
export class InsertareditarComponentZona implements OnInit {
  form:FormGroup=new FormGroup({})
  zona:Zona=new Zona()

  id:number=0
  edicion:boolean=false

  constructor(
    private formBuilder:FormBuilder,
    private zS:ZonaService,
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
        provincia:['',Validators.required],
        distrito:['',Validators.required],
        latitud:['',Validators.required],
        longitud:['',Validators.required]
      })
  } 
  aceptar(){
    if(this.form.valid){
      this.zona.idZona=this.form.value.codigo
      this.zona.provincia=this.form.value.provincia
      this.zona.distrito=this.form.value.distrito
      this.zona.latitud=this.form.value.latitud
      this.zona.longitud=this.form.value.longitud
      if(this.edicion){
          this.zS.update(this.zona).subscribe(data=>{
            this.zS.list().subscribe(data=>{
              this.zS.setList(data)
            })
          })
      }else{
          this.zS.insert(this.zona).subscribe(()=>{
                    this.zS.list().subscribe(data=>{
                      this.zS.setList(data)
                    })
                  })
      }
      this.router.navigate(['zonas'])     
    }
  }

  init(){
    if(this.edicion){
      this.zS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idZona),
          provincia:new FormControl(data.provincia),
          distrito:new FormControl(data.distrito),
          latitud: new FormControl(data.latitud),
          longitud:new FormControl(data.longitud)
        })
      })
    }
    
  }


}
