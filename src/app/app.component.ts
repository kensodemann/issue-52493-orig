import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import {
  IonApp,
  IonRouterOutlet,
  NavController,
} from '@ionic/angular/standalone';
import { SessionVaultService, StatusBarService } from './core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [CommonModule, IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    navController: NavController,
    private sessionVault: SessionVaultService,
    private statusBar: StatusBarService,
  ) {
    sessionVault.locked.subscribe(async (locked) => {
      if (locked) {
        try {
          await sessionVault.unlockVault();
        } catch {
          navController.navigateRoot('/unlock');
        }
      }
    });

    this.init();
  }

  async init() {
    const hide = await this.sessionVault.isHidingContentsInBackground();
    this.sessionVault.hideContentsInBackground(hide);
  }

  async ngOnInit() {
    await SplashScreen.hide();
    await this.statusBar.changeBackgroundToColor();
  }
}
