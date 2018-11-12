import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { AuditoriumService } from './services/auditorium.service';
import { MultiRoomService } from './services/multi-room.service';
import { BookingService } from './services/booking.service';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { TowerAPage } from './map/tower-a/tower-a.page';
import { Level0Page } from './map/tower-a/level0/level0.page';
import { Level1Page } from './map/tower-a/level1/level1.page';
import { AuditoriumsInfoPage } from './rooms/auditoriums-info/auditoriums-info.page';
import { MultiRoomInfoPage } from './rooms/multi-room-info/multi-room-info.page';
import { AuditoriumPage } from './booking/auditorium/auditorium.page';
import { MultiRoomPage } from './booking/multi-room/multi-room.page';

@NgModule({
  declarations: [
    AppComponent,
    TowerAPage,
    Level0Page,
    Level1Page,
    AuditoriumsInfoPage,
    MultiRoomInfoPage,
    AuditoriumPage,
    MultiRoomPage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HttpService,
    AuditoriumService,
    MultiRoomService,
    BookingService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
