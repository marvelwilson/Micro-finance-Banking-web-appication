import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayLoanPage } from './pay-loan.page';

const routes: Routes = [
  {
    path: '',
    component: PayLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayLoanPageRoutingModule {}
