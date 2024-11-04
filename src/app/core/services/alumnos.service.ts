import { Injectable } from '@angular/core';
import { Alumno } from '../../features/dashboard/alumnos/models';
import { Observable, of } from 'rxjs';
import { generateRandomString } from '../../shared/utils';

let ALUMNOSBASE: Alumno[] = [
  {
    id: '63c9',
    firstName: 'Daniella',
    lastName: 'Contardo',
    createdAt: new Date(),
    email: 'danicontardo@gmail.com',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  constructor() {}

  getAlumnos(): Observable<Alumno[]> {
    return of(ALUMNOSBASE);
  }

  removeAlumnoById(id: string): Observable<Alumno[]> {
    ALUMNOSBASE = ALUMNOSBASE.filter((alumno) => alumno.id !== id);
    return of(ALUMNOSBASE);
  }

  updateAlumnoById(id: string, update: Partial<Alumno>): Observable<Alumno[]> {
    ALUMNOSBASE = ALUMNOSBASE.map((alumno) =>
      alumno.id === id ? { ...alumno, ...update } : alumno
    );
    return of(ALUMNOSBASE);
  }

  addAlumno(newAlumno: Alumno): Observable<Alumno | null> {
    const trimmedEmail = newAlumno.email.trim().toLowerCase();
    const trimmedFirstName = newAlumno.firstName.trim().toLowerCase();
    const trimmedLastName = newAlumno.lastName.trim().toLowerCase();

    const alumnoExists = ALUMNOSBASE.some(alumno => 
      alumno.email.trim().toLowerCase() === trimmedEmail ||
      (alumno.firstName.trim().toLowerCase() === trimmedFirstName &&
      alumno.lastName.trim().toLowerCase() === trimmedLastName)
    );
    
    if (alumnoExists) {
      return of(null); 
    }
    
    newAlumno.id = generateRandomString(4);
    newAlumno.createdAt = new Date();
    ALUMNOSBASE = [...ALUMNOSBASE, { ...newAlumno }];
    return of({ ...newAlumno });
  }
}
