import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table'; 
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { SintomasEnfermedadService } from '../../../services/sintomas-enfermedad';
import { sintomasEnfermedad } from '../../../models/sintomasEnfermedad';

@Component({
  selector: 'app-listarsintomas-e',
  imports: [MatTableModule, MatButtonModule, RouterLink, MatIconModule,MatPaginatorModule],
  templateUrl: './listarsintomas-e.html',
  styleUrl: './listarsintomas-e.css'
})
export class ListarsintomasE implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  dataSource:MatTableDataSource<sintomasEnfermedad>=new MatTableDataSource()

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tS:SintomasEnfermedadService){}

  ngOnInit(): void{
    this.tS.list().subscribe(data=>{
      this.dataSource=new MatTableDataSource(data)
      this.dataSource.paginator = this.paginator; 

    })
    
    this.tS.getList().subscribe(data=>{
    this.dataSource=new MatTableDataSource(data)
    this.dataSource.paginator = this.paginator; 
  })
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id:number){
    this.tS.delete(id).subscribe(data=>{
      this.tS.list().subscribe(data=>{
        this.tS.setList(data)
      })
    })
  }
}
