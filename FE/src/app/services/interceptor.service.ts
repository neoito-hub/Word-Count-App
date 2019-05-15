import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";

import { UsersService } from "./user.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private userService: UsersService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        success => {},
        (err: any) => {
          // handle error to unauthorised and generate userid
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401 || err.status === 403) {
              this.userService.create().subscribe(r => {
                return next.handle(request);
              });
            } else if (err.status === 500) {
              // may be problem of userId
              localStorage.clear();
              location.reload();
            }
          }
        }
      )
    );
  }
}
