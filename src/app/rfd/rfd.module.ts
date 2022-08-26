import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RfdPageRoutingModule } from './rfd-routing.module';

import { RfdPage } from './rfd.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RfdPageRoutingModule
  ],
  declarations: [RfdPage, SidebarsComponent]
})
export class RfdPageModule {}
