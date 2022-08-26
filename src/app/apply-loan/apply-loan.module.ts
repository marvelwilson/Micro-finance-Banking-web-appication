import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyLoanPageRoutingModule } from './apply-loan-routing.module';

import { ApplyLoanPage } from './apply-loan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplyLoanPageRoutingModule
  ],
  declarations: [ApplyLoanPage]
})
export class ApplyLoanPageModule {}
