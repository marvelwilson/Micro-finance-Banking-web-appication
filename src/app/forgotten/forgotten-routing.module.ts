import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgottenPage } from './forgotten.page';

const routes: Routes = [
  {
    path: '',
    component: ForgottenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgottenPageRoutingModule {}
