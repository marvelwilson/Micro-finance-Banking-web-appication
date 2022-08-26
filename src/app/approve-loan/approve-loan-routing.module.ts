import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApproveLoanPage } from './approve-loan.page';

const routes: Routes = [
  {
    path: '',
    component: ApproveLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveLoanPageRoutingModule {}
