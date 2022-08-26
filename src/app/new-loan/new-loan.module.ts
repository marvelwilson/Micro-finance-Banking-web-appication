import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewLoanPageRoutingModule } from './new-loan-routing.module';

import { NewLoanPage } from './new-loan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewLoanPageRoutingModule
  ],
  declarations: [NewLoanPage]
})
export class NewLoanPageModule {}
