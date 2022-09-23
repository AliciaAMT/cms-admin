import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AvatarService } from 'src/app/services/avatar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  profile= null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private avatarService: AvatarService,
  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
   }

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('login', { replaceUrl: true });
  }

  ngOnInit() {}

}
