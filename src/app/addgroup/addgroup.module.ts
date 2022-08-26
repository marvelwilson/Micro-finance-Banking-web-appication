import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddgroupPageRoutingModule } from './addgroup-routing.module';

import { AddgroupPage } from './addgroup.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddgroupPageRoutingModule
  ],
  declarations: [AddgroupPage, SidebarsComponent]
})
export class AddgroupPageModule {}
