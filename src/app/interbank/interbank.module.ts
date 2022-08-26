import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InterbankPageRoutingModule } from './interbank-routing.module';

import { InterbankPage } from './interbank.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InterbankPageRoutingModule
  ],
  declarations: [InterbankPage, SidebarsComponent]
})
export class InterbankPageModule {}
