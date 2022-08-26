import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CexpPageRoutingModule } from './cexp-routing.module';

import { CexpPage } from './cexp.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CexpPageRoutingModule
  ],
  declarations: [CexpPage, SidebarsComponent]
})
export class CexpPageModule {}
