import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApproveLoanPageRoutingModule } from './approve-loan-routing.module';

import { ApproveLoanPage } from './approve-loan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApproveLoanPageRoutingModule
  ],
  declarations: [ApproveLoanPage]
})
export class ApproveLoanPageModule {}
