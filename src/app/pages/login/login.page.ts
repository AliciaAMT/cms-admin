import { RecoverCredsComponent } from './../../components/recover-creds/recover-creds.component';
// import { AuthenticationService } from './../../services/authentication.service';
import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonInput, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';


@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit {
  @ContentChild(IonInput) input: IonInput;
  showPassword = true;
	credentials: FormGroup;
  component: RecoverCredsComponent;

  loginForm: FormGroup;
  pwdIcon = 'eye-outline';
  showPwd = false;


constructor(
		private fb: FormBuilder,
		public authService: AuthService,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController,
    private auth: Auth
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
			password: ['Narnia123', [Validators.required, Validators.minLength(6)]]
		});
	}

  async resetPassword() {
    return sendPasswordResetEmail(this.auth, this.credentials.value.email)
    .then(
      async () => {
        const alert = await this.alertController.create({
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
        const errorAlert = await this.alertController.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }],
        });
        await errorAlert.present();
      }
    );
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

//   async resetPassword(email: string): Promise<void> {
//     await this.auth.sendPasswordResetEmail(email).then(() => {
//        this.router.navigate(['auth/reset-confirm']);
//     }).catch((error) => {
//        this.notifier.showError(error.message);
//     });
//  }

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
  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .then(() => this.router.navigate(['/tabs']))
      .catch((e) => console.log(e.message));
  }

  // toggleShow() {
  //   this.showPassword = !this.showPassword;
  //   this.input.type = this.showPassword ? 'text' : 'password';
  // }
  togglePwd() {
    this.showPwd = !this.showPwd;
    this.pwdIcon = this.showPwd ? 'eye-off-outline' : 'eye-outline';
  }
}
  // showPassword() {
  //   const passwordInput = document.getElementById('password') as HTMLInputElement;
  //   const passwordIcon = document.getElementById('password-icon') as HTMLElement;

  //   if (passwordInput.type === 'password') {
  //     passwordInput.type = 'text';
  //     passwordIcon.classList.add('show');
  //   } else {
  //     passwordInput.type = 'password';
  //     passwordIcon.classList.remove('show');
  //   }
  // }
  // async showAlert(header, message) {
  //   const alert = await this.alertController.create({
  //     header,
  //     message,
  //     buttons: ['OK']
  //   });

  //   await alert.present();
  // }

