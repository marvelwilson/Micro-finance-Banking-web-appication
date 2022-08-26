import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingLoanPage } from './pending-loan.page';

const routes: Routes = [
  {
    path: '',
    component: PendingLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingLoanPageRoutingModule {}
