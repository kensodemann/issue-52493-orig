import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { NavController } from '@ionic/angular/standalone';
import { SessionVaultService } from './core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

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
    await StatusBar.setBackgroundColor({ color: '#002648' });
    await StatusBar.setOverlaysWebView({ overlay: false });
    const hide = await this.sessionVault.isHidingContentsInBackground();
    this.sessionVault.hideContentsInBackground(hide);
  }

  ngOnInit() {
    SplashScreen.hide();
  }
}
