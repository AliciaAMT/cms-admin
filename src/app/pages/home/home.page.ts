import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../../components/home/home.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  component = HomeComponent;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }
  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
  }
  // goHome() {
  //   this.router.navigateByUrl('profile', { replaceUrl: true });
  // }
  ngOnInit() {
  }

}
