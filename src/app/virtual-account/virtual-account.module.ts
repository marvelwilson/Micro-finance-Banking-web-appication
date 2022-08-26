import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VirtualAccountPageRoutingModule } from './virtual-account-routing.module';

import { VirtualAccountPage } from './virtual-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VirtualAccountPageRoutingModule
  ],
  declarations: [VirtualAccountPage]
})
export class VirtualAccountPageModule {}
