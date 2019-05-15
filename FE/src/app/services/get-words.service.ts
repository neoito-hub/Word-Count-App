import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { GET_WORDS_LIST_URL, LOCALSTORAGE_KEYS } from '../config';
import { UserDetailModel } from '../models';

@Injectable()
export class GetWordsService {
  constructor(private http: HttpClient) {}
  get(): Observable<any> {
    const headers = new HttpHeaders({
      user_id: localStorage.getItem(LOCALSTORAGE_KEYS.userId)
    });
    return this.http.get(GET_WORDS_LIST_URL, { headers }).pipe(
      map((res: UserDetailModel) => {
        return res;
      }),
      catchError(res => {
        return throwError('Something bad happened; please try again later.');
      })
    );
  }
}
