import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanDetailsPageRoutingModule } from './loan-details-routing.module';

import { LoanDetailsPage } from './loan-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanDetailsPageRoutingModule
  ],
  declarations: [LoanDetailsPage]
})
export class LoanDetailsPageModule {}
