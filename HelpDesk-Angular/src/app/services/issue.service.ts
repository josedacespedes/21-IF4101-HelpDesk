import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrlIssue = 'https://localhost:44316/api/Issue/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  constructor(private http: HttpClient) { }

  setSupportUser(reportNumber: number, idSupport: number): Observable<any> {
    return this.http.put(baseUrlIssue + 'PutUpdateSupportAssigned', { reportNumber, idSupport });
  }

  getIssueList(): Observable<any> {
    return this.http.get(`${baseUrlIssue}`);
  }

  getIssueListBySupportId(id: number): Observable<any> {
    return this.http.get(`${baseUrlIssue + 'GetAllBySupportId/' + id}`);
  }


}
