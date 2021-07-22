import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../models/Comment.js";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private _url = 'http://localhost:8080/api/comment/';

  constructor(private http: HttpClient) { }

  public createComment(comment: Comment): Observable<any> {
    return this.http.post(this._url, comment);
  }

  public findAllByIssueReportNumber(reportNumber: number): Observable<any> {
    return this.http.get<any>(this._url + "findAllByIssueReportNumber/" + reportNumber);
  }
}
