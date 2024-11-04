import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CursosService } from '../../../core/services/cursos.service';
import { CursosDialogComponent } from './cursos-dialog/cursos-dialog.component';
import { Curso } from './models';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  dataCursos: Curso[] = [];

  constructor(private cursosService: CursosService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursosService.getCursos().subscribe(data => {
      this.dataCursos = [...data]; 
    });
  }

  openDialog(curso?: Curso): void {
    const dialogRef = this.dialog.open(CursosDialogComponent, {
      width: '400px',
      data: curso ? curso : null 
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result && !this.dataCursos.some(c => 
          c.nombre.trim().toLowerCase() === result.nombre.trim().toLowerCase() &&
          c.modalidad.trim().toLowerCase() === result.modalidad.trim().toLowerCase())) {
        this.dataCursos.push({ ...result });
        this.dataCursos = [...this.dataCursos];
      }
    });
  }

  deleteCurso(id: string): void {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este curso?");
    
    if (confirmDelete) {
      this.cursosService.removeCursoById(id).subscribe(() => {
        this.loadCursos();
      });
    } 
  }
}
