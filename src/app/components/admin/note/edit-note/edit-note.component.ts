import { DataService, Note } from './../../../../services/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { NotesComponent } from '../../notes/notes.component';
import { ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss'],
})
export class EditNoteComponent implements OnInit {
  @Input() id: string;
  notesComponent = NotesComponent;
  note: Note = null;

  constructor(
    private dataService: DataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.dataService.getNoteById(this.id).subscribe(res => {
      this.note = res;
    });
  }
  async deleteNote() {
    await this.dataService.deleteNote(this.note);
    this.modalCtrl.dismiss();
  }

  async updateNote() {
    await this.dataService.updateNote(this.note);
    const toast = await this.toastCtrl.create({
      message: 'Note updated!.',
      duration: 2000
    });
    toast.present();
  }
}
