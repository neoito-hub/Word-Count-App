import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

import { POST_SENTENCE_URL, LOCALSTORAGE_KEYS } from '../config';
import { ResultModel } from './../models/user.models';

@Injectable()
export class PostSentenceService {
  constructor(private http: HttpClient) {}
  post(text: string): Observable<any> {
    const headers = new HttpHeaders({
      user_id: localStorage.getItem(LOCALSTORAGE_KEYS.userId)
    });
    return this.http
      .post(
        POST_SENTENCE_URL,
        {
          string: text
        },
        { headers }
      )
      .pipe(
        map((res: ResultModel) => {
          console.log('response is ', res);
          return res;
        }),
        catchError(res => {
          return throwError('Something bad happened; please try again later.');
        })
      );
  }
}
