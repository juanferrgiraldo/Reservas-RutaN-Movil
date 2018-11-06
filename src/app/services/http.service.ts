import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class HttpService {
    constructor(private _http: Http) {}

    get(url: string, headers: Headers, params?: any) {
        return this._http.get(url, {headers: headers, params: params})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    post(url: string, body: any, headers: Headers, params?: any) {
        return this._http.post(url, body, {headers: headers, params: params})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    put(url: string, body: any, headers: Headers, params?: any) {
        return this._http.put(url, body, {headers: headers, params: params})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }
}
