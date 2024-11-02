import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const token = sessionStorage.getItem('token');

    req = req.clone({
      url: req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(req);
  }
}
