import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddstaffPageRoutingModule } from './addstaff-routing.module';

import { AddstaffPage } from './addstaff.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddstaffPageRoutingModule
  ],
  declarations: [AddstaffPage, SidebarsComponent]
})
export class AddstaffPageModule {}
