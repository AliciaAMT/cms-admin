import { Component, OnInit } from '@angular/core';
import { HomeComponent } from 'src/app/components/home/home.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  component = HomeComponent;

  constructor() { }

  ngOnInit() {
  }

}
