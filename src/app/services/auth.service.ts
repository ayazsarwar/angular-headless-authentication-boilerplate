import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn!: boolean;

  loggedIn$ = new BehaviorSubject(false);

  constructor(private router:Router) {
    this.loggedIn$.subscribe((s) => (this.loggedIn = s));
  }

  // To be updated
  login({ email, password }: { email: string; password: string; }) {
    // Mock login
    this.loggedIn$.next(true);
    this.router.navigate(['/'], { replaceUrl: true });
  }

  // To be updated
  logout() {
    // Mock logout
    this.loggedIn$.next(false);
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
