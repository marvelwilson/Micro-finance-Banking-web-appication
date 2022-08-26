import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReconPageRoutingModule } from './recon-routing.module';

import { ReconPage } from './recon.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReconPageRoutingModule
  ],
  declarations: [ReconPage, SidebarsComponent]
})
export class ReconPageModule {}
