import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Zona } from '../../../models/zona';
import { ZonaService } from '../../../services/zona';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listarzona',
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule],
  templateUrl: './listarzona.html',
  styleUrl: './listarzona.css'
})
export class Listarzona implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6','c7'];
  dataSource:MatTableDataSource<Zona>=new MatTableDataSource()
  constructor(private zS:ZonaService){}

  ngOnInit(): void{
    this.zS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    
    this.zS.getList().subscribe(data=>{
    this.dataSource=new MatTableDataSource(data)
    })
  }

  eliminar(id:number){
    this.zS.deleteA(id).subscribe(data=>{
      this.zS.list().subscribe(data=>{
        this.zS.setList(data)
      })
    })
  }
}
