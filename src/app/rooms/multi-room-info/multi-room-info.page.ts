import { Component, OnInit, Input, SimpleChanges, OnChanges, SimpleChange } from '@angular/core';
import { MultipleRoom } from '../multi-room.model';
import { MultiRoomService } from '../../services/multi-room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multi-room-info',
  templateUrl: './multi-room-info.page.html',
  styleUrls: ['./multi-room-info.page.scss'],
})
export class MultiRoomInfoPage implements OnInit {

  multiRoomInfo = {
    id: '',
    nomenclature: '',
    capacity: 0,
    kindRoom: 'Salas Multiples'
  };

  multiRoom: MultipleRoom = {
    _id: '',
    nomenclature: '',
    details: {
      height: 0,
      width: 0
    },
    capacity: 0,
    hourPrice: '',
    description: '',
  };
  constructor(private multiRoomService: MultiRoomService, private router: Router) { }
  @Input()
  idRoom: string;

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.idRoom;
    this.getMRInfo();
  }

  ngOnInit() {
    this.getMRInfo();
  }

  getMRInfo() {
    const json = { nomenclature: this.idRoom }; /**Hacer las validaciones*/
    this.multiRoomService.getMultiRoom(json).subscribe(result => {
      const multipleRoom = result.message;
      if (multipleRoom.length || multipleRoom !== undefined) {
        this.multiRoom._id = multipleRoom[0]._id;
        this.multiRoom.nomenclature = multipleRoom[0].nomenclature;
        this.multiRoom.details = multipleRoom[0].details;
        this.multiRoom.capacity = multipleRoom[0].capacity;
        this.multiRoom.hourPrice = multipleRoom[0].hourPrice;
        this.multiRoom.description = multipleRoom[0].description;
      }
    }, error => {
      console.log('Error ' + <any>error.message);
    });
  }

  onBooking() {
    this.multiRoomInfo.id = this.multiRoom._id;
    this.multiRoomInfo.nomenclature = this.idRoom;
    this.multiRoomInfo.capacity = this.multiRoom.capacity;
    this.multiRoomService.setTransferComponent(this.multiRoomInfo);
    this.router.navigate(['/reservas/salasmultiples']);
  }

}
