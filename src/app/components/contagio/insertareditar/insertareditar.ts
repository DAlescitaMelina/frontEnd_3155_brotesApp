import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Contagios } from '../../../models/contagios';
import { Zona } from '../../../models/zona';
import { Enfermedad } from '../../../models/enfermedad';
import { ContagiosService } from '../../../services/contagios';
import { ZonaService } from '../../../services/zona';
import { UsuarioService } from '../../../services/usuario';
import { EnfermedadService } from '../../../services/enfermedad';
import { Usuario } from '../../../models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTimepickerModule} from '@angular/material/timepicker';


@Component({
  selector: 'app-insertareditar',
  providers: [provideNativeDateAdapter()],

  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatTimepickerModule
  ],
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class InsertareditarComponentContagio implements OnInit{
form: FormGroup=new FormGroup({})
valorDefecto:boolean=true
contagio:Contagios=new Contagios()
id:number=0
edicion:boolean=false

listaZonas:Zona[]=[]
listaUsuarios:Usuario[]=[]
listaEnfermedades:Enfermedad[]=[]

  constructor(
    private cS:ContagiosService,
    private formBuilder:FormBuilder,
    private router:Router,
    private zS:ZonaService,
    private uS:UsuarioService,
    private eS:EnfermedadService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar, 
  ) {}

  ngOnInit(): void {
      this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

      this.form=this.formBuilder.group({
        fecha:['',Validators.required],
        hora:['',Validators.required],
        enf:['',Validators.required],
        zon:['',Validators.required],
        usr:['',Validators.required] 
      })

      this.zS.list().subscribe(data=>{
        this.listaZonas=data
      })
      this.uS.list().subscribe(data=>{
        this.listaUsuarios=data
      })      
      this.eS.list().subscribe(data=>{
        this.listaEnfermedades=data
      })          
  }


  
 validarFechaHora(control: AbstractControl) {
    const valor = new Date(control.value);
    const hoy = new Date();

    valor.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);

    return valor < hoy ? null : { fechaNoPasada: true };
  }



  aceptar(){
  if(this.form.valid){
    this.contagio.fechaContagio=this.form.value.fecha
    this.contagio.horaContagio=this.form.value.hora
    this.contagio.zona.idZona=this.form.value.zon
    this.contagio.usuario.idUsuario=this.form.value.usr
    this.contagio.enfermedad.idEnfermedad=this.form.value.enf
 
      if (this.edicion) {
        this.contagio.idContagio = this.id;
         this.cS.update(this.contagio).subscribe(() => {
            this.cS.list().subscribe(data => {
              this.cS.setList(data);
             })
           })
      } else {
          this.cS.insert(this.contagio).subscribe(() => {
            this.cS.list().subscribe(data => {
              this.cS.setList(data);
            })
          })
      }
               // Muestra el snackbar
      this.snackBar.open('¡Registrado exitosamente!', 'Cerrar', {
      duration: 3000,
    });

      this.router.navigate(['contagios'])
    }
  }

  init(){
    if(this.edicion){
      this.cS.listId(this.id).subscribe(data=>{
        this.form=new FormGroup({
          codigo:new FormControl(data.idContagio),
          fecha: new FormControl(data.fechaContagio),
          hora: new FormControl(data.horaContagio),
          enf: new FormControl(data.enfermedad.idEnfermedad),
          zon: new FormControl(data.zona.idZona),
          usr: new FormControl(data.usuario.idUsuario)
        })
      })
    }
    
  }  
}
