import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TempcustPageRoutingModule } from './tempcust-routing.module';

import { TempcustPage } from './tempcust.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TempcustPageRoutingModule
  ],
  declarations: [TempcustPage, SidebarsComponent]
})
export class TempcustPageModule {}
