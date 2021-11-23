import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn$ = new BehaviorSubject(false);
  user$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private router: Router) {
    this.loggedIn$.subscribe();
    this.user$.subscribe();
  }

  // To be updated
  login({ email, password }: { email: string; password: string }) {
    // Mock login
    this.loggedIn$.next(true);
    this.user$.next({
      id: 1,
      email: 'asd@asd.com',
      first_name: 'Test',
      last_name: 'User',
      roles: [],
    });
    this.router.navigate(['/'], { replaceUrl: true });
  }

  // To be updated
  logout() {
    // Mock logout
    this.loggedIn$.next(false);
    this.user$.next(null);
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
