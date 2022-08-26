import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FixedPageRoutingModule } from './fixed-routing.module';

import { FixedPage } from './fixed.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FixedPageRoutingModule
  ],
  declarations: [FixedPage, SidebarsComponent]
})
export class FixedPageModule {}
