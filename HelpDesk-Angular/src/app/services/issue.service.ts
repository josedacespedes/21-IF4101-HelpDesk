import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrlIssueSupport = 'https://localhost:44316/api/Issue/';
const baseUrlIssueClient = 'https://localhost:8080/api/issue/';

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

  /*SUPPORT*/
  setSupportUser(reportNumber: number, idSupport: number): Observable<any> {
    return this.http.put(baseUrlIssueSupport + 'PutUpdateSupportAssigned', { reportNumber, idSupport });
  }

  getIssueList(): Observable<any> {
    return this.http.get(`${baseUrlIssueSupport}`);
  }

  getIssueListBySupportId(id: number): Observable<any> {
    return this.http.get(`${baseUrlIssueSupport + 'GetAllBySupportId/' + id}`);
  }

  /*CLIENT*/
  public createIssue(issue) {
    return this.http.post<any>(baseUrlIssueClient, issue);
  }
  
  public findAllByUserId(userId: number): Observable<any> {
    return this.http.get<any>(baseUrlIssueClient + "findAllByUserId/" + userId);
  }

}
