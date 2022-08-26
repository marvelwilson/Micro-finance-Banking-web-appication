import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncPageRoutingModule } from './inc-routing.module';

import { IncPage } from './inc.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncPageRoutingModule
  ],
  declarations: [IncPage, SidebarsComponent]
})
export class IncPageModule {}
