import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import JwtPayload from '../../../interfaces/jwt-payload';

@Injectable()
export class JwtTokenService {
  jwtToken!: string;
  decodedToken!: JwtPayload;

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwtDecode<JwtPayload>(this.jwtToken);
    }
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  isTokenExpired(): boolean {
    const expiryTime = this.getExpiryTime();

    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    }

    return false;
  }
}
