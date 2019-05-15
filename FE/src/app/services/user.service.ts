import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { USER_URL } from '../config';
import { LOCALSTORAGE_KEYS } from './../config/index';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}
  create(): Observable<any> {
    return this.http.post(USER_URL, {}).pipe(
      map((res: { _id: string }) => {
        localStorage.setItem(LOCALSTORAGE_KEYS.userId, res._id);
        return res;
      }),
      catchError(res => {
        return throwError('Something bad happened; please try again later.');
      })
    );
  }
}
