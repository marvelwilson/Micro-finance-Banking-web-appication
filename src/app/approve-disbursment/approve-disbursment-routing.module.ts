import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApproveDisbursmentPage } from './approve-disbursment.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveDisbursmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveDisbursmentPageRoutingModule {}
