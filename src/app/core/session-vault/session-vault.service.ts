import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { AuthResult } from '@ionic-enterprise/auth';
import { ModalController } from '@ionic/angular/standalone';
import { Observable, Subject } from 'rxjs';

export type UnlockMode =
  | 'Biometrics'
  | 'BiometricsWithPasscode'
  | 'SystemPasscode'
  | 'CustomPasscode'
  | 'SecureStorage';

const sessionKey = 'auth-session';
const modeKey = 'mode-key';

@Injectable({
  providedIn: 'root',
})
export class SessionVaultService {
  private lockedSubject: Subject<boolean>;
  private platform: string;

  constructor(private modalController: ModalController) {
    this.platform = Capacitor.getPlatform();
    this.lockedSubject = new Subject();
  }

  get locked(): Observable<boolean> {
    return this.lockedSubject.asObservable();
  }

  async initialize(): Promise<void> {}

  async setSession(session: AuthResult): Promise<void> {
    await Preferences.set({ key: sessionKey, value: JSON.stringify(session) });
  }

  async getSession(): Promise<AuthResult | null> {
    const { value } = await Preferences.get({ key: sessionKey });
    return value ? (JSON.parse(value) as AuthResult) : null;
  }

  async lockVault() {}

  async unlockVault() {}

  async canUnlock() {
    return false;
  }

  canHideContentsInBackground(): boolean {
    return false;
  }

  async canUseBiometrics(): Promise<boolean> {
    return false;
  }

  canUseCustomPasscode(): boolean {
    return false;
  }

  async canUseSystemPasscode(): Promise<boolean> {
    return false;
  }

  async hideContentsInBackground(value: boolean): Promise<void> {}

  async isHidingContentsInBackground(): Promise<boolean> {
    return false;
  }

  async clear(): Promise<void> {
    await Preferences.clear();
  }

  async getUnlockMode(): Promise<UnlockMode> {
    const { value } = await Preferences.get({ key: modeKey });
    return (value as UnlockMode | null) || 'SecureStorage';
  }

  async setUnlockMode(unlockMode: UnlockMode): Promise<void> {
    await Preferences.set({ key: modeKey, value: unlockMode });
  }
}
