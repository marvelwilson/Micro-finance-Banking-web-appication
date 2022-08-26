import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllLoansPageRoutingModule } from './all-loans-routing.module';

import { AllLoansPage } from './all-loans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllLoansPageRoutingModule
  ],
  declarations: [AllLoansPage]
})
export class AllLoansPageModule {}
