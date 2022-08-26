import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisbursmentPageRoutingModule } from './disbursment-routing.module';

import { DisbursmentPage } from './disbursment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisbursmentPageRoutingModule
  ],
  declarations: [DisbursmentPage]
})
export class DisbursmentPageModule {}
