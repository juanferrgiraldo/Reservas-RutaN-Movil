import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-level0',
  templateUrl: './level0.page.html',
  styleUrls: ['./level0.page.scss'],
})
export class Level0Page implements OnInit {

  private isClicked = false;
  private clickedAuditorium: string;

  constructor() { }

  ngOnInit() {
  }
  onSelectedAuditorium(id: string) {
    this.isClicked = true;
    this.clickedAuditorium = id;
  }
}
