import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BanksPageRoutingModule } from './banks-routing.module';

import { BanksPage } from './banks.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BanksPageRoutingModule
  ],
  declarations: [BanksPage, SidebarsComponent]
})
export class BanksPageModule {}
