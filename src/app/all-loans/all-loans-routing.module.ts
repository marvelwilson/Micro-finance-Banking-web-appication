import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllLoansPage } from './all-loans.page';

const routes: Routes = [
  {
    path: '',
    component: AllLoansPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllLoansPageRoutingModule {}
