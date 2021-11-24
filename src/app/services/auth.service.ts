import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { api } from '../api.endpoints';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn$ = new BehaviorSubject(false);
  user$: BehaviorSubject<any> = new BehaviorSubject(null);
  token$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private router: Router, private http: HttpClient, private notification:NotificationService) {
    this.loggedIn$.subscribe();
    this.user$.subscribe();

    const token: any = localStorage.getItem('access_token');
    if (token) {
      this.loggedIn$.next(true);
      this.token$.next(token);
      this.getUser().subscribe({
        next: (res) => {
          this.user$.next(res);
          this.router.navigate(['/'], { replaceUrl: true });
        },
        error: () => {
          this.logout();
        },
      });
    } else {
      this.loggedIn$.next(false);
      this.token$.next(null);
      this.user$.next(null);
    }
  }

  // To be updated
  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Observable<any> {
    // Mock login
    return this.http
      .post(api.login, {
        username: email,
        password: password,
      })
      .pipe(
        map((res: any) => {
          let { token, ...user } = res;
          return { token, user };
        })
      );
  }

  getUser() {
    return this.http.get(api.getLoggedInUser).pipe(
      map((res: any) => {
        return res.data;
      })
    );
  }

  // To be updated
  logout() {
    // Mock logout
    return this.http.post(api.logout, {}).subscribe({
      next: () => {
        this.loggedIn$.next(false);
        this.user$.next(null);
        localStorage.removeItem('access_token');
        this.token$.next(null);
        this.router.navigate(['/login'], { replaceUrl: true });
        this.notification.push({msg:'Logged Out successfully'})
      },
    });
  }
}
