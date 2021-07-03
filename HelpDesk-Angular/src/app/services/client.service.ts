import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Client} from "../models/client.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _url = 'http://localhost:8080/api/user/';

  constructor(private http: HttpClient) { }

  createClient(client: Client): Observable<any> {
    return this.http.post<any>(this._url, client);
  }
}
