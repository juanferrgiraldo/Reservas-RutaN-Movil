import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'ingresar', pathMatch: 'full' },
  { path: 'inicio', loadChildren: './home/home.module#HomePageModule' },
  { path: 'ingresar', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'mapa', loadChildren: './map/map.module#MapPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
