import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { QD1 } from './q-d1/q-d1';
import { QD2Component } from './q-d2/q-d2';
import { Q2bdto } from './q2bdto/q2bdto'; 
import { Q1bdto } from './q1bdto/q1bdto';
import { Qt1Component } from './qt1/qt1';
import { Qw1Component } from "./qw1/qw1";
import { QM1 } from './q-m1/q-m1';
import { QM2 } from './q-m2/q-m2';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet,
    Q1bdto, Q2bdto,
    QD1, QD2Component,
    Qt1Component, Qw1Component, QM1, QM2],
 
  templateUrl: './reportes.html',
  styleUrl: './reportes.css'
})
export class ReportesComponent {
 
  constructor(public route:ActivatedRoute){}
 
}
