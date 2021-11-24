import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

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

  constructor(
    public auth: AuthService,
    public router: Router,
    private notification: NotificationService
  ) {}

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
              this.notification.push({
                autoClose: false,
                msg: 'Logged In successfully',
              });
            },
            error: (e) => {
              console.error(e);
              // this.notification.push(e.toString());
            },
          });
        },
        error: (e) => {
          console.error(e);
          // this.notification.push(e.toString());
        },
      });
  }
}
