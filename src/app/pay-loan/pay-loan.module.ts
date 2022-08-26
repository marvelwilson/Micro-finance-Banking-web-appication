import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayLoanPageRoutingModule } from './pay-loan-routing.module';

import { PayLoanPage } from './pay-loan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayLoanPageRoutingModule
  ],
  declarations: [PayLoanPage]
})
export class PayLoanPageModule {}
