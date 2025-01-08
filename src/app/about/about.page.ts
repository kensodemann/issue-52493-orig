import { Component } from '@angular/core';
import { StatusBarService } from '@app/core';
import { PreferencesPage } from '@app/preferences/preferences.page';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonTitle,
  IonToolbar,
  ModalController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline } from 'ionicons/icons';
import packageInfo from '../../../package.json';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonContent,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonNote,
  ],
})
export class AboutPage {
  author: string;
  name: string;
  description: string;
  version: string;

  constructor(
    private modalController: ModalController,
    private statusBar: StatusBarService,
  ) {
    this.author = packageInfo.author;
    this.name = packageInfo.name;
    this.description = packageInfo.description;
    this.version = packageInfo.version;
    addIcons({ settingsOutline });
  }

  ionViewDidEnter() {
    console.log('about entered');
    this.statusBar.changeBackgroundTograyForBooking();
  }

  async openPreferences() {
    this.statusBar.updateModalBackground();
    const dlg = await this.modalController.create({
      backdropDismiss: false,
      component: PreferencesPage,
    });
    dlg.present();
    await dlg.onDidDismiss();
    this.statusBar.changeBackgroundTograyForBooking();
  }
}
