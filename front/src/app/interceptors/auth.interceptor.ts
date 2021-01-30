import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = (localStorage.getItem('bintuser')) ? JSON.parse(localStorage.getItem('bintuser')).token: null
    let clone = request.clone()
    if (token) {
      clone = clone.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    }
    return next.handle(clone)
  }
}

export const AuthTokenHttpInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}