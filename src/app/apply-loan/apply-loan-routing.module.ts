import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplyLoanPage } from './apply-loan.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyLoanPageRoutingModule {}
