import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Contagios } from '../../../models/contagios';
import { ContagiosService } from '../../../services/contagios';

@Component({
  selector: 'app-listar-contagio',
  imports: [MatTableModule],
  templateUrl: './listar-contagio.html',
  styleUrl: './listar-contagio.css'
})
export class ListarContagio {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource: MatTableDataSource<Contagios> = new MatTableDataSource()
  constructor(private cS:ContagiosService){}

  ngOnInit(): void {
      this.cS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })

      this.cS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
  }

  /*eliminar(id:number){
    this.cS.deleteA(id).subscribe(data=>{
      this.cS.list().subscribe(data=>{
        this.cS.setList(data)
      })
    })
  }*/
}
