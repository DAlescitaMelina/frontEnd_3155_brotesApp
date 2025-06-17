import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';


@Component({
  selector: 'app-insertareditar',
  imports: [MatInputModule,CommonModule,MatFormFieldModule,
    MatDatepickerModule],
   templateUrl: './insertareditarContagios.html',
   providers: [provideNativeDateAdapter()],

  styleUrl: './insertareditarContagios.css'
})
export class InsertareditarContagios implements OnInit{
  form:FormGroup=new FormGroup({})

   constructor(private formBuilder:FormBuilder  ){}

  ngOnInit(): void {
      this.form=this.formBuilder.group({
         name:['',Validators.required]

    })
 }
 } 

