import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EnfermedadSintomasE } from '../../../models/enfermedadSintomasE';
import { EnfermedadSintomasEService } from '../../../services/enfermedad-sintomas-e';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarenfermedad-s',
  imports: [MatTableModule, MatButtonModule , MatIconModule, RouterModule],
  templateUrl: './listarenfermedad-s.html',
  styleUrl: './listarenfermedad-s.css'
})
export class ListarenfermedadSComponent implements OnInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  dataSource: MatTableDataSource<EnfermedadSintomasE> = new MatTableDataSource();

  constructor(private eSe:EnfermedadSintomasEService){}

  ngOnInit(): void {
      this.eSe.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })

      this.eSe.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      })
  }

  eliminar(id:number){
    this.eSe.delete(id).subscribe(data=>{
      this.eSe.list().subscribe(data=>{
        this.eSe.setList(data)
      })
    })
  }
}
