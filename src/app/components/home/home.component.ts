import { AuthService } from '../../services/auth.service';
import { AdminDashboardComponent } from './../admin-dashboard/admin-dashboard.component';
import { Component, Input, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { AvatarService } from '../../services/avatar.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @Input() name: string;
  profile= null;
  component = AdminDashboardComponent;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
    private avatarService: AvatarService,
    private router: Router,
    private alertController: AlertController,
    private authService: AuthService,
    private loadingController: LoadingController

  ) {
    this.avatarService.getUserProfile().subscribe((data) => {
      this.profile = data;
    });
  }

  async changeImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Photos
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadImage(image);
      loading.dismiss();

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'Please try again.',
          buttons: ['OK']
        });

        await alert.present();
      }
  }
}


  ngOnInit() {}

}

