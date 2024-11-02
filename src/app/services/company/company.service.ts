import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AddBody {
  company: {
    cnpj: string;
    legalName: string;
    tradeName: string;
    socialCapital: number;
    isTransportAutonomous?: boolean;
    businessManId?: number;
  };
  address: {
    zipCode: string;
    street: string;
    complement?: string;
    number?: string;
    neighborhood?: string;
    city: string;
    state: string;
  };
  activities: {
    cnae: string;
    name: string;
    occupation: string;
    isPrimary?: boolean;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private url = 'http://localhost:3000/api/v1/companies';

  constructor(private http: HttpClient) {}

  add(body: AddBody) {
    return this.http.post<{
      message: string;
    }>(this.url, body, { observe: 'response' as const });
  }
}
