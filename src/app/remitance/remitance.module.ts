import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RemitancePageRoutingModule } from './remitance-routing.module';

import { RemitancePage } from './remitance.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RemitancePageRoutingModule
  ],
  declarations: [RemitancePage, SidebarsComponent]
})
export class RemitancePageModule {}
