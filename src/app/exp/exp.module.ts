import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpPageRoutingModule } from './exp-routing.module';

import { ExpPage } from './exp.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpPageRoutingModule
  ],
  declarations: [ExpPage, SidebarsComponent]
})
export class ExpPageModule {}
