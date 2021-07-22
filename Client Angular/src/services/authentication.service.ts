import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'userInSession';
  _userId: number;
  _token: string;
  _services: number[];

  constructor(private http: HttpClient) {
    if(this.isUserLoggedIn()) {
      let sessionData: Session = JSON.parse(sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME));
      this._userId = sessionData.userId;
      this._token = sessionData.token;
      this._services = sessionData.servicesById;
    }
  }

  authentication(email: string, pass: string) {
    return this.http.post<any>(`http://localhost:8080/api/login`,
      {email, pass})
      .pipe(map((res) => {
        this.registerSuccessfulLogin(res);
        return res;
      }));
  }

  registerSuccessfulLogin(sessionData: Session) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME,
      JSON.stringify(sessionData));
    this._userId = sessionData.userId;
    this._token = sessionData.token;
    this._services = sessionData.servicesById;
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this._userId = null;
    this._token = null;
    this._services = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return false;
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return '';
    return user
  }
}

interface Session {
  userId: number,
  token: string,
  servicesById: number[]
}
