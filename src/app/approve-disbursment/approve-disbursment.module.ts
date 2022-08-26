import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproveDisbursmentPageRoutingModule } from './approve-disbursment-routing.module';

import { ApproveDisbursmentPage } from './approve-disbursment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproveDisbursmentPageRoutingModule
  ],
  declarations: [ApproveDisbursmentPage]
})
export class ApproveDisbursmentPageModule {}
