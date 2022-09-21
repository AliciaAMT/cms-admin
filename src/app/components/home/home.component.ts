import { AdminDashboardComponent } from './../admin-dashboard/admin-dashboard.component';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  component = AdminDashboardComponent;

  constructor() { }

  ngOnInit() {}

}

