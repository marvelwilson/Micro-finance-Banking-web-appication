import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingPageRoutingModule } from './pending-routing.module';

import { PendingPage } from './pending.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingPageRoutingModule
  ],
  declarations: [PendingPage, SidebarsComponent]
})
export class PendingPageModule {}
