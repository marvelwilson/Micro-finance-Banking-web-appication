import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixedassetPage } from './fixedasset.page';

const routes: Routes = [
  {
    path: '',
    component: FixedassetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FixedassetPageRoutingModule {}
