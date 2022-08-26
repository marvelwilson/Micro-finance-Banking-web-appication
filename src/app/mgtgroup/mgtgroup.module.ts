import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MgtgroupPageRoutingModule } from './mgtgroup-routing.module';

import { MgtgroupPage } from './mgtgroup.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MgtgroupPageRoutingModule
  ],
  declarations: [MgtgroupPage, SidebarsComponent]
})
export class MgtgroupPageModule {}
