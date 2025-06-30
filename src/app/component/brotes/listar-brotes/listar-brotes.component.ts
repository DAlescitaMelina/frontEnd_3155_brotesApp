import { Component, OnInit } from '@angular/core';
import { Brotes } from '../../../models/brotes';
import { BrotesService } from '../../../services/brotes.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-listar-brotes',
  imports: [MatTableModule, MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './listar-brotes.component.html',
  styleUrl: './listar-brotes.component.css'
})
export class ListarBrotesComponent implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];
  dataSource:MatTableDataSource<Brotes> = new MatTableDataSource()
  constructor(private aS:BrotesService){}

 ngOnInit(): void {
    this.aS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
    })
    this.aS.getList().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data)
    })
  }

  eliminar(id:number){
    this.aS.deleteA(id).subscribe(data=>{
      this.aS.list().subscribe(data=>{
        this.aS.setList(data)
      })
    })
  }
}
