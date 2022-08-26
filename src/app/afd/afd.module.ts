import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfdPageRoutingModule } from './afd-routing.module';

import { AfdPage } from './afd.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfdPageRoutingModule
  ],
  declarations: [AfdPage, SidebarsComponent]
})
export class AfdPageModule {}
