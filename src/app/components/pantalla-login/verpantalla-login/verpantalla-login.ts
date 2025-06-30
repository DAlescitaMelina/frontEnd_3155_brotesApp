import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-verpantalla-login',
  imports: [RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule, 
    MatButtonModule,
  ],
  templateUrl: './verpantalla-login.html',
  styleUrl: './verpantalla-login.css'
})
export class VerpantallaLogin implements OnInit {
form:FormGroup=new FormGroup({})
hide = true;

 
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  validarUsuario(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.router.navigate(['/pantalla-entidades/verpantalla-entidades']);
  }

   togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
 