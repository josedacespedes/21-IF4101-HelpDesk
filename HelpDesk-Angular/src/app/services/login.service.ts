import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';


const endpointClient = 'https://localhost:44316/api/'; //url api
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'userInSession';
  userId: number;
  role: string;
  token: string;

  constructor(private http: HttpClient) {
    if (this.isUserLoggedIn()) {
      const sessionData: Session = JSON.parse(sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME));
      console.log(sessionData.IdUser);
      this.userId = sessionData.IdUser;
      this.role = sessionData.Role;
      this.token = sessionData.Token;
    }
  }

  authentication(login) {
    return this.http.post<any>(endpointClient + 'Login/', JSON.stringify(login), httpOptions)
      .pipe(map((res) => {
        if(res!=null){
          this.registerSuccessfulLogin(res);
        }
        return res;
    }));
  }

  registerSuccessfulLogin(sessionData: Session) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME,
      JSON.stringify(sessionData));
    this.userId = sessionData.IdUser;
    this.token = sessionData.Token;
    this.role = sessionData.Role;
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) { return false; }
    return true;
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.userId = null;
    this.token = null;
    this.role = null;
  }
}

interface Session {
  IdUser: number;
  Role: string;
  Token: string;
}

