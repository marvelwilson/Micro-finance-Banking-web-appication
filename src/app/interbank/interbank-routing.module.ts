import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterbankPage } from './interbank.page';

const routes: Routes = [
  {
    path: '',
    component: InterbankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InterbankPageRoutingModule {}
