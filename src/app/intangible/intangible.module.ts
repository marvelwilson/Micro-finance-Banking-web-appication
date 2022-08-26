import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IntangiblePageRoutingModule } from './intangible-routing.module';

import { IntangiblePage } from './intangible.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntangiblePageRoutingModule
  ],
  declarations: [IntangiblePage, SidebarsComponent]
})
export class IntangiblePageModule {}
