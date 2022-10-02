import { ModalPage } from './../../pages/modal/modal.page';
import { LoginPage } from './../../pages/login/login.page';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService, Note, User } from '../../services/data.service';
import { AlertController, ModalController } from '@ionic/angular';
import { NotesComponent } from '../admin/notes/notes.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  component = LoginPage;

  notesComponent = NotesComponent;

  users: User[] = [];

  constructor(
    private dataService: DataService,
     private cd: ChangeDetectorRef,
     private alertCtrl: AlertController,
     private modalCtrl: ModalController
  ) {

    this.dataService.getUsers().subscribe((data) => {
      this.users = data;
      this.cd.detectChanges();
    });
  }

  ngOnInit() {}


}

