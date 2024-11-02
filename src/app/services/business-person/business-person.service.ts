import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AddBody {
  name: string;
  cpf: string;
  birthday: string;
  address: {
    zipCode: string;
    street: string;
    complement?: string | null;
    number?: string | null;
    neighborhood?: string | null;
    city: string;
    state: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class BusinessPersonService {
  private url = 'http://localhost:3000/api/v1/businessman';

  constructor(private http: HttpClient) {}

  add(body: AddBody) {
    return this.http.post<{
      message: string;
      id: string;
    }>(this.url, body, { observe: 'response' as const });
  }
}
