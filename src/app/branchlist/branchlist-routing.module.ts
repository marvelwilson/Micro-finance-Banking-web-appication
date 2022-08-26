import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchlistPage } from './branchlist.page';

const routes: Routes = [
  {
    path: '',
    component: BranchlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchlistPageRoutingModule {}
