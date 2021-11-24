import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  private baseUrl = environment.baseUrl;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    if (token) {
      return next.handle(
        req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
          url: `${this.baseUrl}/${req.url}`,
        })
      );
    }

    return next.handle(req.clone({ url: `${this.baseUrl}/${req.url}` }));
  }
}
