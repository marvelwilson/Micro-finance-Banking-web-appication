import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgottenPageRoutingModule } from './forgotten-routing.module';

import { ForgottenPage } from './forgotten.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';
import { NgxPrintModule } from 'ngx-print';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgottenPageRoutingModule,
    NgxPrintModule
  ],
  declarations: [ForgottenPage, SidebarsComponent]
})
export class ForgottenPageModule {}
