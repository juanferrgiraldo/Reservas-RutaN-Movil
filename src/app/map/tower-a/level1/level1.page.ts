import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level1',
  templateUrl: './level1.page.html',
  styleUrls: ['./level1.page.scss'],
})
export class Level1Page implements OnInit {
  private isClicked = false;
  private clickedSM: string;

  onSelectedSM(id: string) {
      this.isClicked = true;
      this.clickedSM = id;
  }
  constructor() { }

  ngOnInit() {
  }

}
