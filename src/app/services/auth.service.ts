import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn!: boolean;

  loggedIn$: Observable<boolean> = of(false);

  constructor() {
    this.loggedIn$.subscribe((s) => (this.loggedIn = s));
  }

  // To be updated
  login() {
    // Mock login
    this.loggedIn$ = of(true);
  }

  // To be updated
  logout() {
    // Mock logout
    this.loggedIn$ = of(false);
  }
}
