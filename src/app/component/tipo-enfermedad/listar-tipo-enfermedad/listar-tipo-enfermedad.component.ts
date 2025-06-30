import { Component, OnInit } from '@angular/core';
import { TipoEnfermedad } from '../../../models/tipoEnfermedad';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TipoEnfermedadService } from '../../../services/tipoEnfermedad.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-listar-tipo-enfermedad',
  imports: [MatTableModule, MatButtonModule,RouterLink,MatIconModule],
  templateUrl: './listar-tipo-enfermedad.component.html',
  styleUrl: './listar-tipo-enfermedad.component.css'
})
export class ListarTipoEnfermedadComponent implements OnInit {
 displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource:MatTableDataSource<TipoEnfermedad> = new MatTableDataSource()
  constructor(private aS:TipoEnfermedadService){}

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
