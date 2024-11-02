import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AddBody {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:3000/api/v1/auth/login';

  constructor(private http: HttpClient) {}

  login(body: AddBody) {
    return this.http.post<{
      id: number;
      name: string;
      email: string;
      token: string;
    }>(this.url, body, { observe: 'response' as const });
  }
}
