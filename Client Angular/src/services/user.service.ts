import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from "../models/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url = 'http://localhost:8080/api/user/';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post<any>(this._url, user);
  }
}
