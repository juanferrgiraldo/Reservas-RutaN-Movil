import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { Auditorium } from '../auditorium.model';
import { AuditoriumService } from '../../services/auditorium.service';

@Component({
  selector: 'app-auditoriums-info',
  templateUrl: './auditoriums-info.page.html',
  styleUrls: ['./auditoriums-info.page.scss'],
})
export class AuditoriumsInfoPage implements OnInit {

  auditoriumInfo = {
    id: '',
    nomenclature: '',
    capacity: 0,
    kindRoom: 'Auditorios'
  };

  auditorium: Auditorium = {
    _id: '',
    floor: '',
    nomenclature: '',
    details: {
      height: 0,
      width: 0
    },
    capacity: 0,
    hourPrice: '',
    description: ''
  };

  constructor(private auditoriumService: AuditoriumService, private router: Router) { }
  @Input()
  idRoom: string;


  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.idRoom;
    this.getAuditoriumInfo();
  }

  ngOnInit() {
    this.getAuditoriumInfo();
  }

  getAuditoriumInfo() {
    const json = { nomenclature: this.idRoom };
    this.auditoriumService.getAuditorium(json).subscribe(result => {
      const auditoriumRoom = result.message;
      if (auditoriumRoom.length || auditoriumRoom !== undefined) {
        this.auditorium._id = auditoriumRoom[0]._id;
        this.auditorium.nomenclature = auditoriumRoom[0].nomenclature;
        this.auditorium.details = auditoriumRoom[0].details;
        this.auditorium.capacity = auditoriumRoom[0].capacity;
        this.auditorium.hourPrice = auditoriumRoom[0].hourPrice;
        this.auditorium.description = auditoriumRoom[0].description;
      }
    }, error => {
      console.log('Error ' + error.message);
    });
  }

  onBooking() {
    this.auditoriumInfo.id = this.auditorium._id;
    this.auditoriumInfo.nomenclature = this.idRoom;
    this.auditoriumInfo.capacity = this.auditorium.capacity;
    this.auditoriumService.setTransferComponent(this.auditoriumInfo);
    this.router.navigate(['/reservas/auditorios']);
  }

}
