import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnoService } from '../../../../core/services/alumnos.service';
import { Alumno } from '../models';

@Component({
  selector: 'app-alumnos-detail',
  templateUrl: './alumnos-detail.component.html',
  styleUrls: ['./alumnos-detail.component.scss'],
})
export class AlumnoDetailComponent implements OnInit {
  idAlumno?: string;
  alumno?: Alumno;
  isLoading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private alumnoService: AlumnoService
  ) {
    this.idAlumno = activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.alumnoService
      .getById(this.idAlumno!)
      .subscribe({
        next: (alumno) => {
          this.alumno = alumno;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }
}
