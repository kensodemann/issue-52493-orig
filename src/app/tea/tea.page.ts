import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StatusBarService, TeaService } from '@app/core';
import { Tea } from '@app/models';
import { NavController } from '@ionic/angular/standalone';
import { map, Observable, of } from 'rxjs';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonImg,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-tea',
  templateUrl: './tea.page.html',
  styleUrls: ['./tea.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonImg,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  ],
})
export class TeaPage implements OnInit {
  teaMatrix$: Observable<Tea[][]> = of([]);

  constructor(
    private nav: NavController,
    private statusBar: StatusBarService,
    private tea: TeaService,
  ) {}

  ngOnInit() {
    this.teaMatrix$ = this.tea
      .getAll()
      .pipe(map((teas) => this.toMatrix(teas)));
  }

  ionViewDidEnter() {
    this.statusBar.changeBackgroundToColor();
  }

  showDetailsPage(id: number) {
    this.nav.navigateForward(['tabs', 'tea', 'tea-details', id]);
  }

  private toMatrix(tea: Tea[]): Tea[][] {
    const matrix: Tea[][] = [];
    let row: Tea[] = [];
    tea.forEach((t) => {
      row.push(t);
      if (row.length === 4) {
        matrix.push(row);
        row = [];
      }
    });

    if (row.length) {
      matrix.push(row);
    }

    return matrix;
  }
}
