import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustlistPage } from './custlist.page';

const routes: Routes = [
  {
    path: '',
    component: CustlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustlistPageRoutingModule {}
