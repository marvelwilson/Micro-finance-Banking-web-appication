import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchlistPageRoutingModule } from './branchlist-routing.module';

import { BranchlistPage } from './branchlist.page';
import { SidebarsComponent } from '../sidebars/sidebars.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BranchlistPageRoutingModule
  ],
  declarations: [BranchlistPage, SidebarsComponent]
})
export class BranchlistPageModule {}
