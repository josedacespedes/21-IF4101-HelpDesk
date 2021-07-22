import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {User} from "../models/User";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor{

  constructor(private auth: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isUserLoggedIn()) {
      const authReq = req.clone({
        headers: req.headers.set(
          'Authorization', this.auth._token
        )
      });
      return next.handle(authReq);
    } else return next.handle(req);
  }
}
