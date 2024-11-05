import { Injectable } from '@angular/core';
import { AuthData } from '../../features/auth/models';
import { BehaviorSubject, map, Observable, of, throwError } from 'rxjs';
import { User } from '../../features/dashboard/users/models';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, switchMap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);

  public authUser$ = this._authUser$.asObservable();

  private baseURL = environment.apiBaseURL;

  constructor(private router: Router, private httpClient: HttpClient) {}

  private handleAuthentication(users: User[]): User | null {
    if (!!users[0]) {
      this._authUser$.next(users[0]);
      localStorage.setItem('token', users[0].token);
      return users[0];
    } else {
      return null;
    }
  }

  login(data: AuthData): Observable<User> {
    return this.httpClient
      .get<User[]>(
        `${this.baseURL}/users?email=${data.email}&password=${data.password}`
      )
      .pipe(
        switchMap((users) => {
          const user = this.handleAuthentication(users);
          if (user) {
            return of(user); // Emitimos el usuario si es válido
          } else {
            return throwError(() => new Error('Los datos son inválidos'));
          }
        }),
        catchError((error) => {
          // Manejo del error para enviarlo al componente que llama
          return throwError(() => error);
        })
      );
  }
  

  logout() {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
  }

  verifyToken(): Observable<boolean> {
    return this.httpClient
      .get<User[]>(
        `${this.baseURL}/users?token=${localStorage.getItem('token')}`
      )
      .pipe(
        map((users) => {
          const user = this.handleAuthentication(users);
          return !!user;
        })
      );
  }
}