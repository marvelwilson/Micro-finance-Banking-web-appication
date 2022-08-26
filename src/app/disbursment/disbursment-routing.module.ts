import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisbursmentPage } from './disbursment.page';

const routes: Routes = [
  {
    path: '',
    component: DisbursmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisbursmentPageRoutingModule {}
