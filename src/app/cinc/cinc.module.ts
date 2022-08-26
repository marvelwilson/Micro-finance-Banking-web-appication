import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CincPageRoutingModule } from './cinc-routing.module';

import { CincPage } from './cinc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CincPageRoutingModule
  ],
  declarations: [CincPage]
})
export class CincPageModule {}
