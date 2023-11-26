import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getDashboardData(): Observable<any>{
    // delay(4000)
    return of({result: "you got the data bitch"})
  }
}
