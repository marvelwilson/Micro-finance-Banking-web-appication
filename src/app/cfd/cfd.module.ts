import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CfdPageRoutingModule } from './cfd-routing.module';

import { CfdPage } from './cfd.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CfdPageRoutingModule
  ],
  declarations: [CfdPage, SidebarsComponent]
})
export class CfdPageModule {}
