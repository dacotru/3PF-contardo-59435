import { Injectable } from '@angular/core';
import { Curso } from '../../features/dashboard/cursos/models';
import { Observable, of } from 'rxjs';
import { generateRandomString } from '../../shared/utils';

let CURSOSBASE: Curso[] = [
  {
    id: '63c9',
    nombre: 'Curso de Angular',
    modalidad: 'Vespertino',
    profesor: 'Profesor A',
  },
];

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  constructor() {}

  getCursos(): Observable<Curso[]> {
    return of([...CURSOSBASE]);
  }

  removeCursoById(id: string): Observable<Curso[]> {
    CURSOSBASE = CURSOSBASE.filter((curso) => curso.id !== id);
    return of([...CURSOSBASE]);
  }

  addCurso(newCurso: Curso): Observable<Curso | null> {
    const cursoExists = CURSOSBASE.some(
      (curso) =>
        curso.nombre.trim().toLowerCase() === newCurso.nombre.trim().toLowerCase() &&
        curso.modalidad.trim().toLowerCase() === newCurso.modalidad.trim().toLowerCase()
    );

    if (cursoExists) {
      console.log('Curso ya existe con el mismo nombre y modalidad:', newCurso.nombre);
      return of(null);
    } else {
      const newCursoCopy = { ...newCurso };
      newCursoCopy.id = generateRandomString(4);
      CURSOSBASE = [...CURSOSBASE, newCursoCopy];
      console.log('Curso agregado:', newCursoCopy);
      return of(newCursoCopy);
    }
  }

  updateCursoById(id: string, update: Partial<Curso>): Observable<Curso[]> {
    CURSOSBASE = CURSOSBASE.map((curso) =>
      curso.id === id ? { ...curso, ...update } : curso
    );
    return of([...CURSOSBASE]);
  }
}
