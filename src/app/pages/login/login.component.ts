import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(public auth: AuthService, public router: Router) {}

  attempt() {
    this.auth
      .login({
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
      })
      .subscribe({
        next: (res) => {
          this.auth.loggedIn$.next(true);
          localStorage.setItem('access_token', res.token);
          this.auth.token$.next(res.token);
          this.auth.getUser().subscribe({
            next: (user) => {
              this.auth.user$.next(user);
              this.router.navigate(['/'], { replaceUrl: true });
            },
            error: (e) => console.error(e),
          });
        },
        error: (e) => console.error(e),
      });
  }
}
