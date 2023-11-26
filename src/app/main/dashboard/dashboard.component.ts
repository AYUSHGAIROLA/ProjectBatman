import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  
  dataForDashboard!: Observable<any>;
  constructor(
    private activatedRoute: ActivatedRoute,
  ){

  }

  ngOnInit(){
    this.dataForDashboard = this.activatedRoute.data.pipe(map((data)=> data['data']));
    this.dataForDashboard.subscribe(console.log)
  }

}
