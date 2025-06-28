import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatError, MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { RouterLink } from '@angular/router';
import { Router } from 'express';

@Component({
  selector: 'app-verpantalla-login',
  imports: [RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  templateUrl: './verpantalla-login.html',
  styleUrl: './verpantalla-login.css'
})
export class VerpantallaLogin {
form:FormGroup=new FormGroup({})
 registrarUsuario(){}
}
 