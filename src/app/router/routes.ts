import { Routes } from '@angular/router';

import { LoginComponent } from './../pages/login/login.component';
import { ForgotPasswordComponent } from './../pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../pages/reset-password/reset-password.component';
import { DashboardComponent } from './../pages/dashboard/dashboard.component';
import { GuestGuard } from '../guards/guest.guard';
import { AuthGuard } from '../guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [GuestGuard],
  },
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
];
