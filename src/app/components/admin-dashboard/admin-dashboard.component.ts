import { ModalPage } from './../../pages/modal/modal.page';
import { LoginPage } from './../../pages/login/login.page';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService, Note, User } from '../../services/data.service';
import { AlertController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  component = LoginPage;
  editComponent = ModalPage;
  notes: Note[] = [];
  users: User[] = [];

  constructor(
    private dataService: DataService,
     private cd: ChangeDetectorRef,
     private alertCtrl: AlertController,
     private modalCtrl: ModalController
  ) {
    this.dataService.getNotes().subscribe(res => {
      this.notes = res;
      this.cd.detectChanges();
    });
    this.dataService.getUsers().subscribe((data) => {
      this.users = data;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {}

  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
    message: 'Enter a title and description for your note.',
      inputs: [
        {
          name: 'title',
          placeholder: 'My cool note',
          type: 'text'
        },
        {
          name: 'text',
          placeholder: 'Learn Ionic',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            this.dataService.addNote({ text: res.text, title: res.title });
          }
        }
      ]
    });

    await alert.present();
  }

  async openNote(note: Note) {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      componentProps: { id: note.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }
}

