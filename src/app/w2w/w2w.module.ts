import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { W2wPageRoutingModule } from './w2w-routing.module';

import { W2wPage } from './w2w.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    W2wPageRoutingModule
  ],
  declarations: [W2wPage]
})
export class W2wPageModule {}
