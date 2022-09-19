// import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';



@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
	credentials: FormGroup;
  constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController
	) {

  }


	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}
	ngOnInit() {
		this.credentials = this.fb.group({
			email: ['aliciataylorguitar@gmail.com', [Validators.required, Validators.email]],
			password: ['narnia123', [Validators.required, Validators.minLength(6)]]
		});
	}
async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } else {
      const alert = await this.alertController.create({
        header: 'Registration failed',
        message: 'This email address is already in use.',
        buttons: ['OK']
      });

      await alert.present();
    }

  }




	async login() {
		const loading = await this.loadingController.create();
		await loading.present();

    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } else {
      const alert = await this.alertController.create({
        header: 'Login failed',
        message: 'Please check your credentials and try again.',
        buttons: ['OK']
      });
      await alert.present();

  		}
	}
  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
