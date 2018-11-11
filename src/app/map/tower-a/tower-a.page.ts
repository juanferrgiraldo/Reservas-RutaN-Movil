import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tower-a',
  templateUrl: './tower-a.page.html',
  styleUrls: ['./tower-a.page.scss'],
})
export class TowerAPage implements OnInit {
  private isClicked = false;
  private clickedLevel: string;

  constructor() { }

  ngOnInit() {
  }

  onSelectedLevel(id: string) {
    this.isClicked = true;
    this.clickedLevel = id;
   }
}
