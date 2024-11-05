import { Injectable } from '@angular/core';
import { Alumno } from '../../features/dashboard/alumnos/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AlumnoService {
  private baseURL = `${environment.apiBaseURL}/alumnos`;

  constructor(private httpClient: HttpClient) {}

  getAlumnos(): Observable<Alumno[]> {
    return this.httpClient.get<Alumno[]>(this.baseURL);
  }

  getById(id: string): Observable<Alumno> {
    return this.httpClient.get<Alumno>(`${this.baseURL}/${id}`);
  }

  removeAlumnoById(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/${id}`);
  }

  updateAlumnoById(id: string, update: Partial<Alumno>): Observable<Alumno> {
    return this.httpClient.patch<Alumno>(`${this.baseURL}/${id}`, update);
  }

  addAlumno(newAlumno: Omit<Alumno, 'id' | 'createdAt'>): Observable<Alumno> {
    return this.httpClient.post<Alumno>(this.baseURL, {
      ...newAlumno,
      createdAt: new Date().toISOString(),
    });
  }
}
