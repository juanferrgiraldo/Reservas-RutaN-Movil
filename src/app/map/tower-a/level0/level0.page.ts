import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-level0',
  templateUrl: './level0.page.html',
  styleUrls: ['./level0.page.scss'],
})
export class Level0Page implements OnInit {

  private isClicked = false;
  private clickedAuditorium: string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  onSelectedAuditorium(id: string) {
    this.isClicked = true;
    this.clickedAuditorium = id;
  }
}
