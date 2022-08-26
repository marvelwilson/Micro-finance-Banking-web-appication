import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewLoanPage } from './new-loan.page';

const routes: Routes = [
  {
    path: '',
    component: NewLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewLoanPageRoutingModule {}
