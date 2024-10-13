import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:3000/api/v1/auth/login';

  constructor(private http: HttpClient) {}

  login(body: { email: string; password: string }) {
    return this.http.post(this.url, body, { observe: 'response' as const });
  }
}
