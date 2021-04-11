import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Matier } from '../assignments/matier.model';
import { LoggingService } from './logging.service';
import { assignmentsGeneres } from './data';

@Injectable({
  providedIn: 'root'
})
export class MatiersService {

  constructor(private loggingService:LoggingService, private http:HttpClient) { }

  uri = "https://apinodetsirytoky.herokuapp.com/api/matiers";


  getMatieres():Observable<Matier[]> {
    console.log("Dans le service de gestion des matières...")
    //return of(this.assignments);
    return this.http.get<Matier[]>(this.uri);
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  getMatiere(id:number):Observable<Matier> {
    //let assignementCherche = this.assignments.find(a => a.id === id);

    //return of(assignementCherche);

    return this.http.get<Matier>(this.uri + "/" + id)
    .pipe(
      map(m => {
        return m;
      }),
      catchError(this.handleError<any>('### catchError: getMatiere by id avec id=' + id))
    );
  }
}
