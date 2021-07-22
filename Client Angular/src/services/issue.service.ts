import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Issue} from "../models/Issue";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private _url = 'http://localhost:8080/api/issue/';

  constructor(private http: HttpClient) { }

  public createIssue(issue: Issue) {
    return this.http.post<any>(this._url, issue);
  }

  public findAllByUserId(userId: number): Observable<any> {
    return this.http.get<any>(this._url + "findAllByUserId/" + userId);
  }

  public findByReportNumber(reportNumber: number): Observable<any> {
    return this.http.get<any>(this._url + reportNumber);
  }

}
