import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CapitalPageRoutingModule } from './capital-routing.module';

import { CapitalPage } from './capital.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CapitalPageRoutingModule
  ],
  declarations: [CapitalPage, SidebarsComponent]
})
export class CapitalPageModule {}
