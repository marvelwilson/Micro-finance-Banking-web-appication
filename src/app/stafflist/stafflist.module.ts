import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StafflistPageRoutingModule } from './stafflist-routing.module';

import { StafflistPage } from './stafflist.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StafflistPageRoutingModule
  ],
  declarations: [StafflistPage, SidebarsComponent]
})
export class StafflistPageModule {}
