import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanDetailsPage } from './loan-details.page';

const routes: Routes = [
  {
    path: '',
    component: LoanDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanDetailsPageRoutingModule {}
