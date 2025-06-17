import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { TipoTransmisionService } from '../../../services/tipo-transmision';
import { TipoTransmision } from '../../../models/tipoTransmision';

@Component({
  selector: 'app-listararea',
  imports: [MatTableModule, MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './listartipo-transmision.html',
  styleUrl: './listartipo-transmision.css'
})
export class ListartipoTransmision implements OnInit{
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource:MatTableDataSource<TipoTransmision>=new MatTableDataSource()
  constructor(private tS:TipoTransmisionService){}

  ngOnInit(): void {
      this.tS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })

      this.tS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
  }

  eliminar(id:number){
    this.tS.delete(id).subscribe(data=>{
      this.tS.list().subscribe(data=>{
        this.tS.setList(data)
      })
    })
  }

}
