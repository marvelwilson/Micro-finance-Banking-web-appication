import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccdashPageRoutingModule } from './accdash-routing.module';

import { AccdashPage } from './accdash.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccdashPageRoutingModule,
  ],
  declarations: [AccdashPage, SidebarsComponent]
})
export class AccdashPageModule {}
