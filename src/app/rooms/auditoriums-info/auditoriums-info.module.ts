import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuditoriumsInfoPage } from './auditoriums-info.page';

const routes: Routes = [
  {
    path: '',
    component: AuditoriumsInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuditoriumsInfoPage]
})
export class AuditoriumsInfoPageModule {}
