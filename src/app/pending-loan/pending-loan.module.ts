import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingLoanPageRoutingModule } from './pending-loan-routing.module';

import { PendingLoanPage } from './pending-loan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingLoanPageRoutingModule
  ],
  declarations: [PendingLoanPage]
})
export class PendingLoanPageModule {}
