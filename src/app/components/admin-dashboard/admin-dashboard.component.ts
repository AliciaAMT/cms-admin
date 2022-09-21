import { HomeComponent } from 'src/app/components/home/home.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  component = HomeComponent;

  constructor() { }

  ngOnInit() {}

}
