import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MgtosusuPageRoutingModule } from './mgtosusu-routing.module';

import { MgtosusuPage } from './mgtosusu.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MgtosusuPageRoutingModule
  ],
  declarations: [MgtosusuPage, SidebarsComponent]
})
export class MgtosusuPageModule {}
