import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol';

@Component({
  selector: 'app-insertareditar',
  imports: [MatInputModule,CommonModule,MatFormFieldModule,
    MatDatepickerModule,ReactiveFormsModule,MatButtonModule],
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css'
})
export class InsertareditarComponentRol implements OnInit {
  form:FormGroup=new FormGroup({})
  rol:Rol=new Rol()

  id:number=0
  edicion:boolean=false

  constructor(
    private formBuilder:FormBuilder,
    private rS:RolService,
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
        rol:['',Validators.required]
      })
  } 
  aceptar(){
    if(this.form.valid){
      this.rol.idRol=this.form.value.codigo
      this.rol.rol=this.form.value.rol
      if(this.edicion){
          this.rS.update(this.rol).subscribe(data=>{
            this.rS.list().subscribe(data=>{
              this.rS.setList(data)
            })
          })
      }else{
          this.rS.insert(this.rol).subscribe(()=>{
                    this.rS.list().subscribe(data=>{
                      this.rS.setList(data)
                    })
                  })
      }
      this.router.navigate(['roles'])     
    }
  }

  init(){
    if(this.edicion){
      this.rS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idRol),
          rol:new FormControl(data.rol)
        })
      })
    }
    
  }


}
