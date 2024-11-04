import { Injectable } from '@angular/core';
import { AuthData } from '../../features/auth/models';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../../features/auth/users/models';
import { generateRandomString } from '../../shared/utils';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';

const FAKE_USER: User = {
  email: 'admin@alumnify.com',
  firstName: 'admin',
  lastName: 'admin',
  id: generateRandomString(4),
  createdAt: new Date(),
  password: '123456',
  token: 'abcdefghiasdasdasdlsadsalasdasfdsfsdf103232',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authUser$ = new BehaviorSubject<null | User>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router) {}

  login(data: AuthData): Observable<User> {
    if (data.email !== FAKE_USER.email) {
      return throwError(() => new Error('El email es incorrecto.'));
    }
    if (data.password !== FAKE_USER.password) {
      return throwError(() => new Error('La contraseña es incorrecta.'));
    }

    this._authUser$.next(FAKE_USER);
    localStorage.setItem('token', FAKE_USER.token);
    return of(FAKE_USER).pipe(
      tap(() => console.log('Usuario autenticado correctamente')),
      catchError(err => {
        console.error('Error durante el proceso de autenticación:', err);
        return throwError(err);
      })
    );
  }

  logout(): void {
    this._authUser$.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['auth', 'login']);
    console.log('El usuario ha cerrado sesión.');
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    const isValid = token === FAKE_USER.token;

    if (isValid) {
      this._authUser$.next(FAKE_USER);
    } else {
      this._authUser$.next(null);
    }

    return of(isValid).pipe(
      tap(isValid => {
        if (isValid) {
          console.log('Token válido. Usuario autenticado.');
        } else {
          console.warn('Token inválido. Redirigiendo al login.');
          this.router.navigate(['auth', 'login']);
        }
      }),
      catchError(err => {
        console.error('Error durante la verificación del token:', err);
        return of(false);
      })
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') === FAKE_USER.token;
  }
}
