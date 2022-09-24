import { Component, Input, OnInit } from '@angular/core';
import { Note, DataService } from '../../services/data.service';
import { ModalController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() id: string;
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
