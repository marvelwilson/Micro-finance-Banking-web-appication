import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CapitalPage } from './capital.page';

const routes: Routes = [
  {
    path: '',
    component: CapitalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CapitalPageRoutingModule {}
