import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private url = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  register(body: { name: string; email: string; password: string }) {
    return this.http.post<{
      id: number;
      name: string;
      email: string;
      token: string;
    }>(this.url, { ...body, role: 'user' }, { observe: 'response' as const });
  }
}
