import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

export class Person {
    FirstName: string;
    LastName: string;
  }

  @Injectable({ providedIn: 'root' })
export class AppService {
    private url = 'http://localhost:5000/api/contacts';  // URL to web api

    constructor(private http: HttpClient) { }

    getPeople (): Observable<Person[]> {
        return this.http.get<Person[]>(this.url);
        //   .pipe(
        //     tap(person => this.log('test')),
        //     catchError(this.handleError('getPeople', []))
        //   );
      }

      private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead

          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);

          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }

      /** Log a HeroService message with the MessageService */
      private log(message: string) {
      }
  }
