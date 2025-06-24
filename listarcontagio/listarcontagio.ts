import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Contagios } from '../../../models/contagios';
import { ContagiosService } from '../../../services/contagios';
import { RouterLink } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-listarcontagio',
  imports: [MatTableModule, MatButtonModule,RouterLink,MatIconModule,MatPaginatorModule],
  templateUrl: './listarcontagio.html',
  styleUrl: './listarcontagio.css'
})
export class Listarcontagio implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4','c5','c6','c7','c8'];
  dataSource:MatTableDataSource<Contagios>=new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cS:ContagiosService){}

  ngOnInit(): void {
      this.cS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator; 
      })
      this.cS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
        this.dataSource.paginator = this.paginator; 
      })
    }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
    
    eliminar(id:number){
    this.cS.deleteA(id).subscribe(data=>{
      this.cS.list().subscribe(data=>{
        this.cS.setList(data)
      })
    })
  }
}
