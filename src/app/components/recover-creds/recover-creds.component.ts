import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-recover-creds',
  templateUrl: './recover-creds.component.html',
  styleUrls: ['./recover-creds.component.scss'],
})
export class RecoverCredsComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
  ) { }

  resetPassword(email: string): void {
    this.authService.resetPassword(email).then(
      async () => {
        const alert = await this.alertCtrl.create({
          message: 'Check your email for a password reset link',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
              handler: () => {
                this.router.navigateByUrl('login');
              },
            },
          ],
        });
        await alert.present();
      },
      async error => {
        const errorAlert = await this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }],
        });
        await errorAlert.present();
      }
    );
  }

  ngOnInit() {}

}
