import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Usuario } from '../../../models/usuario';
import { Zona } from '../../../models/zona';
import { Rol } from '../../../models/rol';
import { UsuarioService } from '../../../services/usuario';
import { RolService } from '../../../services/rol';
import { ZonaService } from '../../../services/zona';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioRegistro } from '../../../models/usuario-registro';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UsuarioModi } from '../../../models/usuario-modi';

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
    MatButtonModule    
  ],
  templateUrl: './insertareditar.html',
  styleUrl: './insertareditar.css'
})
export class InsertareditarComponentUsuario implements OnInit {
  form: FormGroup = new FormGroup({});
  usuarioregistro: UsuarioRegistro = new UsuarioRegistro();
  usuariomodificar: UsuarioModi = new UsuarioModi();
  usuario: Usuario = new Usuario();

  id: number = 0;
  edicion: boolean = false;

  listaZonas: Zona[] = [];
  listaRoles: Rol[] = [];

  constructor(
    private uS: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private zS: ZonaService,
    private rS: RolService,
    private route: ActivatedRoute
  ) {}

  

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      nomb: ['', Validators.required],
      apell: ['', Validators.required],
      ena: [true, Validators.required],
      usern: ['', Validators.required],
      passw: ['', Validators.required],
      zon: ['', Validators.required],
      ro: ['', Validators.required],
    });

    this.zS.listsina().subscribe(data => {
      this.listaZonas = data;
    });
    this.rS.list().subscribe(data => {
      this.listaRoles = data;
    });      
  }

  aceptar() {
    if (this.form.valid) {
      // Actualizar los campos comunes para registro
      this.usuarioregistro.nombre = this.form.value.nomb;
      this.usuarioregistro.apellido = this.form.value.apell;
      this.usuarioregistro.username = this.form.value.usern;
      this.usuarioregistro.password = this.form.value.passw;
      this.usuarioregistro.zona.idZona = this.form.value.zon;
      this.usuarioregistro.rol.idRol = this.form.value.ro;

      if (this.edicion) {
        // actualizar el objeto de modificación con los valores actuales del formulario
        this.usuariomodificar.idUsuario = this.form.value.codigo;
        this.usuariomodificar.nombre = this.form.value.nomb;
        this.usuariomodificar.apellido = this.form.value.apell;
        this.usuariomodificar.enabled = this.form.value.ena;
        this.usuariomodificar.username = this.form.value.usern;
        this.usuariomodificar.password = this.form.value.passw;
        this.usuariomodificar.zona.idZona = this.form.value.zon;
        this.usuariomodificar.rol.idRol = this.form.value.ro;

        this.uS.update(this.usuariomodificar).subscribe(() => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data);
          });
          this.router.navigate(['usuarios']);
        });
      } else {
        this.uS.insert(this.usuarioregistro).subscribe(() => {
          this.uS.list().subscribe(data => {
            this.uS.setList(data);
          });
          this.router.navigate(['usuarios']);
        });
      }
    }
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe(data => {
        // Llenar el formulario con los datos que vienen del backend
        this.form = new FormGroup({
          codigo: new FormControl(data.idUsuario),
          nomb: new FormControl(data.nombre),
          apell: new FormControl(data.apellido),
          ena: new FormControl(data.enabled),
          usern: new FormControl(data.username),
          passw: new FormControl(data.password),
          zon: new FormControl(data.zona.idZona),
          ro: new FormControl(data.rol.idRol),
        });

        // actualizar objeto usuariomodificar con los datos iniciales
        this.usuariomodificar.idUsuario = data.idUsuario;
        this.usuariomodificar.nombre = data.nombre;
        this.usuariomodificar.apellido = data.apellido;
        this.usuariomodificar.enabled = data.enabled;
        this.usuariomodificar.username = data.username;
        this.usuariomodificar.password = data.password;
        this.usuariomodificar.zona.idZona = data.zona.idZona;
        this.usuariomodificar.rol.idRol = data.rol.idRol;
      });
    }
  }
}
