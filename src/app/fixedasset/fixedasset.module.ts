import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FixedassetPageRoutingModule } from './fixedasset-routing.module';

import { FixedassetPage } from './fixedasset.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FixedassetPageRoutingModule
  ],
  declarations: [FixedassetPage, SidebarsComponent]
})
export class FixedassetPageModule {}
