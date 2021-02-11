import { environment } from "src/environments/environment";
import { Config } from '../../../configs/config';
import { HttpClient } from '@angular/common/http';
import { HeadersUtil } from "./utils/headers-util";
import { catchError, tap, timeout } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Injectable } from "@angular/core";
import { Word } from "src/app/shared/entities/word";

@Injectable({ providedIn: 'root' })
export class WordService {

    private endpoint = environment.endpointAPIWord + Config.apiWord;

    // Operations
    private methodAddWord = '/addWord';
    private methodShowWords = '/showWords';

    constructor(private http: HttpClient) {}

    addWord(word: Word): Observable<Response> {
        let headers = null;
        headers = HeadersUtil.getHeadersBasic(Config.apiWord);

        return this.http.post(this.endpoint + this.methodAddWord, word, {headers: headers, observe: 'response'})
        .pipe(
            timeout(30000),
            catchError(this.handleError<any>(`${Config.apiWord} - ${this.methodAddWord}`))
        );

    }

    getShowWords(cant: number): Observable<Response> {
        //Headers
        let headers = null;
        headers = HeadersUtil.getHeadersBasic(Config.apiWord);

        const url = this.endpoint + this.methodShowWords + '/' + cant;
        return this.http.get(url, {headers: headers, observe: 'response'})
        .pipe(
            timeout(30000),
            catchError(this.handleError<any>(`${Config.apiWord} - ${this.methodShowWords}`))
        );

    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
          switch (error.status) {
            default: {
              console.log('handleError', error);
              // ServiceMessageUtil.isErrorGenerico(error, ServiceMessageUtil.TYPE_NOTIFICATION_ALERT);
              break;
            }
          }
    
          // console.log('error:', JSON.stringify(error));
          // TODO: better job of transforming error for user consumption
          console.log(`${operation} failed: ${error.message}`);
    
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

}