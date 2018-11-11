import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuditoriumService {
  private url = 'http://localhost:4100/reservasrutan/auditorium/';
  private data: any;

  constructor(private http: HttpService) { }

  getAuditorium(criteria) {
    const headers =  new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.url + 'search', criteria, headers);
  }

  setTransferComponent(inform) {
    this.data = inform;
  }

  getTransferComponent() {
    if (this.data !== undefined) {
      return this.data;
    } else {
      return null;
    }
  }

  clearData() {
    this.data = null;
  }
}
