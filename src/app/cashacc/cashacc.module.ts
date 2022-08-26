import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CashaccPageRoutingModule } from './cashacc-routing.module';

import { CashaccPage } from './cashacc.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CashaccPageRoutingModule
  ],
  declarations: [CashaccPage, SidebarsComponent]
})
export class CashaccPageModule {}
