import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BocPageRoutingModule } from './boc-routing.module';

import { BocPage } from './boc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BocPageRoutingModule
  ],
  declarations: [BocPage]
})
export class BocPageModule {}
