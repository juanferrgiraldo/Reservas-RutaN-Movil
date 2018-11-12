import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';


@Injectable()
export class BookingService {

  url = 'http://localhost:4100/reservasrutan';
  constructor(private _http: HttpService, private _authService: AuthService) { }

  createBooking(infoBooking) {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._http.post(this.url + '/createbooking', infoBooking, headers);
  }

  validateDate(datesJson, placeId) {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    const initdate = datesJson.initdate.toString();
    const finishdate = datesJson.finishdate.toString();
    return this._http.get(this.url + '/validatedate/' + placeId + '/' + initdate + '/' + finishdate, headers);
  }

  findResponsableInfo(responsableId) {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._http.get(this.url + '/booking/responsable/' + responsableId, headers);
  }

  findBooking(bookingId) {
    const headers = new Headers({'Content-Type': 'application/json'});
    headers.set('Authorization', 'Bearer ' + this._authService.getToken());
    return this._http.post(this.url + '/bookings', bookingId, headers);
  }

}
