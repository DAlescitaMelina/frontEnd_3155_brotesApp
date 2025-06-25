import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Rol } from '../../../models/rol';
import { RolService } from '../../../services/rol';

@Component({
  selector: 'app-listarrol',
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './listarrol.html',
  styleUrl: './listarrol.css'
})
export class Listarrol implements OnInit {
  displayedColumns: string[] = ['c1', 'c2','c3'];
  dataSource:MatTableDataSource<Rol>=new MatTableDataSource()
  constructor(private rS:RolService){}

  ngOnInit(): void{
    this.rS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    
    this.rS.getList().subscribe(data=>{
    this.dataSource=new MatTableDataSource(data)
    })
  }
 
}

