import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
    private token: string;
    private isAuthenticated = false;
    private tokenTimer: NodeJS.Timer;
    private authStatusListener = new Subject<boolean>();
    private authNameListener = new Subject<string>();
    private authProfile = new Subject<string>();
    private authLastLogin = new Subject<string>();
    private authId: string;

    constructor(private _http: HttpService, private _router: Router) {}

    getToken() { return this.token; }

    getIsAutheticated() { return this.isAuthenticated; }

    getAuthLastLogin() { return this.authLastLogin.asObservable(); }

    getAuthNameListener() { return this.authNameListener.asObservable(); }

    getAuthStatusListener() { return this.authStatusListener.asObservable(); }

    getAuthId() { return this.authId; }

    getAuthUserInfo() {
        const headers = new Headers({'Content-Type': 'application/json'});
        headers.set('Authorization', 'Bearer ' + this.getToken());
        return new Observable(observer => {
            this._http.get('http://localhost:4100/reservasrutan/authuserinfo', headers)
                .subscribe((data) => {
                    this.authLastLogin.next(data.lastLogin.toString());
                    this.authProfile.next(data.profile);
                    this.authNameListener.next(data.name);
                    observer.next(data);
                    observer.complete();
                });
        });
    }

    signin(userCredentials) {
        const body = JSON.stringify(userCredentials);
        const headers = new Headers({'Content-Type': 'application/json'});
        return new Observable(observer => {
            this._http.post('http://localhost:4100/reservasrutan/signin', body, headers)
            .subscribe(
                res => {
                    const token = res.token;
                    this.token = token;
                    if (token) {
                        this.isAuthenticated = true;
                        this.authId = res.id;
                        this.authStatusListener.next(true);
                        const now = new Date();
                        const expirationDate = new Date(now.getTime() + (res.expiresIn * 1000));
                        this.saveAuthData(this.token, expirationDate, this.authId);
                        this.autoAuthUser();
                        observer.next(res);
                        observer.complete();
                        this._router.navigate(['mapa']);
                    }
                },
                error => { observer.error(error); }
            );
        });
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if (!authInformation) {
          return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.authId = authInformation.id;
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.getAuthUserInfo().subscribe();
            this.setAuthTimer(expiresIn / 1000);
        }
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, id: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('id', id);
    }

    private clearAuthData() {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        localStorage.removeItem('id');
    }

    private getAuthData() {
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const id = localStorage.getItem('id');
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            id: id
        };
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this._router.navigate(['/ingresar']);
    }
}
