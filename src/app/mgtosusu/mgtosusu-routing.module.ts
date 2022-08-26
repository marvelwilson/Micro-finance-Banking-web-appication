import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MgtosusuPage } from './mgtosusu.page';

const routes: Routes = [
  {
    path: '',
    component: MgtosusuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MgtosusuPageRoutingModule {}
