import { EditNoteComponent } from './../note/edit-note/edit-note.component';
import { AdminDashboardComponent } from './../../admin-dashboard/admin-dashboard.component';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPage } from 'src/app/pages/modal/modal.page';
import { DataService, Note } from 'src/app/services/data.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  editComponent = EditNoteComponent;
  adminComponent = AdminDashboardComponent;
  notes: Note[] = [];

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
      component: EditNoteComponent,
      componentProps: { id: note.id },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.8
    });

    await modal.present();
  }
}
