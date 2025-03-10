import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatusBarService, TastingNotesService } from '@app/core';
import { TastingNote } from '@app/models';
import {
  AlertController,
  IonRouterOutlet,
  ModalController,
  ModalOptions,
} from '@ionic/angular/standalone';
import { BehaviorSubject, EMPTY, mergeMap, Observable, tap } from 'rxjs';
import { TastingNoteEditorComponent } from './tasting-note-editor/tasting-note-editor.component';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItemSliding,
  IonItem,
  IonLabel,
  IonItemOptions,
  IonItemOption,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tasting-notes',
  templateUrl: './tasting-notes.page.html',
  styleUrls: ['./tasting-notes.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    TastingNoteEditorComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItemSliding,
    IonItem,
    IonLabel,
    IonItemOptions,
    IonItemOption,
    IonFab,
    IonFabButton,
    IonIcon,
  ],
})
export class TastingNotesPage implements OnInit {
  private refresh = new BehaviorSubject<void>(undefined);
  @ViewChild(IonList, { static: true }) list: IonList | undefined;
  notes$: Observable<TastingNote[]> = EMPTY;

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private statusBar: StatusBarService,
    private tastingNotes: TastingNotesService,
  ) {
    addIcons({ add });
  }

  ngOnInit() {
    this.notes$ = this.refresh.pipe(mergeMap(() => this.tastingNotes.getAll()));
  }

  ionViewDidEnter() {
    this.statusBar.changeBackgroundTogray();
  }

  async deleteNote(note: TastingNote): Promise<void> {
    if (await this.confirmDelete()) {
      this.tastingNotes
        .delete(note.id as number)
        .pipe(tap(() => this.refresh.next()))
        .subscribe();
    } else {
      if (this.list?.closeSlidingItems) {
        this.list.closeSlidingItems();
      }
    }
  }

  newNote(): Promise<void> {
    return this.displayEditor();
  }

  updateNote(note: TastingNote): Promise<void> {
    return this.displayEditor(note);
  }

  private async confirmDelete(): Promise<boolean> {
    const alert = await this.alertController.create({
      header: 'Remove Note',
      subHeader: 'This action cannot be undone!',
      message: 'Are you sure you want to remove this note?',
      buttons: [
        { text: 'Yes', role: 'yes' },
        { text: 'No', role: 'no' },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
    return role === 'yes';
  }

  private async displayEditor(note?: TastingNote): Promise<void> {
    const opt: ModalOptions = {
      component: TastingNoteEditorComponent,
      backdropDismiss: false,
      presentingElement: this.routerOutlet.nativeEl,
    };
    if (note) {
      opt.componentProps = { note };
    }
    this.statusBar.updateModalBackground();
    const modal = await this.modalController.create(opt);
    modal.present();
    await modal.onDidDismiss();
    await this.statusBar.changeBackgroundToColor();
    this.refresh.next();
  }
}
