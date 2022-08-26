import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BocPage } from './boc.page';

const routes: Routes = [
  {
    path: '',
    component: BocPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BocPageRoutingModule {}
