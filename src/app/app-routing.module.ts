import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TowerAPage } from './map/tower-a/tower-a.page';
import { Level0Page } from './map/tower-a/level0/level0.page';
import { Level1Page } from './map/tower-a/level1/level1.page';
import { AuditoriumsInfoPage } from './rooms/auditoriums-info/auditoriums-info.page';

const routes: Routes = [
  { path: '', redirectTo: 'ingresar', pathMatch: 'full' },
  { path: 'inicio', loadChildren: './home/home.module#HomePageModule' },
  { path: 'ingresar', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'mapa', loadChildren: './map/map.module#MapPageModule' },
  { path: 'mapa/torrea', component: TowerAPage },
  { path: 'mapa/nivel0', component: Level0Page },
  { path: 'mapa/nivel1', component: Level1Page },
  { path: 'info', component: AuditoriumsInfoPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
