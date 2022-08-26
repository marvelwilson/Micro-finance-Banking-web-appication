import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemitancePage } from './remitance.page';

const routes: Routes = [
  {
    path: '',
    component: RemitancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RemitancePageRoutingModule {}
